# python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from supabase_client import supabase

app = FastAPI()

class SignUpRequest(BaseModel):
    email: EmailStr
    password: str
    nickname: str

class SignInRequest(BaseModel):
    email: EmailStr
    password: str

@app.post("/auth/signup")
def signup(req: SignUpRequest):
    if len(req.password) < 8:
        raise HTTPException(status_code=400, detail="Password must be at least 8 characters")

    try:
        # Supabase Auth 가입
        res = supabase.auth.sign_up({
            "email": req.email,
            "password": req.password,
            "options": {
                "data": { "nickname": req.nickname }  # user_metadata
            }
        })

        # supabase-py는 에러를 예외로 던지거나, res.user가 None일 수 있음
        if not getattr(res, "user", None):
            raise HTTPException(status_code=400, detail="Sign up failed")

        return {
            "ok": True,
            "user": {
                "id": res.user.id,
                "email": res.user.email,
                "nickname": (res.user.user_metadata or {}).get("nickname"),
            }
        }

    except Exception as e:
        msg = str(e)
        # 중복 가입 케이스 메시지는 환경/버전에 따라 조금 다를 수 있음
        if "already" in msg.lower() or "registered" in msg.lower():
            raise HTTPException(status_code=409, detail="Email already registered")
        raise HTTPException(status_code=500, detail=msg)

@app.post("/auth/signin")
def signin(req: SignInRequest):
    try:
        res = supabase.auth.sign_in_with_password({
            "email": req.email,
            "password": req.password
        })

        if not getattr(res, "user", None) or not getattr(res, "session", None):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {
            "ok": True,
            "user": {
                "id": res.user.id,
                "email": res.user.email,
                "nickname": (res.user.user_metadata or {}).get("nickname"),
            },
            "session": {
                "access_token": res.session.access_token,
                "refresh_token": res.session.refresh_token,
                "expires_in": res.session.expires_in,
            }
        }

    except Exception as e:
        msg = str(e)
        # 로그인 실패 케이스
        if "invalid" in msg.lower() or "credentials" in msg.lower():
            raise HTTPException(status_code=401, detail="Invalid credentials")
        raise HTTPException(status_code=500, detail=msg)
