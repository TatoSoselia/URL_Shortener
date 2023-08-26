from server.db import db

class UrlModel(db.Model):
    __tablename__ = "urls"


    url = db.Column(db.String(), nullable=False)
    shorten_url = db.Column(db.String(), primary_key=True)
