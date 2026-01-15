from flask import Blueprint, request, jsonify
from extensions import db
from models.enrollment import Enrollment

enrollment_routes = Blueprint("enrollment_routes", __name__)

# 🔎 GET ENROLLED COURSES FOR A USER
@enrollment_routes.route("/api/enrollments/user/<int:user_id>", methods=["GET"])
def get_user_enrollments(user_id):
    enrollments = Enrollment.query.filter_by(user_id=user_id).all()

    return jsonify([
        enrollment.to_dict() for enrollment in enrollments
    ]), 200


# 🔐 CREATE ENROLLMENT (AFTER PAYMENT)
@enrollment_routes.route("/api/enrollments/", methods=["POST"])
def enroll_course():
    data = request.get_json()

    user_id = data.get("user_id")
    course_id = data.get("course_id")
    title = data.get("title")
    price = data.get("price")

    if not all([user_id, course_id, title, price]):
        return jsonify({"message": "Missing required fields"}), 400

    # ❌ Prevent duplicate enrollment
    existing = Enrollment.query.filter_by(
        user_id=user_id,
        course_id=course_id
    ).first()

    if existing:
        return jsonify({"message": "Already enrolled"}), 409

    enrollment = Enrollment(
        user_id=user_id,
        course_id=course_id,
        course_title=title,
        price=price,
        payment_status="success"
    )

    db.session.add(enrollment)
    db.session.commit()

    return jsonify({
        "message": "Enrollment successful",
        "enrollment": enrollment.to_dict()
    }), 201
