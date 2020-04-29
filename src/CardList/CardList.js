import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TvList from "../TvList";
import MovieList from "../MovieList";
import Display from "../Display/Display";
import People from "../People/People";
import "./CardList.css";

export default class CardList extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={() => <Redirect to="/movies" />} />
                    <Route exact path="/movies" render={() => <MovieList />} />
                    <Route exact path="/tv" render={() => <TvList />} />
                    <Route exact path="/display/:type/:id" render={(routerProps) => <Display {...routerProps} />} />
                    <Route exact path="/person/:id" render={(routerProps) => <People {...routerProps} />} />
                </Switch>
            </div>
        );
    }
}
