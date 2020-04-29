import React from "react";
import axios from "axios";
import Card from "./Card/Card";
import { NavLink } from "react-router-dom";
import "./Card/Card.css";

const url = "https://api.themoviedb.org/3/trending/tv/day?api_key=621354191214df0e224e791728b4fdad&page=";

export default class TvList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            tvlist: [],
            page: 1,
        };
        this.nextpage = this.nextpage.bind(this);
        this.prevpage = this.prevpage.bind(this);
    }

    async getpage() {
        try {
            let tvlist = await axios.get(url + this.state.page);
            this.setState({
                isloading: false,
                tvlist: tvlist.data,
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
            this.getpage();
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
                        <h1 className="heading">Trending TV Series</h1>
                        <div className="main">
                            {this.state.tvlist.results.map((j, i) => (
                                <Card
                                    key={i}
                                    title={j.name}
                                    type={"tv"}
                                    overview={j.overview.substr(0, 120) + ".."}
                                    year={j.first_air_date.substr(0, 4)}
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
                            {this.state.page + 1 <= this.state.tvlist.total_pages && (
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
