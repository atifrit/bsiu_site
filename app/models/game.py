from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Game(db.Model):
    __tablename__ = 'games'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    order = db.Column(db.Float)
    notes = db.Column(db.String)
    last_edited = db.Column(db.Date, default=datetime.now())
    created_at = db.Column(db.Date, default=datetime.now())
