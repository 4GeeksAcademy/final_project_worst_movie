"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Login, Movies, Watchlist, Movie_Rating, Comments
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/registration', methods=['POST'])
def signUp():
    username = request.json.get("username", None)
    name = request.json.get("name", None)
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    existing_user_email=User.query.filter_by(email=email).first()
    existing_user_username=User.query.filter_by(username=username).first()
    if  existing_user_email is  not None or  existing_user_username  is not None:
       return jsonify({"msg": "Did you drop a glass of watter in a Gremlyn? We´ve got clones here,, dude...Try another email or username..or call Terminator"}), 401
    user=User(
       username=username,
       name=name,
       email=email,
       password=password,
       is_active=True
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "Allrrrright!! User added succesfully"}), 200

@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user=User.query.filter_by(email=email,password=password).first()
    if user is None:
     return jsonify({"msg": "Please check your email or password, something went wrong."}), 401
    access_token=create_access_token(identity=user.id)
    return jsonify({"token":access_token, "user_id":user.id})

@api.route('/resset', methods=['PUT'])
def resset():
    email = request.json.get("email", None)
    password = request.json.get("password", None) 
    existing_user_email=User.query.filter_by(email=email).first()
    if  existing_user_email is  None:
     return jsonify({"msg": "User don´t exist"}), 400
    existing_user_email.password=password
    
    db.session.commit()
    return jsonify({"msg": "Allrrrright!! User password resseted succesfully"}), 200
   
@api.route('/watchlist', methods=['POST'])
def addto_watchlist():
   if request.method == 'POST':
        print(request.get_json()['movie'])
        movie = Movies.query.filter_by(id=request.get_json()['movie_id']).first()
        if movie is None: 
           movie = Movies()
           movie.id=request.get_json()['movie_id']
           movie.title=request.get_json()['movie']['title']
           movie.rating=request.get_json()['movie']['rating']
           movie.image=request.get_json()['movie']['image']

           db.session.add(movie)
           db.session.commit()

        watchlist = Watchlist()
        watchlist.author_id = request.get_json()['author_id']
        watchlist.movie_id = request.get_json()['movie_id']


        db.session.add(watchlist)
        db.session.commit()

        # Show the updated version of the watchlist
        watchlist = []
        db_result = Watchlist.query.all()
        for item in db_result:
            watchlist.append(item.serialize())
        return jsonify(watchlist), 200
  