import React from 'react'
import { useState, useContext } from 'react'
import { Context } from '../store/appContext.js'
const CharacterDetail = () => {
    const { store } = useContext(Context)
    const [currentChar, setCurrentChar] = useState('')
    const getCharacterDetails = async () => {
        const res = await fetch(`https://www.swapi.tech/api/people/${store.currentCharacter}`);
        const data = await res.json();
        const currentCharacter = data;
        setCurrentChar(currentCharacter.result.description)
    }

    getCharacterDetails()
    return <div>
        <h1>
            Character details
        </h1>
        <p>{currentChar}</p>
    </div>
}

export default CharacterDetail