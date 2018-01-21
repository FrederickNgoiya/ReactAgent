import React from "react";
import { Switch, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import Landing from "./Landing";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Signout from "./auth/Signout";
import Feature from "./Feature";
import NoMatch from "./NoMatch";

const MainContent = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/feature" component={RequireAuth(Feature)}/>
            <Route component={NoMatch}/>
        </Switch>
    </div>
);

export default MainContent;
