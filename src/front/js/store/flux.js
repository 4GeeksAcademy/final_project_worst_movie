const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			horror_movies: [],
			drama_movies: [],
			action_movies: [],
			watchlist: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getHorrorMovies: () => {
				const store = getStore();
				fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.lte=5.1&sort_by=vote_average.asc&with_genres=27&vote_average.gte=2&vote_count.gte=800`).then(resp => resp.json())
					.then(data => {
						console.log(data)
						setStore({ horror_movies: data.results })
					})
					.catch(error => {
						console.log(error);
					});
			},
			getDramaMovies: () => {
				const store = getStore();
				fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.lte=5.2&sort_by=vote_average.asc&with_genres=10749&vote_average.gte=2&vote_count.gte=475`).then(resp => resp.json())
					.then(data => {
						console.log(data)
						setStore({ drama_movies: data.results })
					})
					.catch(error => {
						console.log(error);
					});
			},
			getActionMovies: () => {
				const store = getStore();
				fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEDB_API_KEY}&vote_average.lte=5.2&sort_by=vote_average.asc&with_genres=28%2C%2012&vote_average.gte=2&vote_count.gte=750`).then(resp => resp.json())
					.then(data => {
						console.log(data)
						setStore({ action_movies: data.results })
					})
					.catch(error => {
						console.log(error);
					});
			},
			
			addToWatchlist: (movie) => {
				let options={
					method:'POST',
					body: JSON.stringify({
						author_id: 1,
						movie_id: movie.id, 
						movie: { image: `https://image.tmdb.org/t/p/original${movie.img_src}`, ...movie}
					}),
					headers: {
						'Content-Type':'application/json'
					}
				}

				fetch(`${process.env.BACKEND_URL}api/watchlist`, options)
				.then(resp => resp.json())
					.then(data => {
						console.log(data)
					})
					.catch(error => {
						console.log(error);
					});

				const store = getStore();
				const item_watchlist = store.watchlist.concat(movie);
				setStore({ watchlist: item_watchlist });
			},
			deleteFromWatchlist: (index) => {
				const store = getStore();
				const item_watchlist = store.watchlist.filter((c, i) => {
					return index !== i
				});
				setStore({ watchlist: item_watchlist });
			},

			getWatchlistFromDB: (setWatchlist) => {
				fetch(`${process.env.BACKEND_URL}api/watchlist`)
				.then(resp => resp.json())
					.then(data => {
						setWatchlist(data)
					})
					.catch(error => {
						console.log(error);
					});
		   },
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			getMovieById: (movieId, setMovieDetail) => {
				const options = {
					method: 'GET',
					headers: {
						accept: 'application/json',
						Authorization: `Bearer ${process.env.MOVIEDB_TOKEN}`
					}
				};
				fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.MOVIEDB_API_KEY}`)
					.then(response => response.json())
					.then(response => {
						console.log(response);
						setMovieDetail(response)
					})
					.catch(err => console.error(err));
			},
			getTrailerForMovie: async (movieId, setVideoKey) => {
				try {
					const videoUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.MOVIEDB_API_KEY}`;
					const response = await fetch(videoUrl);
					const data = await response.json();
					if (data.results && data.results[0] && data.results[0].key) {
						setVideoKey(data.results[0].key);
					} else {
						console.error('No video key found in response');
					}
				} catch (error) {
					console.error(error);
				}
			},
			rateMovie: async (movie, rating) => {
                try {
					console.log(movie,rating)
                    const response = await fetch(`${process.env.BACKEND_URL}/api/rate_movie`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${getActions().getToken()}` 
                        },
                        body: JSON.stringify({  movie: { image: `https://image.tmdb.org/t/p/original${movie.img_src}`, ...movie}, rating })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data); // Log the response from the server (optional)
                        return data; // Return data if needed
                    } else {
                        console.log('Error rating movie:', response.status, response.statusText);
                        return null; // Return null or handle the error as needed
                    }
                } catch (error) {
                    console.log('Error rating movie:', error);
                    return null; // Return null or handle the error as needed
                }
            },
			getUserRating: (movieId,setUserRating) =>{
				console.log("hello", getActions().getToken(),movieId )
				const options = {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${getActions().getToken()}` 
				},
			};
			fetch(`${process.env.BACKEND_URL}/api/movie_rating/${movieId}`,options)
				.then(response => response.json())
				.then(response => {
					console.log(response);
					if (response && response.rating) setUserRating(response.rating)
				})
				.catch(err => console.log(err));
			},
			
			changeColor: (index, color) => {
				//get the store
				const store = getStore();
				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				//reset the global store
				setStore({ demo: demo });
			},
			signUp: (username, name, email, password) => {
				var options = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, name: name, email: email, password: password })
				}
				fetch(process.env.BACKEND_URL + '/api/registration', options)
				.then(response => {
					if (response.ok) return response.json()
					else throw Error('Something went wrong')
				})
				.then(data => {
					console.log(data)
				})
				.catch(error => {
					console.log(error)
				})
			},
			logIn: (email, password) => {
				var options = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password })
				}
				fetch(process.env.BACKEND_URL + '/api/login', options)
				.then(response => {
					if (response.ok) return response.json()
					else throw Error('Something went wrong')
				})
				.then(data => {
					if (data && data.token) localStorage.setItem("token", data.token)
					console.log(data)
				})
				.catch(error => {
					console.log(error)
				})
			},
			getToken: ()=>{
				return localStorage.getItem("token")
			},
			resset: (email, password) => {
				var options = {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email: email, password: password })
				}
				fetch(process.env.BACKEND_URL + 'api/resset', options)
				.then(response => {
					if (response.ok) return response.json()
					else throw Error('Something went wrong')
				})
				.then(data => {
					console.log(data)
				})
				.catch(error => {
					console.log(error)
				})
			}
		}
	}
}

export default getState;