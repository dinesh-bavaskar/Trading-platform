from flask import Blueprint, request, jsonify
from extensions import db
from models.blog import Blog
from flask_jwt_extended import jwt_required

blog_bp = Blueprint("blogs", __name__, url_prefix="/api/blogs")

@blog_bp.route("/", methods=["GET"])
def get_blogs():
    blogs = Blog.query.order_by(Blog.created_at.desc()).all()
    return jsonify([{
        "id": b.id,
        "title": b.title,
        "slug": b.slug,
        "content": b.content,
        "image": b.image
    } for b in blogs])


@blog_bp.route("/<string:slug>", methods=["GET"])
def get_blog(slug):
    blog = Blog.query.filter_by(slug=slug).first_or_404()
    return jsonify({
        "id": blog.id,
        "title": blog.title,
        "slug": blog.slug,
        "content": blog.content,
        "image": blog.image
    })


@blog_bp.route("/", methods=["POST"])
@jwt_required()
def create_blog():
    data = request.json
    blog = Blog(
        title=data["title"],
        slug=Blog.generate_slug(data["title"]),
        content=data["content"],
        image=data.get("image")
    )
    db.session.add(blog)
    db.session.commit()
    return jsonify({"message": "Blog created"}), 201


@blog_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_blog(id):
    blog = Blog.query.get_or_404(id)
    data = request.json

    blog.title = data.get("title", blog.title)
    blog.content = data.get("content", blog.content)
    blog.image = data.get("image", blog.image)

    db.session.commit()
    return jsonify({"message": "Blog updated"})


@blog_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_blog(id):
    blog = Blog.query.get_or_404(id)
    db.session.delete(blog)
    db.session.commit()
    return jsonify({"message": "Blog deleted"})
