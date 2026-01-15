from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from extensions import db
from models.product import Product

product_bp = Blueprint(
    "products",
    __name__,
    url_prefix="/api/products"
)


# =========================
# GET ALL PRODUCTS
# =========================
@product_bp.route("", methods=["GET"])
@product_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.order_by(Product.created_at.desc()).all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "price": p.price,
            "image": p.image
        } for p in products
    ]), 200


# =========================
# CREATE PRODUCT
# =========================
@product_bp.route("", methods=["POST"])
@product_bp.route("/", methods=["POST"])
@jwt_required()
def create_product():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"message": "Request body must be JSON"}), 422

    title = data.get("title")
    description = data.get("description")
    price = data.get("price", 0)
    image = data.get("image")

    if not title:
        return jsonify({"message": "Title is required"}), 422

    try:
        product = Product(
            title=title,
            description=description,
            price=float(price),
            image=image
        )

        db.session.add(product)
        db.session.commit()

        return jsonify({"message": "Course saved successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Failed to save course",
            "error": str(e)
        }), 500


# =========================
# UPDATE PRODUCT
# =========================
@product_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_product(id):
    data = request.get_json(silent=True)
    product = Product.query.get_or_404(id)

    try:
        product.title = data.get("title", product.title)
        product.description = data.get("description", product.description)
        product.price = float(data.get("price", product.price))
        product.image = data.get("image", product.image)

        db.session.commit()
        return jsonify({"message": "Course updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Failed to update course",
            "error": str(e)
        }), 500


# =========================
# DELETE PRODUCT
# =========================
@product_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    product = Product.query.get_or_404(id)

    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Course deleted successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "Failed to delete course",
            "error": str(e)
        }), 500
