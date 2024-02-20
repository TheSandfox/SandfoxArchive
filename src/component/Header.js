import { Link } from 'react-router-dom';

import 'css/header.css';

export default function Header() {
	return (
		<header>
			<Link to="/"><h1 className="title">SandfoxArchive.info</h1></Link>
		</header>
	);
}