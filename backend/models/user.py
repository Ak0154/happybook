from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from bson import ObjectId

# --- Pydantic request/response schemas ---

class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    grade: Optional[str] = None          # e.g. "10th", "B.Tech 2nd year"
    subject_interests: Optional[list[str]] = []

class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str = Field(..., min_length=6, max_length=6)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    grade: Optional[str]
    is_verified: bool
class JWTData(BaseModel):
    sub: str        # user_id (MongoDB ObjectId as string)
    email: str
    exp: datetime
# --- MongoDB document shape (for reference, not enforced by Mongo) ---

# {
#   "_id": ObjectId,
#   "name": str,
#   "email": str,           # unique index
#   "password_hash": str,
#   "grade": str | None,
#   "subject_interests": [str],
#   "is_verified": bool,    # False until OTP confirmed
#   "created_at": datetime
# }