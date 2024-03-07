import { useNavigate } from "react-router-dom";

export default function Remote() {
	var navigate = useNavigate();
	return <div className="bottomRightButtonContainer">
		<div className='icon-button' title={'뒤로가기'} onClick={()=>{navigate(-1);}}>
			<i className="fi fi-rr-caret-left"></i>
		</div>
		<div className="icon-button" title={'맨 위로'} onClick={()=>{window.scrollTo(0, 0)}}>
			<i className="fi fi-bs-arrow-small-up"></i>
		</div>
		<div className="icon-button" title={'맨 아래로'} onClick={
			()=>{window.scrollTo(0, document.body.scrollHeight);}
		}>
			<i className="fi fi-bs-arrow-small-down"></i>
		</div>
	</div>
}