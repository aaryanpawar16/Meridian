from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import Loan, DashboardStats
from mock_data import loans

app = FastAPI(
    title="Meridian API",
    description="Backend API for the Meridian Loan Management System",
    version="1.0.0"
)

# CORS Configuration
# Allows the React frontend (running on port 5173) to communicate with this API
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"status": "Meridian System Online", "version": "1.0.0"}

@app.get("/api/loans", response_model=List[Loan])
async def get_loans():
    """
    Fetch all active loan facilities.
    """
    return loans

@app.get("/api/loans/{loan_id}", response_model=Loan)
async def get_loan_detail(loan_id: str):
    """
    Fetch details for a specific loan ID.
    """
    loan = next((item for item in loans if item["id"] == loan_id), None)
    if loan:
        return loan
    raise HTTPException(status_code=404, detail="Loan not found")

@app.get("/api/stats", response_model=DashboardStats)
async def get_dashboard_stats():
    """
    Calculate dynamic portfolio statistics.
    """
    total_volume = sum(l['amount'] for l in loans)
    action_items = len([l for l in loans if l['status'] == "Action Required"])
    avg_risk = sum(l['risk_score'] for l in loans) / len(loans) if loans else 0
    
    return {
        "total_exposure": total_volume,
        "active_facilities": len(loans),
        "pending_actions": action_items,
        "avg_risk_score": round(avg_risk, 1)
    }