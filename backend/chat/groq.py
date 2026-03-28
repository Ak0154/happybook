from groq import AsyncGroq
from dotenv import load_dotenv
import os

load_dotenv()

client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))

SYSTEM_PROMPT = """
You are HappyBook Assistant — a friendly, patient academic tutor.
Help students understand concepts clearly.
- Always explain step by step
- Use simple language appropriate for students
- Give examples where helpful
- If a question is outside academics, politely redirect
- Never do homework for them — guide instead
"""

def _build_history(messages: list[dict]) -> list[dict]:
    """Convert DB messages to Groq/OpenAI message format"""
    return [
        {
            "role":    "assistant" if msg["role"] == "assistant" else "user",
            "content": msg["content"]
        }
        for msg in messages
    ]

async def get_groq_reply(user_message: str, history: list[dict]) -> str:
    """Send message + history to Groq, return reply string"""

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    messages += _build_history(history)
    messages.append({"role": "user", "content": user_message})

    response = await client.chat.completions.create(
        model="llama-3.3-70b-versatile",   # fast + smart, good for Q&A
        messages=messages,
        max_tokens=1024,
        temperature=0.7,
    )

    return response.choices[0].message.content