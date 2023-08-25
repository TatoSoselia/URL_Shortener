from flask_smorest import Blueprint, abort
from flask.views import MethodView
from server.schemas import PlainUrlSchema
from sqlalchemy.exc import SQLAlchemyError
from server.models import UrlModel
from flask import render_template
import validators
import shortuuid
from server.db import db


blp = Blueprint('url', 'urls', description = "Operations on url")

@blp.route('/')
def post():
    return render_template('index.html')


@blp.route("/url")
class UrlList(MethodView):
    @blp.arguments(PlainUrlSchema)
    def post(self, url_data):
        new_url = url_data

        if not validators.url(new_url['url']):
            abort(400, message = "Invalid URL.")

        short_url = shortuuid.uuid()[:7]
        new_url["shorten_url"] = short_url
        url = UrlModel(**new_url)

        try:
            db.session.add(url)
            db.session.commit()
        except SQLAlchemyError:
            abort(500, message="An error occurred while inserting the item.")


        return {"short_url":short_url}, 201

