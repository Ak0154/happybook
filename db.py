from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os
import certifi

load_dotenv()

client = AsyncIOMotorClient(
    os.getenv("MONGO_URI"),
    tlsCAFile=certifi.where()
)

db = client["happybook"]

users_col = db["users"]
otp_col   = db["otp_tokens"]
chats_col = db["chats"]

async def init_indexes():
    await users_col.create_index("email", unique=True)
    await otp_col.create_index("expires_at", expireAfterSeconds=0)
    await chats_col.create_index([("user_id", 1), ("session_id", 1), ("timestamp", 1)])