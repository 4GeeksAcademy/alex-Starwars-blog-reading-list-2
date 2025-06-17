import React from 'react';
import { useContext, useState } from "react";
import { Context } from '../store/appContext.js';
import { useNavigate } from 'react-router-dom'

const Dropdown = () => {
    const { actions, store } = useContext(Context);
    const characters = JSON.parse(localStorage.getItem('starWarsCharacters'))
    const planets = JSON.parse(localStorage.getItem('starWarsPlanets'))
    const navigate = useNavigate()


    const handleCLick = (e) => {
        e.preventDefault()
        const characterFound = characters.find((char) => e.target.name === char.name)

        const planetFound = planets.find((planet) => e.target.name === planet.name)

        if (characterFound) { 
            actions.setCurrentCharacter(characterFound.uid)
            navigate(`/people/${characterFound.uid}`) }
        if (planetFound) {
            actions.setCurrentPlanet(planetFound.uid)

            navigate(`/planets/${planetFound.uid}`)
        }

    }
    return (
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Favorites ({store.favorites.length})
            </button>
            <ul className="dropdown-menu">
                {store.favorites.length === 0 ? (
                    <li><span className="dropdown-item">No favorites yet!</span></li>
                ) : (
                    store.favorites.map((name) => (

                        <li key={name} className="d-flex justify-content-between align-items-center dropdown-item-container">
                            <a className="dropdown-item" href='#' name={name} onClick={handleCLick}>
                                {name}
                            </a>
                            <button
                                className='btn btn-danger btn-sm'
                                onClick={() => actions.removeFavorite(name)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Dropdown;