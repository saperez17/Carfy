import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import LandingPage from './pages/LandingPage'

function App() {
    return(
        <Router>
            {/* <Link to="/service-detail">
            Click here
            </Link> */}
        <Switch>
            <Route exact path="/landing-page">
                <LandingPage/>  
            </Route>
        </Switch>
       </Router>
    )
}

export default App;
