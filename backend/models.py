from pydantic import BaseModel
from typing import Optional

# Pydantic models ensure data validation and consistent API schemas
class Loan(BaseModel):
    id: str
    borrower: str
    type: str
    amount: int
    currency: str
    status: str
    next_payment: str
    risk_score: int
    spread: str

class DashboardStats(BaseModel):
    total_exposure: int
    active_facilities: int
    pending_actions: int
    avg_risk_score: float