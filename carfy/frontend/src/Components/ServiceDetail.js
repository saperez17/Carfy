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
                <div className={`${styles.service_gallery} col-8 `}>
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
                
                <div className="col-4">
                    <div>
                        <h4>Shop name</h4>
                        <h6>Category</h6>
                        <div>
                            ⭐⭐⭐
                        </div>
                        Price 💰
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, 
                        soluta enim perferendis voluptates laboriosam. 
                        </p>
                        <hr/>
                        <h5>Car category</h5>
                        <ul>
                            <li>
                                SUV
                            </li>
                            <li>
                                EV
                            </li>
                        </ul>
                        <h5>Services</h5>
                        <ul>
                            <li>
                                Oil Change
                            </li>
                            <li>
                                Wheel alignment
                            </li>
                        </ul>
                    </div>
                    <h5>Location</h5>
                    <p>Popayan</p>
                    <hr/>
                    <div>
                    <button className="btn btn-primary btn-md mr-1 mb-2 waves-effect waves-light">
                        Request
                    </button>
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
            </div>

            <div className="row">
                <div className="col-12">
                    <h3>Description</h3>
                    <h3>Information</h3>
                    <h3>Reviews</h3>
                </div>
            </div>
        </div>
    )
}

export {ServiceDetailPage}