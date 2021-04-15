import React from "react";
import TopBanner from '../../Components/TopBanner'
import TopSection from '../../Components/TopSection'
import VehicleSection from '../../Components/VehicleSection'
import ServicesLayout from '../../Components/ServicesLayout'

const LandingPage = () => {
    return (
        <div>
            <TopBanner />
            <TopSection />

            <h3>Vehicle Categories</h3>
            <VehicleSection />
            
            <div>
                <h3>Car Shops Available</h3>
            </div>

            <ServicesLayout />
        </div>
    )
}

export default LandingPage