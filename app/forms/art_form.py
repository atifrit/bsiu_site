from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Art

class ArtForm(FlaskForm):
    name = StringField('name')
    image = StringField('image')
    caption = StringField('caption')
    year = IntegerField('year')
    category = StringField('category', validators=[DataRequired()])
    order = DecimalField('order', validators=[DataRequired()])
    notes = StringField('notes')
