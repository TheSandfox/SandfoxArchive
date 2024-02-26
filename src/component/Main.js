import { Link } from "react-router-dom"

function W3xWidget({route}) {
	return <Link to={route}>
		<div className="menu icon-button">
						
		</div>
	</Link>
}

export default function Main() {
	return <div className="mainContainer">
		<h2>
			모래여우저장소	
		</h2>
		<img src={process.env.PUBLIC_URL+"/sandfoxmainv2.png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
		<div className="mainMenu">
			<div className="list">
				<W3xWidget route="/w3x/SkillArchive"/>
			</div>
		</div>
		<div className="bottomRightButtonContainer">
			<Link to="https://www.youtube.com/@THESANDFOX49" target="_blank">
				<div className="icon-button">
					<i className="fi fi-brands-youtube"></i>
				</div>
			</Link>
			<Link to="https://github.com/TheSandfox" target="_blank">
				<div className="icon-button github">
					<i className="fi fi-brands-github"></i>
				</div>
			</Link>
		</div>
	</div>
}