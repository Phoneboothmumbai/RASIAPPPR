from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Rasino Drugs API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ========== MODELS ==========

class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # API, Intermediate, Fine Chemical
    cas_number: Optional[str] = None
    molecular_formula: Optional[str] = None
    molecular_weight: Optional[str] = None
    description: str
    applications: List[str] = []
    specifications: dict = {}
    image_url: Optional[str] = None
    featured: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductCreate(BaseModel):
    name: str
    category: str
    cas_number: Optional[str] = None
    molecular_formula: Optional[str] = None
    molecular_weight: Optional[str] = None
    description: str
    applications: List[str] = []
    specifications: dict = {}
    image_url: Optional[str] = None
    featured: bool = False

class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    country: str
    product_id: Optional[str] = None
    product_name: Optional[str] = None
    quantity: Optional[str] = None
    message: str
    inquiry_type: str = "general"  # general, product, bulk_order
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    company: str
    phone: Optional[str] = None
    country: str
    product_id: Optional[str] = None
    product_name: Optional[str] = None
    quantity: Optional[str] = None
    message: str
    inquiry_type: str = "general"

class Certification(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    issuing_body: str
    valid_until: Optional[str] = None
    document_url: str
    icon: str

# ========== SEED DATA ==========

SEED_PRODUCTS = [
    {
        "id": "prod-001",
        "name": "Chlorpromazine HCL",
        "category": "API",
        "cas_number": "69-09-0",
        "molecular_formula": "C17H19ClN2S·HCl",
        "molecular_weight": "355.33 g/mol",
        "description": "Chlorpromazine Hydrochloride is a phenothiazine derivative used as an antipsychotic and antiemetic agent. It is one of the first generation antipsychotics.",
        "applications": ["Antipsychotic formulations", "Antiemetic preparations", "Sedative medications"],
        "specifications": {
            "Appearance": "White to off-white crystalline powder",
            "Purity": "≥99.0%",
            "Melting Point": "194-198°C",
            "pH": "4.0-5.0 (1% solution)",
            "Loss on Drying": "≤0.5%"
        },
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
        "featured": True
    },
    {
        "id": "prod-002",
        "name": "Carbamazepine",
        "category": "API",
        "cas_number": "298-46-4",
        "molecular_formula": "C15H12N2O",
        "molecular_weight": "236.27 g/mol",
        "description": "Carbamazepine is an anticonvulsant and mood-stabilizing drug primarily used in the treatment of epilepsy and bipolar disorder.",
        "applications": ["Anticonvulsant drugs", "Mood stabilizers", "Trigeminal neuralgia treatment"],
        "specifications": {
            "Appearance": "White to yellowish-white powder",
            "Purity": "≥99.5%",
            "Melting Point": "189-193°C",
            "Loss on Drying": "≤0.5%",
            "Heavy Metals": "≤10 ppm"
        },
        "image_url": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400",
        "featured": True
    },
    {
        "id": "prod-003",
        "name": "Ethamsylate",
        "category": "API",
        "cas_number": "2624-44-4",
        "molecular_formula": "C10H17NO5S",
        "molecular_weight": "263.31 g/mol",
        "description": "Ethamsylate is a haemostatic agent used to prevent and treat capillary bleeding. It improves platelet adhesion and restores capillary resistance.",
        "applications": ["Haemostatic formulations", "Surgical bleeding control", "Menorrhagia treatment"],
        "specifications": {
            "Appearance": "White crystalline powder",
            "Purity": "≥98.5%",
            "Melting Point": "126-130°C",
            "pH": "5.5-7.0 (1% solution)"
        },
        "image_url": "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400",
        "featured": False
    },
    {
        "id": "prod-004",
        "name": "Miconazole Nitrate",
        "category": "API",
        "cas_number": "22832-87-7",
        "molecular_formula": "C18H14Cl4N2O·HNO3",
        "molecular_weight": "479.14 g/mol",
        "description": "Miconazole Nitrate is an imidazole antifungal agent used for the treatment of fungal infections of the skin, mouth, and vagina.",
        "applications": ["Antifungal creams", "Oral gels", "Vaginal preparations"],
        "specifications": {
            "Appearance": "White to pale cream powder",
            "Purity": "≥99.0%",
            "Melting Point": "170-175°C",
            "Loss on Drying": "≤0.5%"
        },
        "image_url": "https://images.unsplash.com/photo-1576671081837-49000212a370?w=400",
        "featured": True
    },
    {
        "id": "prod-005",
        "name": "2-Chlorophenothiazine",
        "category": "Intermediate",
        "cas_number": "581-37-3",
        "molecular_formula": "C12H8ClNS",
        "molecular_weight": "233.72 g/mol",
        "description": "2-Chlorophenothiazine is a key intermediate in the synthesis of Chlorpromazine and other phenothiazine-based pharmaceutical compounds.",
        "applications": ["Chlorpromazine synthesis", "Phenothiazine derivatives", "Pharmaceutical intermediates"],
        "specifications": {
            "Appearance": "Light yellow to greenish powder",
            "Purity": "≥98.0%",
            "Melting Point": "196-202°C"
        },
        "image_url": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400",
        "featured": False
    },
    {
        "id": "prod-006",
        "name": "Imidazole Ethanol",
        "category": "Intermediate",
        "cas_number": "1615-14-1",
        "molecular_formula": "C5H8N2O",
        "molecular_weight": "112.13 g/mol",
        "description": "Imidazole Ethanol (1-(2-Hydroxyethyl)imidazole) is a versatile intermediate used in the synthesis of various imidazole-based antifungal compounds.",
        "applications": ["Miconazole synthesis", "Imidazole derivatives", "Antifungal intermediates"],
        "specifications": {
            "Appearance": "Colorless to pale yellow liquid",
            "Purity": "≥98.0%",
            "Boiling Point": "95-97°C at 1 mmHg"
        },
        "image_url": "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400",
        "featured": False
    },
    {
        "id": "prod-007",
        "name": "4-Nitrophenol",
        "category": "Fine Chemical",
        "cas_number": "100-02-7",
        "molecular_formula": "C6H5NO3",
        "molecular_weight": "139.11 g/mol",
        "description": "4-Nitrophenol is a fine chemical used as an intermediate in the synthesis of various pharmaceutical compounds, dyes, and agrochemicals.",
        "applications": ["Pharmaceutical synthesis", "Dye intermediates", "Chemical research"],
        "specifications": {
            "Appearance": "Yellow crystalline powder",
            "Purity": "≥99.0%",
            "Melting Point": "113-116°C"
        },
        "image_url": "https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=400",
        "featured": False
    },
    {
        "id": "prod-008",
        "name": "Benzyl Chloride",
        "category": "Fine Chemical",
        "cas_number": "100-44-7",
        "molecular_formula": "C7H7Cl",
        "molecular_weight": "126.58 g/mol",
        "description": "Benzyl Chloride is an important fine chemical used as a building block in organic synthesis for pharmaceuticals, plasticizers, and quaternary ammonium compounds.",
        "applications": ["Pharmaceutical intermediates", "Plasticizer production", "Quaternary ammonium salts"],
        "specifications": {
            "Appearance": "Colorless liquid",
            "Purity": "≥99.0%",
            "Boiling Point": "179°C",
            "Density": "1.100 g/mL"
        },
        "image_url": "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
        "featured": False
    },
    {
        "id": "prod-009",
        "name": "Promethazine HCL",
        "category": "API",
        "cas_number": "58-33-3",
        "molecular_formula": "C17H20N2S·HCl",
        "molecular_weight": "320.88 g/mol",
        "description": "Promethazine Hydrochloride is a first-generation antihistamine used for allergies, insomnia, and nausea. Also used as sedative and anti-motion sickness agent.",
        "applications": ["Antihistamine formulations", "Sedative medications", "Anti-nausea preparations"],
        "specifications": {
            "Appearance": "White to faint yellow crystalline powder",
            "Purity": "≥99.0%",
            "Melting Point": "222-227°C",
            "pH": "4.0-5.0 (1% solution)"
        },
        "image_url": "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400",
        "featured": False
    },
    {
        "id": "prod-010",
        "name": "Phenothiazine",
        "category": "Intermediate",
        "cas_number": "92-84-2",
        "molecular_formula": "C12H9NS",
        "molecular_weight": "199.27 g/mol",
        "description": "Phenothiazine is the parent compound for a class of antipsychotic and antihistaminic drugs. Used as a key intermediate in pharmaceutical synthesis.",
        "applications": ["Drug intermediate synthesis", "Anthelmintic preparations", "Research chemical"],
        "specifications": {
            "Appearance": "Greenish-yellow crystals",
            "Purity": "≥98.5%",
            "Melting Point": "182-186°C"
        },
        "image_url": "https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=400",
        "featured": False
    }
]

SEED_CERTIFICATIONS = [
    {
        "id": "cert-001",
        "name": "GMP Certification",
        "description": "Good Manufacturing Practice certification ensuring our facilities and processes meet the highest quality standards for pharmaceutical production.",
        "issuing_body": "Central Drugs Standard Control Organization (CDSCO)",
        "valid_until": "December 2026",
        "document_url": "/documents/gmp-certificate.pdf",
        "icon": "Shield"
    },
    {
        "id": "cert-002",
        "name": "ISO 9001:2015",
        "description": "International standard for quality management systems, demonstrating our commitment to consistent quality and continuous improvement.",
        "issuing_body": "International Organization for Standardization",
        "valid_until": "March 2027",
        "document_url": "/documents/iso-9001.pdf",
        "icon": "Award"
    },
    {
        "id": "cert-003",
        "name": "ISO 14001:2015",
        "description": "Environmental management system certification showing our dedication to minimizing environmental impact and sustainable practices.",
        "issuing_body": "International Organization for Standardization",
        "valid_until": "March 2027",
        "document_url": "/documents/iso-14001.pdf",
        "icon": "Leaf"
    },
    {
        "id": "cert-004",
        "name": "WHO-GMP",
        "description": "World Health Organization Good Manufacturing Practice prequalification for pharmaceutical ingredients.",
        "issuing_body": "World Health Organization",
        "valid_until": "June 2026",
        "document_url": "/documents/who-gmp.pdf",
        "icon": "Globe"
    },
    {
        "id": "cert-005",
        "name": "Drug Manufacturing License",
        "description": "License to manufacture pharmaceutical products and active pharmaceutical ingredients in India.",
        "issuing_body": "FDA Maharashtra",
        "valid_until": "December 2025",
        "document_url": "/documents/drug-license.pdf",
        "icon": "FileCheck"
    }
]

# ========== ROUTES ==========

@api_router.get("/")
async def root():
    return {"message": "Rasino Drugs API", "version": "1.0.0"}

# Products Routes
@api_router.get("/products", response_model=List[Product])
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    featured: Optional[bool] = None
):
    """Get all products with optional filtering"""
    query = {}
    
    if category:
        query["category"] = category
    if featured is not None:
        query["featured"] = featured
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"cas_number": {"$regex": search, "$options": "i"}}
        ]
    
    products = await db.products.find(query, {"_id": 0}).to_list(100)
    
    # Convert datetime strings back to datetime objects
    for product in products:
        if isinstance(product.get('created_at'), str):
            product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return products

@api_router.get("/products/categories")
async def get_product_categories():
    """Get all product categories with counts"""
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    results = await db.products.aggregate(pipeline).to_list(10)
    return [{"name": r["_id"], "count": r["count"]} for r in results]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await db.products.find_one({"id": product_id}, {"_id": 0})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    if isinstance(product.get('created_at'), str):
        product['created_at'] = datetime.fromisoformat(product['created_at'])
    
    return product

# Inquiries Routes
@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(inquiry_data: InquiryCreate):
    """Create a new inquiry"""
    inquiry = Inquiry(**inquiry_data.model_dump())
    doc = inquiry.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.inquiries.insert_one(doc)
    return inquiry

@api_router.get("/inquiries", response_model=List[Inquiry])
async def get_inquiries():
    """Get all inquiries (admin)"""
    inquiries = await db.inquiries.find({}, {"_id": 0}).to_list(100)
    
    for inquiry in inquiries:
        if isinstance(inquiry.get('created_at'), str):
            inquiry['created_at'] = datetime.fromisoformat(inquiry['created_at'])
    
    return inquiries

# Certifications Routes
@api_router.get("/certifications", response_model=List[Certification])
async def get_certifications():
    """Get all certifications"""
    certifications = await db.certifications.find({}, {"_id": 0}).to_list(10)
    return certifications

# Seed Data Route
@api_router.post("/seed")
async def seed_database():
    """Seed the database with initial data"""
    # Clear existing data
    await db.products.delete_many({})
    await db.certifications.delete_many({})
    
    # Seed products
    for product in SEED_PRODUCTS:
        product['created_at'] = datetime.now(timezone.utc).isoformat()
        await db.products.insert_one(product)
    
    # Seed certifications
    for cert in SEED_CERTIFICATIONS:
        await db.certifications.insert_one(cert)
    
    return {
        "message": "Database seeded successfully",
        "products": len(SEED_PRODUCTS),
        "certifications": len(SEED_CERTIFICATIONS)
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
