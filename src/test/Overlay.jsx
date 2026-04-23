import { Fragment } from "react";
import "./Overlay.css";

export function Overlay(props) {
	return props.trigger ? (
		<Fragment>
			<div className="popup">
				<div className="popup-inner">
					<button className="close-btn" onClick={() => props.setTrigger(false)}>
						Close{" "}
					</button>

					{props.children}
				</div>
			</div>
		</Fragment>
	) : (
		""
	);
	r;
}

export default Overlay;
