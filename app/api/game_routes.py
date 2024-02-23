from flask import Blueprint, jsonify, session, request
from app.models import Game, db
from flask_login import current_user, login_user, logout_user, login_required


game_routes = Blueprint('game', __name__)

@game_routes.route('/', methods=['GET'])
def get_all_games():
    games = Game.query.all()

    if games:
        game_list = [
            {
                'id': game.id,
                'name': game.name,
                'image': game.image,
                'category': game.category,
                'order': game.order,
                'notes': game.notes,
                'last_edited': game.last_edited,
                'created_at': game.created_at
            } for game in games
        ]

        return jsonify(game_list)

    else:
        return jsonify([])
