from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class User(db.Model):
    __tablename__='user'
    __tablename__='user'
    id = db.Column(db.Integer, primary_key=True)
    username=db.Column(db.String(120), unique=True, nullable=False)
    name=db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "name": self.name,
            "email": self.email,
            " is_active ":self. is_active
            # do not serialize the password, its a security breach
        }
class Login(db.Model):
    __tablename__='login'
    __tablename__='login'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    def __repr__(self):
        return f'<User {self.email}>'
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            " is_active ":self. is_active
            # do not serialize the password, its a security breach
        }
    
class Movies(db.Model):
    __tablename__='movies'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), unique=True, nullable=False)
    genre = db.Column(db.String(120), nullable=True)
    rating = db.Column(db.String(120), nullable=False)
    year = db.Column(db.Integer, nullable=True)
    budget = db.Column(db.String(120), nullable=True)
    description = db.Column(db.String(120), nullable=True)
    tagline = db.Column(db.String(120), nullable=True)
    image = db.Column(db.String(500), nullable=False)

    def __repr__(self):
        return f'<Movies {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "genre": self.genre,
            "rating": self.rating,
            "year": self.year,
            "budget": self.budget,
            "description": self.description,
            "tagline": self.tagline,
            "image": self.image
        }

class Watchlist(db.Model):
    __tablename__='watchlist'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(120), nullable=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)

    def __repr__(self):
        return f'<Watchlist {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "title": self.title,
            "movie_id": self.movie_id
        }

class Movie_Rating(db.Model):
    __tablename__='movie_rating'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.id'), nullable=False)
    rating = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'<MovieRating {self.rating}>'

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "rating": self.rating
        }

class Comments(db.Model):
    __tablename__='comments'
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    like_total = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Comments {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "author_id": self.author_id,
            "content": self.content,
            "date": self.date,
            "like_total": self.like_total
        }

        