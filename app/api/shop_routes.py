from flask import Blueprint, jsonify, session, request
from app.models import Shop, db
from flask_login import current_user, login_user, logout_user, login_required


shop_routes = Blueprint('shop', __name__)

@art_routes.route('/', methods=['GET'])
def get_all_shop():
    shops = Shop.query.all()

    if shops:
        shop_list = [
            {
                'id': shop.id,
                'name': shop.name,
                'image': shop.image,
                'caption': shop.caption,
                'price': shop.price,
                'category': shop.category,
                'order': shop.order,
                'notes': shop.notes,
                'last_edited': shop.last_edited,
                'created_at': shop.created_at
            } for shop in shops
        ]

        return jsonify(shop_list)

    else:
        return jsonify([])
