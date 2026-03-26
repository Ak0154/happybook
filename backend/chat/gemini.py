from google import genai
from google.genai import types
from dotenv import load_dotenv
import os

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are HappyBook Assistant — a friendly, patient academic tutor.
Help students understand concepts clearly.
- Always explain step by step
- Use simple language appropriate for students
- Give examples where helpful
- If a question is outside academics, politely redirect
- Never do homework for them — guide instead
"""

def _build_history(messages: list[dict]) -> list[types.Content]:
    """Convert DB messages to google-genai Content format"""
    history = []
    for msg in messages:
        history.append(
            types.Content(
                role="model" if msg["role"] == "assistant" else "user",
                parts=[types.Part(text=msg["content"])]
            )
        )
    return history

async def get_gemini_reply(user_message: str, history: list[dict]) -> str:
    """Send message + history to Gemini, return reply string"""

    contents = _build_history(history)

    # Append the new user message
    contents.append(
        types.Content(
            role="user",
            parts=[types.Part(text=user_message)]
        )
    )

    response = client.models.generate_content(
        model="gemini-1.5-flash",
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            max_output_tokens=1024,
            temperature=0.7,
        ),
        contents=contents
    )

    return response.text