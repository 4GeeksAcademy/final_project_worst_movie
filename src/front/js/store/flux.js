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
					setStore({horror_movies: data.results})
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
					setStore({drama_movies: data.results})
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
					setStore({action_movies: data.results})
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
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
