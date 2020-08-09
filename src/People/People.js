import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import Movie from "../Movie/Movie";
import "./People.css";

const url1 = "https://api.themoviedb.org/3/person/";
const url2 = "?api_key=621354191214df0e224e791728b4fdad&language=en-US&append_to_response=external_ids";
const url3 = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
const url4 =
    "https://api.themoviedb.org/3/discover/movie?api_key=621354191214df0e224e791728b4fdad&language=en-US&sort_by=popularity.desc&include_adult=false&page=1&with_cast=";

export default class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            data: [],
            work: [],
        };
    }

    async componentDidMount() {
        try {
            const id = this.props.match.params.id;
            let data = await axios.get(url1 + id + url2);
            let work = await axios.get(url4 + id);
            console.log(work.data);
            this.setState({
                isloading: false,
                data: data.data,
                work: work.data,
            });
        } catch (err) { }
    }

    render() {
        const { isloading, data, work } = this.state;
        let movie = [];
        if (work && work.results) {
            for (let i = 0; i < Math.min(10, work.results.length); i++) {
                movie.push(
                    <Movie
                        key={i}
                        name={work.results[i].title}
                        poster_path={work.results[i].poster_path}
                        id={work.results[i].id}
                    />
                );
            }
        }

        return (
            <>
                {isloading ? (
                    <div className="loader"></div>
                ) : (
                        <>
                            <div className="people-outer">


                                <div className="people-main">
                                    <div className="people-img">
                                        <img
                                            alt={data.name}
                                            src={data && data.profile_path ? url3 + data.profile_path : ""}
                                        ></img>
                                    </div>
                                    <div className="people-info">
                                        <div className="people-name">
                                            {data.name}
                                            <div className="people-social">
                                                {data.external_ids && data.external_ids.facebook_id ? (
                                                    <a
                                                        style={{ color: "#0084FF" }}
                                                        target="blank"
                                                        href={`https://www.facebook.com/${data.external_ids.facebook_id}`}
                                                    >
                                                        <FontAwesomeIcon icon={faFacebook} />
                                                    </a>
                                                ) : (
                                                        ""
                                                    )}
                                                {data.external_ids && data.external_ids.instagram_id ? (
                                                    <a
                                                        style={{ color: " #E1306C" }}
                                                        target="blank"
                                                        href={`https://www.instagram.com/${data.external_ids.instagram_id}`}
                                                    >
                                                        <FontAwesomeIcon icon={faInstagram} />
                                                    </a>
                                                ) : (
                                                        ""
                                                    )}
                                                {data.external_ids && data.external_ids.twitter_id ? (
                                                    <a
                                                        style={{ color: " #00acee" }}
                                                        target="blank"
                                                        href={`https://www.twitter.com/${data.external_ids.twitter_id}`}
                                                    >
                                                        <FontAwesomeIcon icon={faTwitter} />
                                                    </a>
                                                ) : (
                                                        ""
                                                    )}
                                            </div>
                                        </div>
                                        <p className="people-head">
                                            <span>DOB : </span>
                                            {data.birthday}
                                        </p>
                                        <p className="people-head">
                                            <span>From : </span>
                                            {data.place_of_birth}
                                        </p>
                                        <p className="people-head">
                                            <span>Work : </span>
                                            {data.known_for_department}
                                        </p>
                                        <p className="people-head">
                                            <span>biography : </span>
                                            {data.biography}
                                        </p>
                                    </div>
                                </div>
                                <nav style={{ marginTop: "30px" }} className="people-movie">
                                    <div id="cast" className="link active-link">
                                        Other Work
                                    </div>
                                    <div className="display-movie">{movie}</div>
                                </nav>
                            </div>
                        </>
                    )}
            </>
        );
    }
}

