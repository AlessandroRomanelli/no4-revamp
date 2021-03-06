import React from "react";
import Home from "./Home"
import Navbar from "./Navbar"
import NotFound from "./NotFound"
import Application from "./Application"


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";



export default function AppRouter() {
    return (
        <Router>
            <Navbar/>
            <div className={"main-container"}>
                <Switch>
                    {/*<Route path="/donations">
                        <About />
                    </Route>
                    <Route path="/public">
                        <About />
                    </Route>
                    <Route path="/unit">
                        <Topics />
                    </Route>*/}
                    <Route path={"/application"}>
                        <Application/>
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route>
                        <NotFound/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

function About() {
    return <h2>About</h2>;
}

function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}