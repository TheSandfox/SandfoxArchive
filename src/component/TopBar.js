import { Link } from 'react-router-dom';

export default function TopBar() {
	return (
		<div className="top-bar">
			<Link to="/"><div className="title">SandfoxArchive</div></Link>
			<Link to="/w3x/SkillArchive/Ability"><div className="title">Abilities</div></Link>
		</div>
	);
}