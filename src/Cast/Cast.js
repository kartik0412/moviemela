import React from "react";
import "./Cast.css";

export default class Cast extends React.Component {
    render() {
        return (
            <div className="cast-main">
                <div className="cast-pic">
                    <img
                        src={`https://image.tmdb.org/t/p/w138_and_h175_face${this.props.profilepic}`}
                        alt={this.props.name}
                    ></img>
                </div>
                <div>
                    <p className="character">{this.props.character}</p>
                    <p className="name">{this.props.name}</p>
                </div>
            </div>
        );
    }
}
