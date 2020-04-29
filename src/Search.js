import React from "react";
import Card from "./Card/Card";
import "./Card/Card.css";

class Search extends React.Component {
    render() {
        return (
            <div>
                {this.props.isloading && <div className="loader"></div>}
                {!this.props.isloading && (
                    <div>
                        <h1 className="heading">Match Found</h1>
                        <div className="main">
                            {this.props.movielist.results.map((j, i) => (
                                <Card
                                    key={i}
                                    type={this.props.type}
                                    title={j.title}
                                    overview={j.overview ? j.overview.substr(0, 120) + ".." : ""}
                                    year={j.release_date ? j.release_date.substr(0, 4) : ""}
                                    imageurl={j.poster_path}
                                    id={j.id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Search;
