import { Link } from "react-router-dom"

import 'css/nav.css';

export default function Nav({form}) {
	let k = 0;
	return <nav className="w3font">
		<ul className="container">
			{form.map(item=>{
				return <li key={k++}>
					<Link to={item.route} className="widget">
						<img 
							src={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/"+item.img}
							alt={".png"}
						/>
						<p>{item.title}</p>
					</Link>
				</li>		
			})}
		</ul>
	</nav>
}