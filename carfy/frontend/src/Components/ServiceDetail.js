import React, { Component, useState, useEffect, useRef} from "react";
import {TopNavBar, TopBanner} from './UI'
import styles from "./ServiceDetail.module.scss";
import './ServiceDetail.module.scss'

const ServiceMedia = ()=>{
    return(
        <div className={`${styles.service_gallery} col-6 `}>
            <div className={`${styles.img1} ${styles.left_img}`}>
            </div>
            <div className={`${styles.img2}  ${styles.left_img}`}>
            </div>
            <div className={`${styles.img3}  ${styles.left_img}`}>
            </div>
            <div className={`${styles.img_main}`}>
        </div>
        </div>
    )
}

const ServiceInfoDetails = (props)=>{
    
    const services = ['Oil Change', 'Wheel alignment']
    useEffect(()=>{
        
    },[])
    const servicesIncluded = ()=>{
        let includedOnService = props.includes.split(',');
        return(            
            // className={`${styles.service_button}
            includedOnService.map((value, index)=><li key={index}>{value}</li>
            )
        )
    }
    return(
        <div className={`${styles.service_header}`}>
                        <h3 className={`${styles.service_name}`}>{props.serviceName}</h3> 
                        <div className={`${styles.service_categories}`}>{props.category}</div>
                        <div className={`${styles.service_rating}`}>
                            ⭐⭐⭐
                        </div>
                        <div className={`${styles.service_price}`}>${props.price}</div>
                        
                        <p className={`${styles.service_main_description}`}>
                           {props.mainDescription!=''?props.mainDescription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, soluta enim perferendis voluptates laboriosam. '}
                        </p>
                        <hr/>
                        <div className={`${styles.ser_cat_wrapper}`}>
                            <div className="services">
                                <h5>Services Included</h5>

                                <div className={`${styles.service_buttons_wrapper}`}>
                                    <ul>
                                        {servicesIncluded()}
                                    </ul>
                                    
                                    {/* <button className={`${styles.service_button} btn btn-outline-info`}> Wheel alignment</button> */}
                                </div>
                            </div>
                            <div className={`${styles.location}`}>                            
                                <h5>Location</h5>
                                <p>{props.address}</p>
                                {/* 13 Avenue #12-11 Street. */}
                                <p>{props.country}</p>
                                {/* Popayan, Colombia. */}
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
    )
}
const ServiceNavTabs = (props)=>{
    const [tabsState, setTabState] = useState({home:'active', info:'', review:''})
    const homeTab = useRef(null);
    function tabClick(e){
        // console.log(e.target)
        let tabName = e.target.name;
        // console.log(tabName)
        setTabState({...tabsState, home:tabName=='home'?'active':'', info:tabName=='information'?'active':'', review:tabName=='reviews'?'active':'' })
        // 
    }
  
    return(
        <div>
            
                {/* <!-- Tabs - Page --> */}
	        <div className={`${styles['tabs-page']}`}>
		    {/* <!-- Nav Tabs --> */}
		    <ul className={`${styles.nav} ${styles['nav-tabs']}`} role="tablist">
                <li role="presentation" className={`${tabsState.home=='active'?styles.active:''}`}><a href="#home" aria-controls="home" role="tab" data-toggle="tab" name="home" onClick={tabClick}>{props.tabNames?props.tabNames[0]:'Description'}</a></li>
                <li role="presentation" className={`${tabsState.info=='active'?styles.active:''}`}><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab" name="information" onClick={tabClick}>{props.tabNames?props.tabNames[1]: 'Information'}</a></li>
                <li role="presentation" className={`${tabsState.review=='active'?styles.active:''}`}>
                    <a href="#settings" aria-controls="reviews" role="tab" data-toggle="tab" name="reviews" onClick={tabClick}>{props.tabNames?props.tabNames[2]:'Information'}</a>
                </li>
            </ul>
        {/* <!-- ./ nav tabs -->	 */}
	    </div>
    {/* <!-- ./ tabs page --> */}
            <div className="tabs-page">
                {/* <!-- Tab panes --> */}
                <div className="tab-content">
                    <div role="tabpanel" className={`tab-pane ${tabsState.home}`} id="home" ref={homeTab}>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h6 className="text-start">{props.tabNames?props.tabNames[0]: 'Description'}</h6>
                                    {props.tabComponents?props.tabComponents[0]: <p className="text-muted text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique nulla aliquet 
                                    enim tortor at auctor urna.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className={`tab-pane ${tabsState.info}`} id="messages">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h6 className="text-start">{props.tabNames?props.tabNames[1]: 'Information'}</h6>
                               {props.tabComponents?props.tabComponents[1]: <p className="text-muted text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique nulla aliquet 
                                    enim tortor at auctor urna.
                                    </p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className={`tab-pane ${tabsState.review}`} id="settings">
                    <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <h6 className="text-start">{props.tabNames?props.tabNames[2]: 'Information'}</h6>
                                    {props.tabComponents?props.tabComponents[2]: <p className="text-muted text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra vel turpis nunc eget 
                                    lorem dolor sed viverra ipsum.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>		
            </div>
            </div>
    )
}

const ServiceDetailPage = (props)=>{
    let tabNames = ['DESCRIPTION','INFORMATION','SERVICE DELIVERY']
    let tabComponents = [props.shopData.long_description,"",""]
    return(
        <div className={`${styles.landing_main} container-fluid`}>
            <div className="row">
                <ServiceMedia />
                <div className={`${styles.service_info_container} col-6`}>
                    <ServiceInfoDetails serviceName={props.shopData.service_name}
                                        category={props.shopData.target_automobile}
                                        price={props.shopData.price}
                                        mainDescription={props.shopData.description}
                                        address='13 Avenue #12-11 Street.' 
                                        country="Popayan, Colombia." 
                                        includes={props.shopData.services}
                                        // =!""?props.shopData.services.split(","):""
                                        />
                <div> 
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <ServiceNavTabs  tabNames={tabNames} tabComponents={tabComponents}/>
        </div>
    </div>
</div>
    )
}

export {ServiceDetailPage, ServiceNavTabs}