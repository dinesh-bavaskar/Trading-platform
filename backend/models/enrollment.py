from datetime import datetime
from extensions import db

class Enrollment(db.Model):
    __tablename__ = "enrollments"

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)

    course_title = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)

    payment_status = db.Column(db.String(50), default="success")
    enrolled_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "course_id": self.course_id,
            "course_title": self.course_title,
            "price": self.price,
            "payment_status": self.payment_status,
            "enrolled_at": self.enrolled_at.isoformat()
        }
