from models.admin import Admin
from extensions import db

def create_super_admin():
    super_admin_email = "admin@system.com"

    existing_admin = Admin.query.filter_by(email=super_admin_email).first()
    if existing_admin:
        return

    super_admin = Admin(
        name="Super Admin",
        email=super_admin_email,
        role="superadmin"
    )
    super_admin.set_password("Admin@123")  # change after first login

    db.session.add(super_admin)
    db.session.commit()

    print("✅ Super Admin created")
