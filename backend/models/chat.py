from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

# --- Pydantic request/response schemas ---

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: Optional[str] = None    # group messages into sessions

class MessageOut(BaseModel):
    role: Literal["user", "assistant"]
    content: str
    timestamp: datetime

class ChatResponse(BaseModel):
    session_id: str
    reply: str
    timestamp: datetime

class HistoryResponse(BaseModel):
    session_id: str
    messages: list[MessageOut]

# --- MongoDB document shape ---

# Collection: chats
# {
#   "_id": ObjectId,
#   "user_id": ObjectId,    # ref to users._id
#   "session_id": str,      # uuid4, groups a conversation thread
#   "role": "user" | "assistant",
#   "content": str,
#   "timestamp": datetime
# }

# Index: (user_id, session_id, timestamp) for fast history fetch