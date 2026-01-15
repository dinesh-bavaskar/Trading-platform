from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models.admin import Admin
from models.user import User

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

from models.user import User
from extensions import db

@auth_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()

    if not data or not all(k in data for k in ("name", "email", "password")):
        return jsonify({"message": "All fields required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already registered"}), 409

    user = User(
        name=data["name"],
        email=data["email"]
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data or "email" not in data or "password" not in data:
        return jsonify({"message": "Email and password required"}), 400

    email = data["email"]
    password = data["password"]

    # 🔍 1️⃣ Check ADMIN first
    admin = Admin.query.filter_by(email=email).first()
    if admin and admin.check_password(password):
        token = create_access_token(
            identity=str(admin.id),
            additional_claims={"role": "admin"}
        )

        return jsonify({
            "token": token,
            "user": {
                "id": admin.id,
                "name": admin.name,
                "email": admin.email,
                "role": "admin"
            }
        }), 200

    # 🔍 2️⃣ Check USER
    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(
            identity=str(user.id),
            additional_claims={"role": "user"}
        )

        return jsonify({
            "token": token,
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": "user"
            }
        }), 200

    return jsonify({"message": "Invalid credentials"}), 401
