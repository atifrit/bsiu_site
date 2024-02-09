from app.models import db, Shop, environment, SCHEMA
from sqlalchemy.sql import text


def seed_shops():

    shop1 = Shop(name='shop1', image='something', caption='hello', price=5, category='old', order='l', notes='world')
    shop2 = Shop(name='shop2', image='something2', caption='hello2', price=10, category='old2', order='z', notes='world2')
    shop3 = Shop(name='shop3', image='something3', caption='hello3', price=15, category='old3', order='lz', notes='world3')

    db.session.add(shop1)
    db.session.add(shop2)
    db.session.add(shop3)

    db.session.commit()



def undo_shops():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shops RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shops"))

    db.session.commit()
