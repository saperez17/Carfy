import React from "react";
import TopNavBar from '../TopNavBar'
import WelcomeSection from '../WelcomeSection'

import styles from  './styles.module.css'

const TopSection = () => {
    return (
        <div className={`${styles.landing_main} container-fluid`}>
            <div className={`${styles.bg_landing}`}>
                <div className={`${styles.front_landing}`}>

                    <div className='row'>
                        <div className={`col-12 ${styles.navbar_col}`}>
                            <TopNavBar />
                        </div>
                    </div>

                    <div className='row'>
                        <div className={`col-12 ${styles.welcome_section}`}>
                            <WelcomeSection />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TopSection