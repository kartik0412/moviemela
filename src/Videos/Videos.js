import React from "react";
import Iframe from "react-iframe";
import "./Videos.css";

export default class Videos extends React.Component {
    render() {
        return (
            <div className="videos-main">
                <Iframe
                    url={`https://www.youtube.com/embed/${this.props.id}`}
                    width="100%"
                    height="100%"
                    id={this.props.id}
                    display="initial"
                    position="relative"
                    allowFullScreen
                    allow="fullscreen"
                    frameBorder="0"
                />
            </div>
        );
    }
}
