import React, { Component, useState, useEffect, useRef} from "react";
import {ProfileCard, ProfileInfo} from './Profile'
import styles from "./ShopDetails.module.scss";
import './ShopDetails.module.scss'
import {ServiceCardComponent} from './UI'
import {ServiceNavTabs} from './ServiceDetail'
import ShopLogo from '../assets/shop_logo.svg'
import {AddButton} from './ShopRegistration'

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
        <ServiceCardComponent serviceName={props.serviceName} serviceDescription={props.serviceDescription} price={props.price} target_automobile={props.target_automobile}/>
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
const ShopDetailsLayout = (props)=>{
    let tabNames = ['Services','Customer History','Stats']
    const loading = ()=><h2 key="loading">Loading..</h2>
    const text1 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper risus in hendrerit gravida rutrum quisque non tellus.'
    const text2 = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis mauris sit amet massa.'
    const renderServices = props.services.services.map((service, idx)=><ShopServices key={idx} serviceName={service.provider} serviceDescription={service.description} price={service.price} target_automobile={service.target_automobile} />).concat(<AddButton/>)
    let tabComponents = [props.services?<ShopServicesSection key={1}>{renderServices}</ShopServicesSection>:loading(),<p key="loading" >{text1}</p>,<p key="loading1" >{text2}</p>, ]
    console.log(props.services)
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
    const [services, setServices] = useState({services:[], loading:true})
    useEffect(()=>{
        // console.log(props)
        setUser(Object.keys(props.user).length!=0?props.user:JSON.parse(localStorage.getItem('user')))
        
    },[])
    useEffect(()=>{
        fetch('http://127.0.0.1:9000/api/shop-service/')
        .then((response) => response.json())
        .then(response => {
            // console.log(props.shopName)
            setServices({services:response.filter((shop)=>shop.provider==props.shopName), loading:false})  
        })
        .catch(err=>{console.log(err)});        
    },[])
    const [myUser, setUser] = useState({})
   
    // console.log(service)
    return(
        <ShopDetailsLayout user={user} shop={myUser.my_shops?myUser.my_shops.filter((shop)=>shop.shop_name==props.shopName)[0]:{}} services={services}/>
        
    )
}

export {ShopServicesLayoutCaller}
