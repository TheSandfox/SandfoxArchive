import { Link } from "react-router-dom"

export default function Main() {
	return <div className="main-container">
		<img src={process.env.PUBLIC_URL+"/sandfoxmainv2.png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
		<div className="main-links">
			<Link to="https://www.youtube.com/@THESANDFOX49" target="_blank">
				<div className="icon-button">
					<i className="youtube fa-brands fa-youtube"></i>
				</div>
			</Link>
			<Link to="https://github.com/TheSandfox" target="_blank">
				<div className="icon-button github">
					<i className="github fa-brands fa-github"></i>
				</div>
			</Link>
		</div>
	</div>
}