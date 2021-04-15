import React, { Component, useState, useEffect} from "react";
import {TopBanner, LandingPage} from './Components/UI'
import {ServiceDetailPage} from './Components/ServiceDetail'
import {ShopRegistrationLayout} from './Components/ShopRegistration'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import LandingPage from './pages/LandingPage'

class App extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <Router>
                    {/* <Link to="/service-detail">
                    Click here
                    </Link> */}
                <Switch>
                
                    <Route path="/service-detail">
                        <ServiceDetailPage/>
                    </Route>
                    <Route exact path="/landing-page">
                        <LandingPage/>  
                    </Route>
                    <Route  path="/shop-registration">
                        <ShopRegistrationLayout/>  
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App;
