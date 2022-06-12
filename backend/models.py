from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID, uuid4
from enum import Enum


class Role(str, Enum):
    admin = "admin"
    user = "user"
    premium_user = "premium_user"

class User(BaseModel):
    id: Optional[UUID] = uuid4()
    first_name: str
    last_name: str
    roles: List[Role]

class UserUpdateRequest(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    roles: Optional[List[Role]]