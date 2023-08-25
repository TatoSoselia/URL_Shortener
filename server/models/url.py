from server.db import db

class UrlModel(db.Model):
    __tablename__ = "urls"

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(), nullable=False)
    shorten_url = db.Column(db.String(), nullable=False)