from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text


def seed_games():

    game1 = Game(name='game1', image='something', category='old', order=0, notes='world')
    game2 = Game(name='game2', image='something2', category='old2', order=1024, notes='world2')
    game3 = Game(name='game3', image='something3', category='old3', order=2048, notes='world3')

    db.session.add(game1)
    db.session.add(game2)
    db.session.add(game3)

    db.session.commit()



def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
