from fastapi import APIRouter, HTTPException, status, Depends  # Depends was missing too
from datetime import datetime
from bson import ObjectId

from db import users_col                          # ✅ this is what you noticed was missing
from backend.models.user import RegisterRequest, VerifyOTPRequest, LoginRequest, TokenResponse, UserResponse
from backend.auth.hash import hash_password, verify_password
from backend.auth.otp import send_otp, verify_otp
from backend.auth.jwt import create_access_token, get_current_user   # get_current_user added here

router = APIRouter()

@router.post("/register", status_code=201)
async def register(body: RegisterRequest):
    # Check duplicate email
    if await users_col.find_one({"email": body.email}):
        raise HTTPException(status_code=409, detail="Email already registered")

    await users_col.insert_one({
        "name":              body.name,
        "email":             body.email,
        "password_hash":     hash_password(body.password),
        "grade":             body.grade,
        "subject_interests": body.subject_interests,
        "is_verified":       False,
        "created_at":        datetime.utcnow()
    })

    await send_otp(body.email)
    return {"message": "OTP sent to your email"}


@router.post("/verify-otp")
async def verify(body: VerifyOTPRequest):
    valid = await verify_otp(body.email, body.otp)
    if not valid:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP")

    user = await users_col.find_one_and_update(
        {"email": body.email},
        {"$set": {"is_verified": True}},
        return_document=True
    )

    token = create_access_token(str(user["_id"]), user["email"])
    return TokenResponse(access_token=token)


@router.post("/login")
async def login(body: LoginRequest):
    user = await users_col.find_one({"email": body.email})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if not user["is_verified"]:
        raise HTTPException(status_code=403, detail="Email not verified")
    if not verify_password(body.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    token = create_access_token(str(user["_id"]), user["email"])
    return TokenResponse(access_token=token)


@router.get("/me", response_model=UserResponse)
async def me(user: dict = Depends(get_current_user)):
    """Protected — returns current user profile"""
    doc = await users_col.find_one({"_id": ObjectId(user["sub"])})
    return UserResponse(
        id=str(doc["_id"]),
        name=doc["name"],
        email=doc["email"],
        grade=doc.get("grade"),
        is_verified=doc["is_verified"]
    )