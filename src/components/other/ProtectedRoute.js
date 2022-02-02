import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../../helpers/authHelper";

class ProtectedRoute extends Route {
    render(){
        if (!isAuthenticated()) {
            return <Redirect to={{ pathname: '/login' }} />
        } else {
          return super.render();
        }
    }
}
export default ProtectedRoute;