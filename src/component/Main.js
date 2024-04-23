import { Link } from "react-router-dom"

import { FaYoutube, FaGithub } from "react-icons/fa";

function W3xWidget({route,title,disabled,imgPath}) {
	let title2 = title.replaceAll('<br>','\n');
	return <Link to={route} className={disabled?'disabled':''}>
		<div className={"menu icon-button"+(disabled?' disabled':'')}>
			<img src={imgPath} alt=''/>
			<h3>{title2}</h3>
		</div>
	</Link>;
}

export default function Main() {
	return <div className="mainContainer">
		<h2>
			모래여우저장소	
		</h2>
		<img src={process.env.PUBLIC_URL+"/icons/icon_main_large.png"} alt={process.env.PUBLIC_URL+"/resource/replaceabletextures/commandbuttons/btncancel.png"}/>
		<div className="mainMenu">
			<p>
				<img className={'icon-text'} src={process.env.PUBLIC_URL+"/icons/icon_w3x.png"} alt='유즈맵 아이콘'/>
				유즈맵 페이지:
			</p>
			<div className="list">
				<W3xWidget route="/w3x/SkillArchive" title="K-스사막" imgPath={process.env.PUBLIC_URL+"/icons/BTNicon_skill_archive.png"} disabled={false}/>
				<W3xWidget route="" title="피전트의 城교육<br>(준비중)" imgPath={process.env.PUBLIC_URL+"/icons/BTNicon_castle_education.png"} disabled={true}/>
			</div>
		</div>
		<div className="bottomRightButtonContainer">
			<Link to="https://www.youtube.com/@THESANDFOX49" target="_blank">
				<div className="icon-button youtube">
					<FaYoutube />
				</div>
			</Link>
			<Link to="https://github.com/TheSandfox" target="_blank">
				<div className="icon-button github">
					<FaGithub />
				</div>
			</Link>
		</div>
	</div>
}