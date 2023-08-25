from flask import Flask
from flask_smorest import Api
from server.resources.url import blp as UrlBlueprint
from server.db import db



def create_app(db_url=None):
    app = Flask(__name__, template_folder="../client", static_folder="../client")
    app.config["API_TITLE"] = "REST-URL-Shortener-API"
    app.config["API_VERSION"] = "v2"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/swagger-ui"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or "sqlite:///data.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["PROPAGATE_EXCEPTIONS"] = True
    db.init_app(app)



    api = Api(app)


    with app.app_context():
        db.create_all()

    api.register_blueprint(UrlBlueprint)


    return app