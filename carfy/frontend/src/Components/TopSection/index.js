import TopNavBar from '../TopNavBar'
import WelcomeSection from '../WelcomeSection'

import './styles.css'

const TopSection = () => {
    return (
        <div className='landing_main container-fluid'>
            <div className='bg_landing'>
                <div className='front_landing'>

                    <div className='row'>
                        <div className='col-12 navbar_col'>
                            <TopNavBar />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-12 welcome_section'>
                            <WelcomeSection />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default TopSection