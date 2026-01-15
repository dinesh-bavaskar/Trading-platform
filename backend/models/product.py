from extensions import db
from datetime import datetime

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, default=0)
    image = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
