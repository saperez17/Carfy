import './styles.module.css'

import React from "react";
import TopNavBar from '../TopNavBar'
import ShopInfoCard from '../ShopInfoCard'

const ShopMedia = () => {
    return (
        <div className='landing_main container-fluid'>
            <div className='row'>
                <div className='navbar_col col-12'>

                    <TopNavBar />

                </div>
            </div>

            <div className='row'>
                <div className='service_gallery col-8'>

                    <div className='img1 left_img'>
                        Pic1
                    </div>

                    <div className='img2 left_img'>
                        Pic2
                    </div>

                    <div className='img3 left_img'>
                        Pic3
                    </div>

                    <div className='img_main'>
                        Main Image
                    </div>
                </div>

                <div  className='col-4'>
                    <ShopInfoCard />

                    <div>
                        <button className='btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light'>
                            Request
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ShopMedia