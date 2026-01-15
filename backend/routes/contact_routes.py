from flask import Blueprint, request, jsonify
from extensions import db
from models.contact import Contact

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contact")

@contact_bp.route("/", methods=["POST"])
def submit_contact():
    data = request.json
    contact = Contact(
        name=data.get("name"),
        email=data.get("email"),
        message=data.get("message")
    )
    db.session.add(contact)
    db.session.commit()

    return jsonify({"message": "Message received successfully"}), 201


@contact_bp.route("/", methods=["GET"])
def get_contacts():
    contacts = Contact.query.order_by(Contact.created_at.desc()).all()
    return jsonify([{
        "id": c.id,
        "name": c.name,
        "email": c.email,
        "message": c.message
    } for c in contacts])
