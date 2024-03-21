import { Link, useLocation } from 'react-router-dom';

import 'css/header.css';

function HeaderRouter({pathName}) {
	let stringArr = pathName.replace('/','').split('/');
	let jsxs = [];
	let str = '';
	stringArr.forEach((route,index) => {
		if (route===''){return false;}
		str+=`/${route}`;
		if(index>=stringArr.length-1){
			jsxs.push(<div className='route last' key={route}>{route}</div>);
		} else {
			jsxs.push(<Link className='route' to={str} key={route}>{route}</Link>);
		}
	});
	return <div className='routes'>
		{jsxs}
	</div>
}

export default function Header() {
	let loc = useLocation();
	return (
		<header>
			<div className={'titleAndRoutes'}>
			<Link to="/"><h1 className="title">SandfoxArchive.info</h1></Link>
			<HeaderRouter pathName={loc.pathname}/>
			</div>
		</header>
	);
}