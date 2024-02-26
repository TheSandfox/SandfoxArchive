export default function Remote() {
	return <div className="bottomRightButtonContainer">
		<div className="icon-button" onClick={()=>{window.scrollTo(0, 0)}}>
			<i className="fi fi-bs-arrow-small-up"></i>
		</div>
		<div className="icon-button" onClick={
			()=>{window.scrollTo(0, document.body.scrollHeight);}
		}>
			<i className="fi fi-bs-arrow-small-down"></i>
		</div>
	</div>
}