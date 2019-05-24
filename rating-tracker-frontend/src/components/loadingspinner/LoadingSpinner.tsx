import * as React from "react";
import './style.css';

interface ILoadingSpinnerProps {
	isVisible:boolean
}

// Spinner component
const LoadingSpinner:React.SFC<ILoadingSpinnerProps> = (props) => {
	if (props.isVisible===true) {
		return (
			<div className="spinner-container" data-testid='loading-spinner'>
				<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
			</div>
		);
	} else {
		return (null);
	}
};

export default LoadingSpinner;