from flask import Blueprint, jsonify, session, request
from app.models import Art, db
from flask_login import current_user, login_user, logout_user, login_required


art_routes = Blueprint('art', __name__)

@art_routes.route('/', methods=['GET'])
def get_all_art():
    arts = Art.query.all()

    if arts:
        art_list = [
            {
                'id': art.id,
                'name': art.name,
                'image': art.image,
                'caption': art.caption,
                'year': art.year,
                'category': art.category,
                'order': art.order,
                'notes': art.notes,
                'last_edited': art.last_edited,
                'created_at': art.created_at
            } for art in arts
        ]

        return jsonify(art_list)

    else:
        return jsonify([])

@art_routes.route('/', methods=['POST'])
def post_art():
