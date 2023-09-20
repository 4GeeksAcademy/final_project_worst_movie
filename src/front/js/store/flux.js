const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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
			getMovieById: (movieId, setMovieDetail) =>{
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
					console.log (response);
					 setMovieDetail(response)})
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
		}
		

 
		}
	};
};

export default getState;
