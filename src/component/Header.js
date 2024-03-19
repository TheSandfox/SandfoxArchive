import { Link, useLocation } from 'react-router-dom';

import 'css/header.css';

function HeaderRouter({pathName}) {
	let stringArr = pathName.replace('/','').split('/');
	console.log(stringArr);
	return <>
	</>
}

export default function Header() {
	let loc = useLocation();
	return (
		<header>
			<Link to="/"><h1 className="title">SandfoxArchive.info</h1></Link>
			<HeaderRouter pathName={loc.pathname}/>
		</header>
	);
}