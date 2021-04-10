import React, { Component, useState, useEffect} from "react";
import {TopNavBar, TopBanner} from './UI'
import styles from "./ServiceDetail.module.css";
import './ServiceDetail.module.css'

const ServiceDetailPage = ()=>{
    return(
        <div className={`${styles.landing_main} container-fluid`}>
            <div className="row">
                <div className={`col-12 ${styles.navbar_col} `}>
                    <TopNavBar/>
                </div>
            </div>

            <div className="row">
                <div className={`${styles.service_gallery} col-6 `}>
                   <div className={`${styles.img1} ${styles.left_img}`}>
                        Pic1                   
                   </div>
                   <div className={`${styles.img2}  ${styles.left_img}`}>
                        Pic2
                   </div>
                   <div className={`${styles.img3}  ${styles.left_img}`}>
                        Pic3
                   </div>
                   <div className={`${styles.img_main}`}>
                    Main Image
                </div>
            </div>
                <div className={`${styles.service_info_container} col-6`}>
                    <div className={`${styles.service_header}`}>
                        <h3 className={`${styles.service_name}`}>Shop name</h3> 
                        <div className={`${styles.service_categories}`}>Category</div>
                        <div className={`${styles.service_rating}`}>
                            ⭐⭐⭐
                        </div>
                        <div className={`${styles.service_price}`}>$15.000</div>
                        
                        <p className={`${styles.service_main_description}`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, 
                            soluta enim perferendis voluptates laboriosam. 
                        </p>
                        <hr/>
                        <div className={`${styles.ser_cat_wrapper}`}>
                            <div className="services">
                                <h5>Services Included</h5>

                                <div className={`${styles.service_buttons_wrapper}`}>
                                    <button className={`${styles.service_button} btn btn-outline-info`}>Oil Change</button>
                                    <button className={`${styles.service_button} btn btn-outline-info`}> Wheel alignment</button>
                                </div>
                            </div>
                            <div className={`${styles.location}`}>                            
                                <h5>Location</h5>
                                <p>13 Avenue #12-11 Street.</p>
                                <p>Popayan, Colombia.</p>
                            </div>

                           
                        </div>
                        <div className={`${styles.action_btn_wrapper}`}>
                        <button className={`btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light ${styles.action_btn}`}>
                                BUY NOW
                        </button>
                        <button className={`btn btn-secondary btn-md mr-1 mb-2 waves-effect waves-light ${styles.action_btn}`}>
                               ADD TO CART
                        </button>
                        </div>
                        
                    </div>

                   
                   
                    <hr/>
                    <div>
                   
                    </div>
                    </div>
                    
                    {/* <div className="card border-light mb-3" style={{width: "18rem"}}>
                        <div className="card-header">
                        Request Summary
                        <i class="fas fa-shopping-cart"></i>
                        </div>
                            <div className="card-body">
                                <h5 className="card-title">Items</h5>
                                 <p className="card-text">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">
                                            <div>
                                                Item1 - Price
                                            </div>
                                            <div>
                                                Item2 - Price
                                            </div>
                                        </li>
                                        <li class="list-group-item">Total$</li>
                                        
                                    </ul>
                                  </p>
                            </div>  
                        </div>*/}
                 
            </div>

            <div className="row">
                <div className="col-12">
                {/* <!-- Tabs - Page --> */}
	<div class={`${styles.tabs_page}`}>
		{/* <!-- Nav Tabs --> */}
		<ul class={`${styles.nav} ${styles.nav_tabs}`} role="tablist">
			<li role="presentation" class={`${styles.active}`}><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
			<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
			<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
			<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
		</ul>
        {/* <!-- ./ nav tabs -->	 */}
	</div>
    {/* <!-- ./ tabs page --> */}
                    <h3>Description</h3>
                    <h3>Information</h3>
                    <h3>Reviews</h3>
                </div>
            </div>
        </div>
    )
}

export {ServiceDetailPage}