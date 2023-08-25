from marshmallow import Schema, fields


class PlainUrlSchema(Schema):
    id = fields.Int(dump_only=True)
    url = fields.Str(required=True)
    shorten_url = fields.Str(required=False)