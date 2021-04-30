import React, { Component, useState, useEffect, useRef} from "react";
import {ProfileCard, ProfileInfo} from './Profile'
import styles from "./ShopDetails.module.scss";
import './ShopDetails.module.scss'
import {ServiceCardComponent} from './UI'
import {ServiceNavTabs} from './ServiceDetail'
import ShopLogo from '../assets/shop_logo.svg'
import {AddButton} from './ShopRegistration'
import { fetchData } from "./utilities/network";

const user = {
    user:'ale',
    city:'Popayan',
    country:'Colombia',
    fullname:'Luis Alejandro Alvarado',
    email:'ale@gmail.com',
    phone:'3148853032',
    address:'Manzana e casa # 16 B/ Colina campestre'
}

const ShopServices = (props)=>{
    return(
        <ServiceCardComponent   id = {props.id}
                                serviceName={props.serviceName} 
                                serviceDescription={props.serviceDescription} 
                                price={props.price}
                                targetAutomobile={props.target_automobile}/>
    )
}
const ShopServicesSection = (
    props,
    )=>{
    return(
                <section className={`${styles.shopServicesWrapper}`}>
                    {props.children}
                </section>
    )
}

const RequestTableRow = (props)=>{
    return(
        <tr>
            <th scope="row">1</th>
            <td>
               <div className={`d-flex flex-column ${styles.itemCell}`}>
                <p>{props.request.service.provider.shop_name}</p>
                <p>Specialization</p>
               </div>
            </td>
            <td>
            <div className={`d-flex flex-column ${styles.itemCell}`}>
                <p>{props.request.service.service_name}</p>
                <p>{props.request.service.target_automobile}</p>
            </div>
                
            </td>
            <td>
                <div className={`d-flex flex-column ${styles.itemCell}`}>
                    <p>{props.request.requester.fullname}</p>        
                </div>
            </td>
            <td>
                <div className={`d-flex flex-column ${styles.itemCell}`}>
                    <p>{props.request.requester.mobile_phone}</p>
                </div>
            </td>
            <td>
                <div className={`d-flex flex-column ${styles.itemCell}`}>
                    <p>{props.request.location}</p>
                </div>
            </td>
            <td>
                <button type="submit" className={`btn btn-primary mr-2 ${styles.btnOk} `}>
                    <i className="fas fa-check"></i>
                </button>
                <button className={`btn btn-danger ${styles.btnX}`}>
                    <i className="fas fa-times"></i>
                </button>
            </td>
        </tr>
    )
}

const RequestTable = (props)=>{
    return(
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col"><p>Shop</p></th>
                    <th scope="col"><p>Service</p></th>
                    <th scope="col"><p>Customer name</p></th>
                    <th scope="col"><p>Customer contact</p></th>
                    <th scope="col"><p>Location</p></th>
                    <th scope="col"><p>Action</p></th>
                </tr>
            </thead>
            <tbody>
                {props.requests.map((item, idx)=>(<RequestTableRow key={idx} request={item}/>))}
               
            </tbody>
        </table>
        )
}

const ShopDetailsLayout = (props)=>{
    let tabNames = ['SERVICES','REQUESTS','STATS']
    const loading = ()=><h2 key={4}>Loading..</h2>
    const text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper risus in hendrerit gravida rutrum quisque non tellus.'
    const text2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis mauris sit amet massa.'
    const renderServices = props.services.map((item, idx)=><ShopServices key={idx} id={item.id} serviceName={item.service_name} serviceDescription={item.description} price={item.price} target_automobile={item.target_automobile} />).concat(<AddButton key={5}/>)
    let tabComponents = [props.services?<ShopServicesSection key={1}>{renderServices}</ShopServicesSection>:loading(),<RequestTable key={2} requests={props.requests}/>,<p key={3}>{text2}</p>]
    return(
        <div className="container mt-5 pt-3">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <ProfileCard dataObject={{mainHeader:props.shop.shop_name, substring1:props.shop.owner, substring2:'Popayan', substring3:'Colombia'}} imgLogo={ShopLogo} width={'170'}/>
                    </div>
                    <div className="col-md-8">
                        <ProfileInfo dataObject={{shopname:props.shop.shop_name,slogan:props.shop.slogan,membership:props.shop.membership,city:props.shop.city}}/>
                    </div>
                </div>
                <div className="row">
                    <ServiceNavTabs tabNames={tabNames} tabComponents={tabComponents}/>
                </div>
                
            
            </div>
    </div>
    )
}

const ShopServicesLayoutCaller = (props)=>{
    const [services, setServices] = useState({services:[], requests:[], loading:true})
    const [user, setUser] = useState({})
    useEffect(()=>{        
    },[])
    useEffect(() => {
                const shop = fetchData("/shop-service/")
                    .then(res => {
                        // console.log(res);
                            let servicesCopy = []
                            res.forEach((item)=>{
                                if(item.provider.id==props.shopId){
                                    servicesCopy.push(item)
                                }
                            })
                            setServices((prevState) =>
                                ({
                                    ...prevState,
                                    services: servicesCopy
                                }))
                            })
                        .catch(error => console.log('error:', error.message));

                        const servicesRequests = fetchData(`/shop-service/${props.shopId}/requests`)
                        .then(res => {
                        // console.log('requests', res);
                            let requestsArr = services.requests.slice();
                            requestsArr = res;
                            setServices((prevState) =>
                                ({
                                    ...prevState,
                                    loading: false,
                                    requests: requestsArr
                                }))
                            })
                        .catch(error => console.log('error:', error.message));
                            

                    },                    
                    [props.user])
    // console.log('props', props);
    console.log('state', services);
    return(
        <>
        {services.services.length!=0?<ShopDetailsLayout user={user} shop={user.my_shops?user.my_shops.filter((shop)=>shop.id==props.id)[0]:{}} services={services.services} requests={services.requests}/>:<>Loading..</>}
        </>
        
    )
}

export {ShopServicesLayoutCaller}
