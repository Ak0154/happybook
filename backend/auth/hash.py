import hashlib
import base64
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _prehash(plain: str) -> str:
    """
    SHA-256 the password first → base64 encode it.
    Result is always 44 chars — safely under bcrypt's 72 byte limit.
    """
    digest = hashlib.sha256(plain.encode()).digest()
    return base64.b64encode(digest).decode()

def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(_prehash(plain), hashed)