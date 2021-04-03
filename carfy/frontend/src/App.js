import React, { Component, useState, useEffect} from "react";
import {Card, ServiceCard, TopBanner, LandingTopSection} from './Components/UI'

class App extends Component {

    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <TopBanner />
                <LandingTopSection />
                <ServiceCard />
            </div>
        )
    }
}



export default App;