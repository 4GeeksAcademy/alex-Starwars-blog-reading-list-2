const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
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
            ],
            favorites: [],
            currentPlanet: '',
            currentCharacter: ''
        },
        actions: {
            loadSomeData: () => {
                const storedFavorites = localStorage.getItem('starWarsFavorites');
                if (storedFavorites) {
                    setStore({ favorites: JSON.parse(storedFavorites) });
                    console.log("Favorites loaded from localStorage.");
                } else {
                    console.log("No favorites found in localStorage to load.");
                }
                /**
                 * You can keep other data fetching here as well:
                 * fetch("your_other_api_endpoint").then().then(data => setStore({ "foo": data.bar }));
                 */
            },

            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },

            addFavorite: (name) => {
                const store = getStore();
                let updatedFavorites;

                if (store.favorites.includes(name)) {
                    return
                } else {
                    updatedFavorites = [...store.favorites, name];
                    console.log(`Added "${name}" to favorites.`);
                }

                setStore({ favorites: updatedFavorites });

                localStorage.setItem('starWarsFavorites', JSON.stringify(updatedFavorites));
            },
            removeFavorite: (name) => {
                const store = getStore();
                let updatedFavorites;

                updatedFavorites = store.favorites.filter(fav => fav !== name);
                console.log(`Removed "${name}" from favorites.`);
                setStore({ favorites: updatedFavorites });

                localStorage.setItem('starWarsFavorites', JSON.stringify(updatedFavorites));
            },
            setCurrentCharacter: (uid) => {
                setStore({currentCharacter : uid})
            },
              setCurrentPlanet: (uid) => {
                setStore({currentPlanet : uid})
            }
        }
    };
};

export default getState;