import React from "react";
import { Link } from "react-router-dom";
import "./Cast.css";
const url = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
export default class Cast extends React.Component {
    render() {
        return (
            <div className="cast-main">
                <div className="cast-pic">
                    <img src={this.props.profilepic ? url + this.props.profilepic : ""} alt={this.props.name}></img>
                </div>
                <div>
                    <p className="character">{this.props.character}</p>
                    <p className="name">
                        <Link to={`/person/${this.props.id}`}>{this.props.name}</Link>
                    </p>
                </div>
            </div>
        );
    }
}
