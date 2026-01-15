import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")

    # ✅ SQLite DB inside backend folder
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DB_URI",
        "sqlite:///" + os.path.join(BASE_DIR, "algo_tradin.db")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "jwtsecretkey")
