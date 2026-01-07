# Centralized mock data store
# In a real app, this would be replaced by a database connection (PostgreSQL/SQLAlchemy)

loans = [
    {
        "id": "L-1024",
        "borrower": "Acme Global Industries",
        "type": "Term Loan B",
        "amount": 500000000,
        "currency": "USD",
        "status": "Active",
        "next_payment": "2026-02-15",
        "risk_score": 92,
        "spread": "SOFR + 3.5%"
    },
    {
        "id": "L-1025",
        "borrower": "NorthSea Energy Partners",
        "type": "Revolving Credit",
        "amount": 120000000,
        "currency": "EUR",
        "status": "Action Required",
        "next_payment": "2026-01-20",
        "risk_score": 45,
        "spread": "EURIBOR + 4.0%"
    },
    {
        "id": "L-1026",
        "borrower": "Vertex Logistics",
        "type": "Sustainability Linked",
        "amount": 75000000,
        "currency": "GBP",
        "status": "Active",
        "next_payment": "2026-03-01",
        "risk_score": 88,
        "spread": "SONIA + 2.75%"
    },
    {
        "id": "L-1027",
        "borrower": "Helios Tech Corp",
        "type": "Bridge Facility",
        "amount": 250000000,
        "currency": "USD",
        "status": "Pending Review",
        "next_payment": "2026-01-30",
        "risk_score": 65,
        "spread": "SOFR + 4.5%"
    },
    {
        "id": "L-1028",
        "borrower": "Apex Maritime",
        "type": "Ship Finance",
        "amount": 80000000,
        "currency": "USD",
        "status": "Active",
        "next_payment": "2026-04-12",
        "risk_score": 78,
        "spread": "SOFR + 3.2%"
    },
    {
        "id": "L-1029",
        "borrower": "Quantum Health",
        "type": "Term Loan A",
        "amount": 150000000,
        "currency": "USD",
        "status": "Active",
        "next_payment": "2026-02-28",
        "risk_score": 95,
        "spread": "SOFR + 2.5%"
    }
]