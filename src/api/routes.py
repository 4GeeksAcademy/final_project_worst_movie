"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Register, Login
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
@api.route('/registration', methods=['GET','POST','PUT'])
def handle_registrations():
    register = Register.query.all()
    result = []
    for registration in registration:
     result.append(register.serialize())
    return jsonify(result), 200
@api.route('/login', methods=['GET','POST'])
def handle_login():
    register = Login.query.all()
    result = []
    for login in login:
     result.append(login.serialize())
    return jsonify(result), 200