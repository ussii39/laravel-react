import React from "react";
import ReactDOM from "react-dom";
import { About } from "./About";
import { Navbar } from "./Navbar";
import { User } from "./User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Top } from "./Top";
import UserDetail from "./UserDetail";
import { Login } from "./Login";
import { Provider } from "react-redux";
import createStore from "../store/store";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";
import { CompletedQuestions } from "./CompletedQuestions";
import "../../css/app.css";
import { select } from "./select";
import { Loading } from "./Loading";
import { selectlevel } from "./selectlevel";
import { selectlang } from "./sleectlang";
import PythonQuestion from "./PythonQuestion";
import TypescriptQuestion from "./TypescriptQuestion";

const App = () => {
    return (
        <Router>
            <div id="app">
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Top} />
                    <Route path="/loading" exact component={Loading} />

                    <Route path="/select" exact component={select} />
                    <Route path="/selectlevel" exact component={selectlevel} />

                    <Route path="/selectlang" exact component={selectlang} />
                    <Route
                        path="/selectlang/typescript"
                        exact
                        component={TypescriptQuestion}
                    />
                    <Route
                        path="/selectlang/python"
                        exact
                        component={PythonQuestion}
                    />

                    <Route path="/login" exact component={Login} />
                    <Route
                        path="/completedQuestions"
                        component={CompletedQuestions}
                    />
                    <Route path="/about" component={About} />
                    <Route path="/user" exact component={User} />
                    <Route path="/user/:id" component={UserDetail} />
                </Switch>
            </div>
        </Router>
    );
};

const history = History.createBrowserHistory();

export const store = createStore(history);

if (document.getElementById("app")) {
    ReactDOM.render(
        <Provider store={store}>
            {/* <ConnectedRouter history={history}> */}
            <App />
            {/* </ConnectedRouter> */}
        </Provider>,
        document.getElementById("app")
    );
}
