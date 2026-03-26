import random
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta
from passlib.context import CryptContext
from dotenv import load_dotenv
import os

from db import otp_col

load_dotenv()

otp_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _generate_otp() -> str:
    return str(random.randint(100000, 999999))

def _hash_otp(otp: str) -> str:
    return otp_context.hash(otp)

def _verify_otp_hash(plain: str, hashed: str) -> bool:
    return otp_context.verify(plain, hashed)

def _send_email(to_email: str, otp: str):
    """Send OTP via Gmail SMTP"""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Your HappyBook OTP"
    msg["From"]    = os.getenv("GMAIL_USER")
    msg["To"]      = to_email

    html = f"""
    <div style="font-family:sans-serif;max-width:400px;margin:auto">
      <h2 style="color:#4F46E5">HappyBook 📚</h2>
      <p>Your verification code is:</p>
      <h1 style="letter-spacing:8px;color:#111">{otp}</h1>
      <p style="color:#888;font-size:13px">Valid for 10 minutes. Do not share this.</p>
    </div>
    """
    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(os.getenv("GMAIL_USER"), os.getenv("GMAIL_APP_PASSWORD"))
        server.sendmail(os.getenv("GMAIL_USER"), to_email, msg.as_string())

async def send_otp(email: str):
    """Generate, hash, store, and email the OTP"""
    otp = _generate_otp()

    # Delete any existing unused OTP for this email
    await otp_col.delete_many({"email": email})

    await otp_col.insert_one({
        "email":      email,
        "otp_hash":   _hash_otp(otp),
        "expires_at": datetime.utcnow() + timedelta(minutes=10),
        "used":       False
    })

    _send_email(email, otp)   # runs sync — fine for now, see note below

async def verify_otp(email: str, otp: str) -> bool:
    """
    Returns True if OTP is valid + unexpired + unused.
    Marks it as used on success.
    """
    record = await otp_col.find_one({
        "email": email,
        "used":  False,
        "expires_at": {"$gt": datetime.utcnow()}
    })

    if not record:
        return False

    if not _verify_otp_hash(otp, record["otp_hash"]):
        return False

    # Mark as used immediately — prevents replay
    await otp_col.update_one(
        {"_id": record["_id"]},
        {"$set": {"used": True}}
    )
    return True