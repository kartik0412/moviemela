import React from "react";
import axios from "axios";
import CardList from "./CardList/CardList";
import Navbar from "./Navbar/Navbar";
import Search from "./Search";
import "./App.css";

const url1 = "https://api.themoviedb.org/3/search/";
const url2 = "/?api_key=621354191214df0e224e791728b4fdad&query=";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            isloading: true,
            type: "movie",
            movielist: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }
    handleChangeSelect(val) {
        this.setState(
            {
                type: val,
            },
            () => {
                if (this.state.name) this.handleChange(this.state.name);
            }
        );
    }

    async handleChange(val) {
        this.setState({
            isloading: false,
            name: val,
        });
        // try {
        //     const name = this.state.name;
        //     if (name === "") return;
        //     fetch(url1 + this.state.type + url2 + name)
        //         .then((res) => res.json())
        //         .then((movielist) =>
        //             this.setState({
        //                 isloading: false,
        //                 movielist: movielist.data,
        //             })
        //         );
        // } catch (err) {}
    }
    async handleSubmit() {
        try {
            const name = this.state.name;
            if (name === "") return;
            fetch(url1 + this.state.type + url2 + name)
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
            <div className="App">
                <Navbar
                    handleSubmit={this.handleSubmit}
                    handleChangeSelect={this.handleChangeSelect}
                    handleChange={this.handleChange}
                />

                {this.state.movielist ? (
                    <Search type={this.state.type} isloading={this.state.isloading} movielist={this.state.movielist} />
                ) : (
                    <CardList />
                )}
            </div>
        );
    }
}
