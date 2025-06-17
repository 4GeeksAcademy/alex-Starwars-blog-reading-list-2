import React from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown.jsx"

export const Navbar = () => {
	return (
		<nav className="container-fluid navbar navbar-light bg-light mb-3">
			<img src="https://images.seeklogo.com/logo-png/13/1/star-wars-logo-png_seeklogo-131743.png" alt="logo" style={{ width: "100px" }} />
			<div className="ml-auto">
				<Dropdown />
			</div>	
		</nav>
	);
};
