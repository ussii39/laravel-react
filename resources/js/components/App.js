import React from "react";
import ReactDOM from "react-dom";
import { About } from "./About";
import { Navbar } from "./Navbar";
import { User } from "./User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Top } from "./Top";
import UserDetail from "./UserDetail";
import { Login } from "./Login";

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Top} />
                    <Route path="/login" exact component={Login} />

                    <Route path="/about" component={About} />
                    <Route path="/user" exact component={User} />
                    <Route path="/user/:id" component={UserDetail} />
                </Switch>
            </div>
        </Router>
    );
};

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
