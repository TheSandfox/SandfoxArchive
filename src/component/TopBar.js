import { Link } from 'react-router-dom';

export default function TopBar() {
	return (
		<div className="top-bar">
			<Link to="/"><div className="title">SandfoxArchive.info</div></Link>
		</div>
	);
}