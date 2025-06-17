import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../store/appContext.js'
const PlanetDetail = () => {
    const { store } = useContext(Context)
    const [currentPlan, setCurrentPlan] = useState('')
    const getPlanetDetails = async () => {
        const res = await fetch(`https://www.swapi.tech/api/planets/${store.currentPlanet}`);
        const data = await res.json();
        const currentPlanet = data;
        console.log(currentPlanet)
        setCurrentPlan(currentPlanet.result.description)
    }

    getPlanetDetails()
    return <div>
        <h1>
            Planet details
        </h1>
        <p> {currentPlan}</p>
    </div>
}

export default PlanetDetail