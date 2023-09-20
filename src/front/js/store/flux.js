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
					console.log(data)
				})
				.catch(error => {
					console.log(error)
				})
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