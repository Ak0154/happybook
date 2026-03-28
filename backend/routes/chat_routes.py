from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
import uuid
from backend.auth.jwt import get_current_user
from backend.models.chat import ChatRequest, ChatResponse, HistoryResponse, MessageOut
from backend.chat.groq import get_groq_reply
from backend.chat.history import (
    save_message,
    get_session_history,
    get_all_sessions,
    delete_session
)

router = APIRouter()


@router.post("/message", response_model=ChatResponse)
async def send_message(
    body: ChatRequest,
    user: dict = Depends(get_current_user)   # JWT protected
):
    user_id = user["sub"]

    # Create new session if none provided
    session_id = body.session_id or str(uuid.uuid4())

    # Fetch prior messages in this session for Gemini context
    history = await get_session_history(user_id, session_id)

    # Get reply from Gemini
    reply = await get_groq_reply(body.message, history)

    now = datetime.utcnow()

    # Persist both messages to DB
    await save_message(user_id, session_id, "user",      body.message)
    await save_message(user_id, session_id, "assistant", reply)

    return ChatResponse(
        session_id=session_id,
        reply=reply,
        timestamp=now
    )


@router.get("/history/{session_id}", response_model=HistoryResponse)
async def get_history(
    session_id: str,
    user: dict = Depends(get_current_user)
):
    messages = await get_session_history(user["sub"], session_id)

    if not messages:
        raise HTTPException(status_code=404, detail="Session not found")

    return HistoryResponse(
        session_id=session_id,
        messages=[
            MessageOut(
                role=m["role"],
                content=m["content"],
                timestamp=m["timestamp"]
            )
            for m in messages
        ]
    )


@router.get("/sessions")
async def list_sessions(user: dict = Depends(get_current_user)):
    """Returns all past chat sessions for the current user"""
    return await get_all_sessions(user["sub"])


@router.delete("/session/{session_id}")
async def remove_session(
    session_id: str,
    user: dict = Depends(get_current_user)
):
    await delete_session(user["sub"], session_id)
    return {"message": "Session deleted"}