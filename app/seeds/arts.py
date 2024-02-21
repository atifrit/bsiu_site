from app.models import db, Art, environment, SCHEMA
from sqlalchemy.sql import text


def seed_arts():

    art1 = Art(name='art1', image='something', caption='hello', year=2020, category='old', order=0, notes='world')
    art2 = Art(name='art2', image='something2', caption='hello2', year=2020, category='old2', order=1024, notes='world2')
    art3 = Art(name='art3', image='something3', caption='hello3', year=2020, category='old3', order=2048, notes='world3')

    db.session.add(art1)
    db.session.add(art2)
    db.session.add(art3)

    db.session.commit()



def undo_arts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.arts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM arts"))

    db.session.commit()
