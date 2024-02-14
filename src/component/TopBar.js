import { Link } from 'react-router-dom';

export default function TopBar() {
	return (
		<div className="top-bar">
			<Link to="/"><h1 className="title">SandfoxArchive.info</h1></Link>
		</div>
	);
}