import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

const Characters = () => {
    const [characters, setCharacters] = useState([]);
    const { actions, store } = useContext(Context);

    const getCharacterDetails = async (uid) => {
        const res = await fetch(`https://www.swapi.tech/api/people/${uid}`);
        const data = await res.json();
        return { uid, ...data.result.properties };
    };

    const handleFavorite = (e) => {
        actions.addFavorite(e.target.name);
    };

    useEffect(() => {
        const fetchCharactersData = async () => {
            try {
                const storedCharacters = localStorage.getItem('starWarsCharacters');
                if (storedCharacters) {
                    setCharacters(JSON.parse(storedCharacters));
                    return;
                }

                const res = await fetch("https://www.swapi.tech/api/people");
                const data = await res.json();
                const initialCharacters = data.results;

                if (!Array.isArray(initialCharacters) || initialCharacters.length === 0) {
                    setCharacters([]);
                    return;
                }

                const detailPromises = initialCharacters.map(char =>
                    getCharacterDetails(char.uid)
                );

                const allDetailedCharacters = await Promise.all(detailPromises);

                const finalCharacters = initialCharacters.map(initialChar => {
                    const detailedChar = allDetailedCharacters.find(dc => dc.uid === initialChar.uid);
                    return {
                        ...initialChar,
                        ...detailedChar
                    };
                });

                localStorage.setItem('starWarsCharacters', JSON.stringify(finalCharacters));
                setCharacters(finalCharacters);

            } catch (error) {
                console.error("Failed to fetch characters:", error);
                setCharacters([]);
            }
        };

        fetchCharactersData();
    }, []);

    return (
        <div className="container">
            <h1 className="my-4 text-center">Star Wars Characters</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {characters.length > 0 ? (
                    characters.map((character) => (
                        <div className="col" key={character.uid}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <img src="https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg" className="card-img-top" alt="..." />
                                    <h5 className="card-title">{character.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Details:</h6>
                                    <p className="card-text">
                                        <strong>Hair Color:</strong> {character.hair_color || 'N/A'}
                                    </p>
                                    <p className="card-text">
                                        <strong>Eye Color:</strong> {character.eye_color || 'N/A'}
                                    </p>
                                    <div>
                                        <Link onClick = {()=> actions.setCurrentCharacter(character.uid)} to={`/characters/${character.uid}`} className="btn btn-primary mt-3">
                                            View Details
                                        </Link>
                                        <button onClick={handleFavorite} name={character.name} className="btn btn-primary mt-3 mx-2">Add favorite</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>Loading characters...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Characters;