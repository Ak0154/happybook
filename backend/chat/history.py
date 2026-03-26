from datetime import datetime
from bson import ObjectId

from db import chats_col

async def save_message(user_id: str, session_id: str, role: str, content: str):
    """Save a single message (user or assistant) to DB"""
    await chats_col.insert_one({
        "user_id":    ObjectId(user_id),
        "session_id": session_id,
        "role":       role,        # "user" or "assistant"
        "content":    content,
        "timestamp":  datetime.utcnow()
    })

async def get_session_history(user_id: str, session_id: str) -> list[dict]:
    """
    Fetch all messages in a session, oldest first.
    Used to build Gemini context window.
    """
    cursor = chats_col.find(
        {"user_id": ObjectId(user_id), "session_id": session_id},
        {"_id": 0, "role": 1, "content": 1, "timestamp": 1}
    ).sort("timestamp", 1)

    return await cursor.to_list(length=50)   # cap at 50 messages per session

async def get_all_sessions(user_id: str) -> list[dict]:
    """
    Return a summary of all sessions for a user.
    Each session: session_id + first message + last active time.
    """
    pipeline = [
        {"$match": {"user_id": ObjectId(user_id)}},
        {"$sort": {"timestamp": 1}},
        {"$group": {
            "_id":          "$session_id",
            "first_message": {"$first": "$content"},
            "last_active":   {"$last":  "$timestamp"},
            "message_count": {"$sum": 1}
        }},
        {"$sort": {"last_active": -1}}   # most recent session first
    ]
    cursor = chats_col.aggregate(pipeline)
    sessions = await cursor.to_list(length=20)

    return [
        {
            "session_id":    s["_id"],
            "preview":       s["first_message"][:60] + "..." if len(s["first_message"]) > 60 else s["first_message"],
            "last_active":   s["last_active"],
            "message_count": s["message_count"]
        }
        for s in sessions
    ]

async def delete_session(user_id: str, session_id: str):
    """Hard delete all messages in a session"""
    await chats_col.delete_many({
        "user_id":    ObjectId(user_id),
        "session_id": session_id
    })