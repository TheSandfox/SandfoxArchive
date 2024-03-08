import { useNavigate } from "react-router-dom";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa6";
import { CgArrowUp, CgArrowDown } from "react-icons/cg";

export default function Remote() {
	var navigate = useNavigate();
	return <div className="bottomRightButtonContainer">
		<div className='icon-button' title={'뒤로가기'} onClick={()=>{navigate(-1);}}>
			<FaCaretLeft/>
		</div>
		<div className='icon-button' title={'뒤로가기'} onClick={()=>{navigate(1);}}>
			<FaCaretRight/>
		</div>
		<div className="icon-button" title={'맨 위로'} onClick={()=>{window.scrollTo(0, 0)}}>
			<CgArrowUp/>
		</div>
		<div className="icon-button" title={'맨 아래로'} onClick={
			()=>{window.scrollTo(0, document.body.scrollHeight);}
		}>
			<CgArrowDown/>
		</div>
	</div>
}