import { Link } from "react-router-dom"

export default function Nav() {
	return <div id="nav">
		<div className="fixedwidgetcontainer w3font">
			<Link to="/w3x/SkillArchive/Ability" className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/BTNSpellBookBLS.png"}
					alt={".png"}
				/>
				<p>스킬 정보</p>
			</Link>
			<Link to="/w3x/SkillArchive/Unit" className="widget">
				<img 
					src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btnfootman.png"}
					alt={".png"}
				/>
				<p>유닛 정보</p>
			</Link>
		</div>
	</div>
}