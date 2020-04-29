import React from "react";
import axios from "axios";
import Card from "./Card/Card";
import { NavLink } from "react-router-dom";
import "./Card/Card.css";

const url = "https://api.themoviedb.org/3/trending/movie/day?api_key=621354191214df0e224e791728b4fdad&page=";

export default class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            movielist: [],
            type: "movie",
            page: 1,
        };
        this.nextpage = this.nextpage.bind(this);
        this.prevpage = this.prevpage.bind(this);
    }

    async getpage() {
        try {
            fetch(url + this.state.page)
                .then((res) => res.json())
                .then((movielist) => {
                    this.setState({
                        isloading: false,
                        movielist: movielist,
                    });
                });
        } catch (err) {}
    }

    nextpage() {
        this.setState(
            {
                page: this.state.page + 1,
                isloading: true,
            },
            () => {
                this.getpage();
            }
        );
    }
    prevpage() {
        this.setState(
            {
                page: this.state.page - 1,
                isloading: true,
            },
            () => {
                this.getpage();
            }
        );
    }

    async componentDidMount() {
        try {
            fetch(url + this.state.page)
                .then((res) => res.json())
                .then((movielist) => {
                    this.setState({
                        isloading: false,
                        movielist: movielist,
                    });
                });
        } catch (err) {}
    }

    render() {
        return (
            <div>
                <nav className="App-nav">
                    <NavLink className="link" activeClassName="active-link" to="/movies">
                        Movies
                    </NavLink>
                    <NavLink className="link" activeClassName="active-link" to="/tv">
                        Tv Series
                    </NavLink>
                </nav>
                {this.state.isloading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        <h1 className="heading">Trending Movies</h1>
                        <div className="main">
                            {this.state.movielist.results.map((j, i) => (
                                <Card
                                    key={i}
                                    type={"movie"}
                                    title={j.title}
                                    overview={j.overview ? j.overview.substr(0, 120) + ".." : ""}
                                    year={j.release_date ? j.release_date.substr(0, 4) : ""}
                                    imageurl={j.poster_path}
                                    id={j.id}
                                />
                            ))}
                        </div>
                        <div className="page">
                            {this.state.page - 1 >= 1 && (
                                <button onClick={this.prevpage} className="prev">
                                    PREV
                                </button>
                            )}
                            {this.state.page + 1 <= this.state.movielist.total_pages && (
                                <button onClick={this.nextpage} className="next">
                                    NEXT
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        );
    }
}
