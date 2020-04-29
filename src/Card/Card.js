import React from "react";
import "./Card.css";
export default class Card extends React.Component {
    render() {
        return (
            <div className="card">
                <img
                    className="card-image"
                    src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${this.props.imageurl}`}
                    alt={this.props.title}
                ></img>
                <div className="card-info">
                    <div className="card-sum">
                        <h4>{this.props.title}</h4>
                        <p className="date">{this.props.year}</p>
                        <p className="overview">{this.props.overview}</p>
                    </div>
                    <div className="card-button">
                        <a href={`/display/${this.props.type}/${this.props.id}`}>Know More</a>
                    </div>
                </div>
            </div>
        );
    }
}
