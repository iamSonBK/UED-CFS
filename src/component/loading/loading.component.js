import React from "react";
import "./loading.styles.css";
class Loading extends React.Component {
	render() {
		const { title } = this.props;
		return (
			<div className="loading">
				<div className="circle"></div>
			</div>
		);
	}
}
export default Loading;
