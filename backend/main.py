from fastapi import FastAPI, HTTPException
from models import User, Role, UserUpdateRequest
from uuid import uuid4, UUID
from typing import List


app = FastAPI()

db: List[User] = [
    User(id=uuid4(), first_name="gasti",
         last_name="de schant", roles=[Role.premium_user]),
    User(id=uuid4(), first_name="brittu",
         last_name="lin", roles=[Role.admin])
]


@app.get("/")
def root():
    return {"Hello": "world"}

@app.get("/api/v1/users")
async def fetch_users():
    return db

@app.post("/api/v1/users")
async def register_user(user: User):
    db.append(user)
    return {"id": user.id}

@app.put("/api/v1/users/{user_id}")
async def update_user(user_update: UserUpdateRequest,user_id: UUID):
    for user in db:
        if user.id == user_id:
            if user_update.first_name is not None:
                user.first_name = user_update.first_name
            if user_update.last_name is not None:
                user.last_name = user_update.last_name
            if user_update.roles is not None:
                user.roles = user_update.roles
            return user
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {user_id} does not exists"
    )
            

@app.delete("/api/v1/users/{user_id}")
async def remove_user(user_id: UUID):
    for user in db:
        if user.id == user_id:
            db.remove(user)
            return {}
    raise HTTPException(
        status_code=404,
        detail=f"user with id: {user_id} does not exists"
    )