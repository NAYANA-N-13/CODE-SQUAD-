# TrustCart

> AI-powered e-commerce platform — React + Tailwind CSS · FastAPI · MongoDB

---

## Project Structure

```
trustcart/
├── frontend/                  # React + Tailwind CSS (Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx           # React entry (QueryClient + Toaster)
│       ├── App.jsx            # Router
│       ├── index.css          # Global styles & Tailwind layers
│       ├── api/
│       │   ├── client.js      # Axios instance (auth + error interceptors)
│       │   └── index.js       # All API calls (product, auth, cart, orders, ai)
│       ├── context/
│       │   ├── AuthContext.jsx # JWT session management
│       │   └── CartContext.jsx # Cart state with localStorage persist
│       ├── hooks/
│       │   ├── useProducts.js  # React Query product hooks
│       │   └── useAI.js        # AI mutation hooks
│       ├── components/
│       │   ├── layout/         Navbar · Footer · MainLayout
│       │   ├── product/        ProductCard
│       │   ├── cart/           (expand per feature)
│       │   └── ai/             TrustBadge · AIRecommendationCard
│       └── pages/
│           └── index.jsx       Page stubs (Home, Products, Cart, …)
│
└── backend/                   # FastAPI + MongoDB
    ├── requirements.txt
    ├── .env.example
    └── app/
        ├── main.py            # App factory (CORS, lifespan, health)
        ├── core/
        │   ├── config.py      # Pydantic Settings (env vars)
        │   └── security.py    # bcrypt + JWT
        ├── db/
        │   └── mongodb.py     # Motor async connection lifecycle
        ├── models/
        │   ├── base.py        # MongoBaseModel + PyObjectId
        │   └── models.py      # User, Product, Order, Review
        ├── schemas/
        │   └── schemas.py     # All Pydantic request/response schemas
        ├── services/
        │   ├── product_service.py  # Product + Review business logic
        │   └── ai_service.py       # OpenAI integration stubs
        ├── api/v1/
        │   ├── router.py          # Include all endpoint routers
        │   └── endpoints/
        │       ├── auth.py        # /api/v1/auth/*
        │       ├── products.py    # /api/v1/products/*
        │       └── ai.py          # /api/v1/ai/*
        └── tests/
            └── test_health.py
```

---

## Quick Start

### Backend

```bash
cd trustcart/backend
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env          # then fill in your values
uvicorn app.main:app --reload
# Docs at http://localhost:8000/api/docs
```

### Frontend

```bash
cd trustcart/frontend
npm install
npm run dev
# App at http://localhost:5173
```

---

## API Endpoints (v1)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login → JWT |
| GET  | `/api/v1/auth/me` | Current user |
| GET  | `/api/v1/products/` | List products |
| GET  | `/api/v1/products/search?q=` | Search |
| GET  | `/api/v1/products/categories` | Categories |
| GET  | `/api/v1/products/:id` | Single product |
| POST | `/api/v1/ai/recommend` | AI recommendations |
| POST | `/api/v1/ai/trust-score` | Trust score for product |
| POST | `/api/v1/ai/review-summary` | AI review summary |
| GET  | `/health` | Health check |

---

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| `primary-600` | `#4f46e5` | CTAs, links |
| `trust-green` | `#10b981` | High trust |
| `trust-gold`  | `#f59e0b` | Medium trust |
| `trust-red`   | `#ef4444` | Low trust |
| `.glass` | backdrop-blur | Navbar, overlays |
| `.text-gradient` | `from-primary to-violet` | Headings |

---

## Next Steps

- [ ] Implement Cart & Orders endpoints  
- [ ] Add auth middleware (`get_current_user` dependency)  
- [ ] Wire AI service with real OpenAI prompts & vector search  
- [ ] Build full ProductsPage grid with filters  
- [ ] Add MongoDB indexes (text, compound)  
- [ ] CI/CD pipeline (GitHub Actions)  
