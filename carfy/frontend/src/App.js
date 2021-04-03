import React, { Component, useState, useEffect} from "react";
import {Card, ServiceCard, TopBanner, LandingTopSection, VehicleSectionLayout, ServicesMainSectionLayout} from './Components/UI'

class App extends Component {

    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <TopBanner />
                <LandingTopSection />
                <h3>Vehicle Categories</h3>
                <VehicleSectionLayout />
                <div>
                    <h3>Car Shops Available</h3>
                </div>
                <ServicesMainSectionLayout/>
            </div>
        )
    }
}



export default App;