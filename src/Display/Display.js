import React from "react";
import axios from "axios";
import Cast from "../Cast/Cast";
import Videos from "../Videos";
import "./Display.css";

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: "",
            isloading: true,
            display: "cast",
            displaylist: "",
        };
        this.handleClick = this.handleClick.bind(this);
    }
    async componentDidMount() {
        try {
            let id = this.props.match.params.id;
            let type = this.props.match.params.type;
            let movie = await axios.get(
                `https://api.themoviedb.org/3/${type}/${id}?api_key=621354191214df0e224e791728b4fdad&language=en-US&append_to_response=videos,credits`
            );
            this.setState({
                isloading: false,
                movie: movie.data,
            });
        } catch (err) {}
    }

    handleClick(e) {
        console.log(e.target.id);
        if (this.state.display === "cast" && e.target.id === "videos") {
            document.getElementById("videos").className = "link active-link";
            document.getElementById("cast").className = "link";
            this.setState({ display: "videos" });
        } else if (this.state.display === "videos" && e.target.id === "cast") {
            document.getElementById("cast").className = "link active-link";
            document.getElementById("videos").className = "link";
            this.setState({ display: "cast" });
        }
    }

    render() {
        let { movie } = this.state;
        const h = Math.floor(movie.runtime / 60);
        const m = movie.runtime % 60;
        let cast = [];
        let videos = [];
        if (movie.credits) {
            for (let i = 0; i < Math.min(10, movie.credits.cast.length); i++) {
                cast.push(
                    <Cast
                        key={i}
                        character={movie.credits.cast[i].character}
                        name={movie.credits.cast[i].name}
                        profilepic={movie.credits.cast[i].profile_path}
                    />
                );
            }
        }
        if (movie.videos) {
            for (let i = 0; i < movie.videos.results.length; i++) {
                videos.push(<Videos key={i} id={movie.videos.results[i].key} name={movie.videos.results[i].name} />);
            }
        }

        return (
            <>
                {this.state.isloading ? (
                    <div className="loader"></div>
                ) : (
                    <div className="outer">
                        <div
                            style={{
                                backgroundImage: `radial-gradient(circle at 20% 50%,rgba(11.76%, 15.29%, 17.25%, 0.8) 0%,rgba(19.61%, 21.96%, 23.53%, 0.7) 100%),url(https://image.tmdb.org/t/p/w1000_and_h563_face${movie.backdrop_path})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                            className="mainbox"
                        >
                            <div className="big-image">
                                <img
                                    alt={`${this.props.title}`}
                                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                                ></img>
                            </div>
                            <div className="big-info">
                                <h1>{movie.title}</h1>
                                <p className="big-date">{movie.release_date ? movie.release_date.substr(0, 4) : ""} </p>
                                {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}
                                <p className="big-overview-title">Overview</p>
                                <p className="big-overview">{movie.overview}</p>
                                <p style={{ fontStyle: "italic" }} className="big-date">
                                    {h > 0 ? `${h}h` : ""}
                                    {m > 0 ? ` ${m}m |` : ""}
                                    {movie.genres && movie.genres.map((i, j) => ` ${j !== 0 ? "|" : ""} ${i.name} `)}
                                </p>
                            </div>
                            <nav style={{ marginTop: "30px" }} className="App-nav">
                                <div id="cast" onClick={this.handleClick} className="link active-link">
                                    Cast
                                </div>
                                <div id="videos" onClick={this.handleClick} className="link">
                                    Videos
                                </div>
                            </nav>
                            <div className="display">{this.state.display === "cast" ? cast : videos}</div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
