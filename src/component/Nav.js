import { Link } from "react-router-dom"

export default function Nav() {
	return <div id="nav">
		<div className="fixedwidgetcontainer">
			<Link to="/w3x/SkillArchive/Ability" className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					alt={".png"}
				/>
				<p>스킬 정보</p>
			</Link>
			<Link className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					alt={".png"}
				/>
				<p>굉장히길다랗고길디길디길디긴아아아앙아아아앙</p>
			</Link>
			<Link className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					alt={".png"}
				/>
				<p>굉장히길다랗고길디길디길디긴아아아앙아아아앙</p>
			</Link>
			<Link className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					alt={".png"}
				/>
				<p>굉장히길다랗고길디길디길디긴아아아앙아아아앙</p>
			</Link>
			<Link className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					alt={".png"}
				/>
				<p>굉장히길다랗고길디길디길디긴아아아앙아아아앙</p>
			</Link>
			<Link className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}
					alt={".png"}
				/>
				<p>굉장히길다랗고길디길디길디긴아아아앙아아아앙</p>
			</Link>
		</div>
	</div>
}