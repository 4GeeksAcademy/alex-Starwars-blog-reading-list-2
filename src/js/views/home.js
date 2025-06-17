import React from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Characters from './Characters.jsx'
import Planets from './Planets.jsx'


export const Home = () => (
	<div className="text-center mt-5">
		<Characters />
		<Planets />
	</div>
);
