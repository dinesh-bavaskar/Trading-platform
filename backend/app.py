from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt

from routes import auth_bp, product_bp, blog_bp, contact_bp
from routes.enrollment_routes import enrollment_routes
from utils.create_super_admin import create_super_admin


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(enrollment_routes)

    app.register_blueprint(product_bp)
    app.register_blueprint(blog_bp)
    app.register_blueprint(contact_bp)

    with app.app_context():
        db.create_all()
        create_super_admin()  
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)