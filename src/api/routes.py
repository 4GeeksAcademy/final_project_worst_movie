"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Login, Movies, Watchlist, Movie_Rating, Comments
from api.utils import generate_sitemap, APIException
from flask_cors import cross_origin, CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)


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

    existing_user_email = User.query.filter_by(email=email).first()
    existing_user_username = User.query.filter_by(username=username).first()
    if existing_user_email is not None or existing_user_username is not None:
        return jsonify({"msg": "Did you drop a glass of watter in a Gremlyn? We´ve got clones here,, dude...Try another email or username..or call Terminator"}), 401
    user = User(
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
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Please check your email or password, something went wrong."}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id})


@api.route('/resset', methods=['PUT'])
def resset():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    existing_user_email = User.query.filter_by(email=email).first()
    if existing_user_email is None:
        return jsonify({"msg": "User don´t exist"}), 400
    existing_user_email.password = password

    db.session.commit()
    return jsonify({"msg": "Allrrrright!! User password resseted succesfully"}), 200


@api.route('/rate_movie', methods=['POST'])
@jwt_required()
@cross_origin(supports_credentials=True)
def rate_movie():
    data = request.json

    user_id = get_jwt_identity()
    movie = data.get('movie')
    rating = data.get('rating')

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    movie_info = Movies.query.get(movie["id"])
    if not movie_info:
        new_movie = Movies(
            id=movie["id"],
            title=movie["title"],
            rating=movie["vote_average"],
            image=movie["image"],
        )
        db.session.add(new_movie)
        db.session.commit()

    try:
        # Create a new movie rating
        new_rating = Movie_Rating(
            user_id=user_id, movie_id=movie["id"], rating=rating)

        db.session.add(new_rating)
        db.session.commit()

        movies_avg = Movie_Rating(movie_id=movie["id"])

        return jsonify({'message': 'Rating submitted successfully'}), 201

    except Exception as e:
        print(e)
        return jsonify({'message': f'Error submitting rating: {str(e)}'}), 500


@api.route('/movie_rating/<int:movie_id>', methods=['GET'])
@jwt_required()
@cross_origin(supports_credentials=True)
def movie_rating(movie_id):
    user_id = get_jwt_identity()
    print(user_id, movie_id)
    movie_rating = Movie_Rating.query.filter_by(
        user_id=user_id, movie_id=movie_id).first()
    return jsonify(movie_rating.serialize()), 200


@api.route('/watchlist', methods=['POST'])
def addto_watchlist():
    if request.method == 'POST':
        print(request.get_json()['movie'])
        movie = Movies.query.filter_by(
            id=request.get_json()['movie_id']).first()
        if movie is None:
            movie = Movies()
            movie.id = request.get_json()['movie_id']
            movie.title = request.get_json()['movie']['title']
            movie.rating = request.get_json()['movie']['rating']
            movie.image = request.get_json()['movie']['image']

            db.session.add(movie)
            db.session.commit()

        # watchlist = Watchlist.query.filter_by(
            # id=Watchlist.movie_id, author_id=get_jwt_identity()).first()
        # if watchlist is None:
            watchlist = Watchlist()
            watchlist.author_id = get_jwt_identity()
            watchlist.movie_id = request.get_json()['movie_id']

            db.session.add(watchlist)
            db.session.commit()
            # Show the updated version of the watchlist
            watchlist = []
            db_result = Watchlist.query.all()
            for item in db_result:
                watchlist.append(item.serialize())
            return jsonify(watchlist), 200


@api.route('/watchlist', methods=['GET'])
def getfrom_watchlist():
    if request.method == 'GET':
        watchlist = Watchlist.query.filter_by(author_id=get_jwt_identity()).all()
        movies = []
        print(watchlist)

        for item in watchlist:
            movies.append(item.movie_id)

        movie = Movies.query.filter(Movies.id.in_((movies))).all()
        movie_array = []

        for m in movie:
            movie_array.append(m.serialize())
        print(movie_array)
        return jsonify(movie_array), 200

    return "Invalid Method", 404


@api.route('/watchlist/<int:movie_id>', methods=['DELETE'])
def deletefrom_watchlist(movie_id):
    if request.method == 'DELETE':
        watchlist = Watchlist.query.filter_by(movie_id=movie_id, author_id=get_jwt_identity()).first()

        db.session.delete(watchlist)
        db.session.commit()

        # Show the updated version
        watchlist_items = []
        db_result = Watchlist.query.filter_by(author_id=get_jwt_identity())
        for item in db_result:
            watchlist_items.append(item.serialize())
        return jsonify(watchlist_items), 200
    
    return "Invalid Method", 404
