import React from "react";
import "./Navbar.css";
class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChangeSelect(e) {
        this.props.handleChangeSelect(e.target.value);
    }
    handleChange(e) {
        this.setState({
            name: e.target.value,
        }, () => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSubmit(this.state.name);
    }

    componentDidMount() {
        var burger = document.getElementsByClassName('burger')[0];
        var options = document.getElementsByClassName('options')[0];
        burger.addEventListener("click", () => {
            burger.classList.toggle('toggle');
            options.classList.toggle('slide-options');
        });
    }

    render() {
        return (
            <nav className='nav'>
                <div className='logo'><a href="/">MovieMela</a></div>
                <div className='options'>
                    <ul className='nav-links'>
                        <form onSubmit={this.handleSubmit} style={{ display: "inline-flex" }}>
                            <li>
                                <select onChange={this.handleChangeSelect} style={{ width: "102px" }} className="custom-select">
                                    <option defaultValue value="movie">Movie</option>
                                    <option value="tv">TV-Series</option>
                                </select>
                            </li>
                            <li>
                                <input
                                    onChange={this.handleChange}
                                    id="input"
                                    className="form-control"
                                    type="text"
                                    placeholder="Search"
                                />
                            </li>
                        </form>
                    </ul>
                </div>
                <div className='burger'>
                    <div className="line1"></div>
                    <div className="line2"></div>
                    <div className="line3"></div>
                </div>
            </nav>
        )
    }
}
export default Navbar;
