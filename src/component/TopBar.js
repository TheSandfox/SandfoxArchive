import { Link } from 'react-router-dom';

export default function TopBar() {
	return (
		<div className="top-bar">
			<Link to="/"><div className="title">모래여우저장소</div></Link>
		</div>
	);
}