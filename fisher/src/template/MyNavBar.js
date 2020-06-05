import React from "react";
import Home from "../components/Home"
import Database from "../components/Database";
import FishermanSearcher from "../components/FishermanSearcher";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function MyNavBar(){
    return(
        <Router>
            <div id="MyNavBar" className="pt-2 bg-primary d-flex justify-content-around">
                <p>
                    <Link className="text-white font-weight-bold h3" to="/">Home</Link>
                </p>
                <p>
                    <Link className="text-white font-weight-bold h3" to="/database">Database</Link>
                </p>
                <p>
                    <Link className="text-white font-weight-bold h3" to="/search">Fisherman searcher</Link>
                </p>
            </div>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/database">
                    <Database/>
                </Route>
                <Route exact path="/search">
                    <FishermanSearcher/>
                </Route>
            </Switch>
        </Router>
    )
}