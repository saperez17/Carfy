import React, { Component, useState, useEffect} from "react";
import {TopBanner, LandingPage, LandingTopSection, AuthButton, WelcomeTextCity} from './Components/UI'
import {ServiceDetailPage} from './Components/ServiceDetail'
import {ShopRegistrationLayout} from './Components/ShopRegistration'
import {BrowserRouter as Router, Link, NavLink, Route, Switch, useLocation} from 'react-router-dom';
import { divIcon } from "leaflet";
import stylesApp from './Components/UI.module.scss'
import { ProfileLayout } from "./Components/Profile";
import {ShopServicesLayoutCaller} from './Components/ShopDetails'



import {ShoppingCart, Cart} from './Components/Cart'

// Utility functions
import {fetchShopServiceById} from './Components/utilities/network'
import { RequestsLayout } from "./Components/ServiceRequests";

function NavWrapper(
    {className, 
    children}
    ){
        let location = useLocation()
        // console.log(location.pathname)
        let isLandingPage = location.pathname=='/carfy/'||location.pathname=='/carfy'
        let allClassNames = isLandingPage?`${stylesApp.navbar_col}`:`${stylesApp.navbar_col_shop}`
        return <div className={`${allClassNames}`}>{children}</div>
}
function TopNavLink(
    {className, 
    children, 
    to}
    ){
        let location = useLocation()
        let isLandingPage = location.pathname=='/carfy/'||location.pathname=='/carfy'
        let allClassNames = isLandingPage?`${stylesApp.navLink}`:`${stylesApp.navLinkShop}`
        return <NavLink className={`${allClassNames}`} to={to}>{children}</NavLink>
}

class App extends Component {

    constructor(){
        super();
        this.state = {isLoggedIn:false, userData:null, shopServices:[], cartItems:[]}
        this.authDropdown = this.authDropdown.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }

    addToCart (service){
        console.log(service);
        let cartItemsCopy =
        this.state.cartItems.slice()
        let alreadyInCart = false
        
        cartItemsCopy.forEach((item)=>{
            if(item.id==service.id){
                item.count++;
                alreadyInCart = true;
            }
        })
        if(!alreadyInCart){
            cartItemsCopy.push({...service, count:1})
        }
        this.setState((prevState)=>(
            {
                ...prevState,
                cartItems:cartItemsCopy
            }))
        
    }
    authDropdown(){
        if(this.state.userData?this.state.userData.user_type=='provider':false){
            return(
                <>
                    <li><Link className="dropdown-item" to="/profile/">Profile</Link></li>
                    <li><NavLink to="/carfy/shop-registration/" className="dropdown-item">My Shop</NavLink></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a href="http://127.0.0.1:9000/api/logout" className="dropdown-item">Log out</a></li>
                </>
            )
        }else if(this.state.userData?this.state.userData.user_type=='customer':false){
            return(
                <>
                    <li><Link className="dropdown-item" to="/profile/">Profile</Link></li>
                    <li><Link className="dropdown-item" to="/carfy/my-orders">My Requests</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a href="http://127.0.0.1:9000/api/logout" className="dropdown-item">Log out</a></li>
                </>
            )
        }else
            {
               return(
               <>
                <li><a href="http://127.0.0.1:9000/api/login" className="dropdown-item">Log in</a></li>
                <li><a href="http://127.0.0.1:9000/api/signup" className="dropdown-item">Sign up</a></li>
               </>
               ) 
            }
    } 
    componentDidMount(){
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify()
        };
        //Fetch all shop services
        fetch('http://127.0.0.1:9000/api/shop-service', requestOptions)
        .then(function(response){

            if (!response.ok){
                throw new Error("HTTP status " + response.status);
            }else{
                return response.json()
            }
        } )
        .then(response => {
            this.setState((prevState)=>({
               userData:prevState.userData,
               isLoggedIn:prevState.isLoggedIn,
               shopServices: prevState.shopServices.concat(response)
            }))
        })
        .catch(err=>{console.log(err)});

        //Fetch user-related info
        fetch('http://127.0.0.1:9000/api/check_auth', requestOptions)
        .then(function(response){
            if (!response.ok){
                throw new Error("HTTP status " + response.status);
            }else{
                return response.json()
            }
        } )
        .then(response => {
                //TODO: maybe improve this.
                localStorage.setItem('user',JSON.stringify(response))
            
            this.setState((prevState)=>({
                userData:{...response},
                isLoggedIn:true,
                shopServices: prevState.shopServices
            }))
        })
        .catch(err=>{console.log(err)});
    }
    componentDidUpdate(){
        console.log(this.state.cartItems);
    }
    
    render(){
        // console.log(this.state)
        return(
            <Router>
            <div>
                <div className={`${stylesApp.landing_main} container-fluid`}>
                        <div className={stylesApp.front_landing}>
                            <div className="row" style={{marginRight:0}}>
                                <NavWrapper className={`col-12 ${stylesApp.navbar_col} `}>
                                    <TopBanner/>
                                    <nav className="navbar navbar-expand-lg ">
                                        <TopNavLink className={`${stylesApp.navLink} navbar-brand`} to="/carfy">
                                            <p className={stylesApp.brand_p}>⚡Carfy</p>
                                        </TopNavLink>
                                        {/* <CustomComponent/> */}
                                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                                            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
                                        </button>
                                        <div className={`${stylesApp.collapse} navbar-collapse justify-content-end`} id="navbarNavDropdown">
                                            <ul className="navbar-nav">          
                                                <li className={stylesApp.navItem} >
                                                    <TopNavLink className={stylesApp.navLink} to="/categorie/truck">
                                                        <p>Truck</p>
                                                    </TopNavLink>
                                                </li>
                                                <li className={stylesApp.navItem} >
                                                    <TopNavLink className={stylesApp.navLink} to="/categorie/car">
                                                        <p>Car</p>
                                                    </TopNavLink>
                                                </li>
                                                <li className={stylesApp.navItem}>
                                                    <TopNavLink className={stylesApp.navLink} to="/categorie/motorcycle">
                                                        <p>Motorcycle</p>
                                                    </TopNavLink>
                                                </li>
                                                <li className={stylesApp.navItem}>
                                                    <Cart/>
                                                </li>
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fas fa-user"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        {this.authDropdown()}
                                                    </ul>
                                                </div>
                                            </ul>
                                        </div>
                                </nav>
                            </NavWrapper>
                        </div>
                    </div>
            </div>
                <Switch>
                <Route path="/profile/">
                        <ProfileLayout user={this.state.userData || {}}/>
                </Route>
                <Route path="/carfy/cart">
                    <ShoppingCart/>
                </Route>
                    <Route path="/carfy/service-detail/:serviceId"
                        render = {({match}) =>{
                            const serviceId = match.params.serviceId;
                            let serviceObj = this.state.shopServices.filter((val)=>val.id==serviceId)
                            if (serviceObj.length==0){
                                const shop = fetchShopServiceById(serviceId)
                                .then(res => {
                                    return <ServiceDetailPage service={res} addServiceHandler={this.addToCart}/>
                                })
                                .catch(error =>console.log('error:', error.message));
                            }else{
                                return <ServiceDetailPage service={serviceObj[0]} addServiceHandler={this.addToCart}/>
                            }
                        }}
                    />
                    <Router path="/carfy/my-orders">
                        <RequestsLayout/>
                    </Router>
                    <Route exact path="/carfy/shop-registration/" render={(props)=>(
                        <ShopRegistrationLayout {...props} user={this.state.userData || {}}/>
                    )}/>
                    <Route path="/categorie/:categorieName" 
                        render={({ match }) => {
                            // Do whatever you want with the match...
                            return <div>{match.params.categorieName}</div>;
                          }}
                    />
                    <Route path="/carfy/shop-registration/:shopId"
                    render={({ match }) => {
                        // Do whatever you want with the match...
                        console.log(this.state.userData);
                        return <ShopServicesLayoutCaller user={this.state.userData || {}} shopId={match.params.shopId}/>}}
                    >
                    </Route>
                    <Route exact path="">                     
                        <LandingPage services={this.state.shopServices}/>  
                    </Route>
                </Switch>
        </div>
    </Router>
    )}
}

export default App;