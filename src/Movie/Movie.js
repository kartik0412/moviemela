import React from "react";
import { Link } from "react-router-dom";
import "./Movie.css";
const url = "https://image.tmdb.org/t/p/w185_and_h278_bestv2";
export default class Movie extends React.Component {
    render() {
        return (
            <div className="movie-main">
                <div className="movie-pic">
                    <img src={this.props.poster_path ? url + this.props.poster_path : ""} alt={this.props.name}></img>
                </div>
                <div>
                    <p className="name">
                        <Link to={`/display/movie/${this.props.id}`}>{this.props.name}</Link>
                    </p>
                </div>
            </div>
        );
    }
}
