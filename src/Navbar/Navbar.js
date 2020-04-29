import React from "react";
import { withRouter } from "react-router-dom";
import "./Navbar.css";
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeSelect(e) {
        this.props.handleChangeSelect(e.target.value);
    }
    handleChange(e) {
        this.props.handleChange(e.target.value);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    MovieMela
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarsExample03"
                    aria-controls="navbarsExample03"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample03">
                    <ul className="navbar-nav mr-auto"></ul>
                    <form onSubmit={this.handleSubmit} className="form-inline my-2 my-md-0">
                        <select onChange={this.handleChangeSelect} style={{ width: "112px" }} className="custom-select">
                            <option defaultValue value="movie">
                                Movie
                            </option>
                            <option value="tv">TV-Series</option>
                        </select>
                        <input onChange={this.handleChange} className="form-control" type="text" placeholder="Search" />
                    </form>
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
