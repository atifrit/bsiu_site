from flask import Blueprint, jsonify, session, request
from app.models import Art, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import ArtForm

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

art_routes = Blueprint('art', __name__)

@art_routes.route('/', methods=['GET'])
def get_all_art():
    arts = Art.query.order_by(Art.order).all()
    print('arts:', arts)

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
@login_required
def post_art():
    artForm=ArtForm()
    artForm['csrf_token'].data = request.cookies['csrf_token']

    if artForm.validate_on_submit():
        artCount = Art.query.all().count()

        orderNum = (artCount + 1)*1024

        new_art = Art(name=artForm.data['name'], image=artForm.data['image'], caption=artForm.data['caption'], year=artForm.data['year'], category=artForm.data['category'], order=orderNum, notes=artForm.data['notes'])
        db.session.add(new_art)
        db.session.commit()
        return ({'message': 'Art Added Successfully'})

    return {'errors': validation_errors_to_error_messages(artForm.errors)}, 401

@art_routes.route('/<int:art_id>', methods=['DELETE'])
@login_required
def delete_art(art_id):

    art = Art.query.get(art_id)

    if not art:
        return jsonify({'error': 'Art not found'}), 404

    db.session.delete(art)
    db.session.commit()
    return jsonify({'message': 'successfully deleted'})
