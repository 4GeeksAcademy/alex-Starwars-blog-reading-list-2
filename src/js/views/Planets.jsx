import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

const Planets = () => {
    const [planets, setPlanets] = useState([]);
    const { actions, store } = useContext(Context);

    const getPlanetDetails = async (uid) => {
        const res = await fetch(`https://www.swapi.tech/api/planets/${uid}`);
        const data = await res.json();
        return { uid, ...data.result.properties };
    };

    const handleFavorite = (e) => {
        actions.addFavorite(e.target.name);
    };

    useEffect(() => {
        const fetchPlanetsData = async () => {
            try {
                const storedPlanets = localStorage.getItem('starWarsPlanets');
                if (storedPlanets) {
                    setPlanets(JSON.parse(storedPlanets));
                    return;
                }

                const res = await fetch("https://www.swapi.tech/api/planets");
                const data = await res.json();
                const initialPlanets = data.results;

                if (!Array.isArray(initialPlanets) || initialPlanets.length === 0) {
                    setPlanets([]);
                    return;
                }

                const detailPromises = initialPlanets.map(planet =>
                    getPlanetDetails(planet.uid)
                );

                const allDetailedPlanets = await Promise.all(detailPromises);

                const finalPlanets = initialPlanets.map(initialPlanet => {
                    const detailedPlanet = allDetailedPlanets.find(dp => dp.uid === initialPlanet.uid);
                    return {
                        ...initialPlanet,
                        ...detailedPlanet
                    };
                });

                localStorage.setItem('starWarsPlanets', JSON.stringify(finalPlanets));
                setPlanets(finalPlanets);

            } catch (error) {
                console.error("Failed to fetch planets:", error);
                setPlanets([]);
            }
        };

        fetchPlanetsData();
    }, []);

    return (
        <div className="container">
            <h1 className="my-4 text-center">Star Wars Planets</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {planets.length > 0 ? (
                    planets.map((planet) => (
                        <div className="col" key={planet.uid}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <img src="https://t4.ftcdn.net/jpg/05/17/53/57/360_F_517535712_q7f9QC9X6TQxWi6xYZZbMmw5cnLMr279.jpg" className="card-img-top" alt="..." />
                                    <h5 className="card-title">{planet.name}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Details:</h6>
                                    <p className="card-text">
                                        <strong>Gravity:</strong> {planet.gravity || 'N/A'}
                                    </p>
                                    <p className="card-text">
                                        <strong>Population:</strong> {planet.population || 'N/A'}
                                    </p>
                                    <div>
                                        <Link onClick = {()=> actions.setCurrentPlanet(planet.uid)} to={`/planets/${planet.uid}`} className="btn btn-primary mt-3">
                                            View Details
                                        </Link>
                                        <button onClick={handleFavorite} name={planet.name} className="btn btn-primary mt-3 mx-2">Add favorite</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center">
                        <p>Loading planets...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Planets;