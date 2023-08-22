import { Link } from 'react-router-dom';

export default function TopBar() {
	return (
		<div className="top-bar">
			<Link to="/"><div className="title">모래여우저장소</div></Link>
			<Link to="/w3x/SkillArchive/Ability"><div className="title">TooltipMissing</div></Link>
		</div>
	);
}