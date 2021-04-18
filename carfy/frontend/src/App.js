import React, { Component, useState, useEffect} from "react";
import {TopBanner, LandingPage, LandingTopSection, AuthButton, WelcomeTextCity} from './Components/UI'
import {ServiceDetailPage} from './Components/ServiceDetail'
import {ShopRegistrationLayout} from './Components/ShopRegistration'
import {BrowserRouter as Router, Link, NavLink, Route, Switch, useLocation} from 'react-router-dom';
import { divIcon } from "leaflet";
import stylesApp from './Components/UI.module.css'
import { ProfileLayout } from "./Components/Profile";

function NavWrapper(
    {className, 
    children}
    ){
        let location = useLocation()
        // console.log(location.pathname)
        let isLandingPage = location.pathname=='/landing-page/'
        let allClassNames = isLandingPage?`${stylesApp.navbar_col}`:`${stylesApp.navbar_col_shop}`
        return <div className={`${allClassNames}`}>{children}</div>
}
function TopNavLink(
    {className, 
    children, 
    to}
    ){
        let location = useLocation()
        let isLandingPage = location.pathname=='/landing-page/'
        let allClassNames = isLandingPage?`${stylesApp.navLink}`:`${stylesApp.navLinkShop}`
        return <NavLink className={`${allClassNames}`} to={to}>{children}</NavLink>
}

class App extends Component {

    constructor(){
        super();
        this.state = {isLoggedIn:false, userData:null}
    }
    componentDidMount(){
        fetch('http://127.0.0.1:9000/api/service-provider')
        .then((response) => response.json())
        .then(response => {
            if(response.length >=1){
                // console.log(response[0])
                this.setState({userData:{...response[0]}, isLoggedIn:true })
            }else{
                this.setState({isLoggedIn:false })
            }
        })
        .catch(err=>{console.log(err)});
    }
    componentDidUpdate(){
    }
    
    render(){
        // console.log(this.state.userData)
        return(
            <Router>
            <div>
                <div className={`${stylesApp.landing_main} container-fluid`}>
                        <div className={stylesApp.front_landing}>
                            <div className="row" style={{marginRight:0}}>
                                <NavWrapper className={`col-12 ${stylesApp.navbar_col} `}>
                                    <TopBanner/>
                                    <nav className="navbar navbar-expand-lg ">
                                        <TopNavLink className={`${stylesApp.navLink} navbar-brand`} to="/landing-page/">
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
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="fas fa-user"></i>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <Link className="dropdown-item" to="/profile/">
                                                                Profile
                                                            </Link>
                                                        {/* <a className="dropdown-item" href="#">Profile</a> */}
                                                        </li>
                                                        {this.state.userData!=null?<li><NavLink to="/shop-registration/" className="dropdown-item">My Shop</NavLink> </li>:<li><a className="dropdown-item" href="#">My requests</a></li>}
                                                        {/* <a className="dropdown-item" href="http://127.0.0.1:9000/shop-registration">My shop</a> */}
                                                        <li><hr className="dropdown-divider"/></li>
                                                        <li><a href="http://127.0.0.1:9000/logout" className="dropdown-item"><p>Logout</p></a></li>
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
                    <Route path="/service-detail/">
                        <ServiceDetailPage/>
                    </Route>
                    <Route exact path="/landing-page/">                     
                        <LandingPage/>  
                    </Route>
                    <Route  exact path="/shop-registration" render={(props)=>(
                        <ShopRegistrationLayout {...props} user={this.state.userData || {}}/>
                    )}/>
                    <Route path="/categorie/:categorieName" 
                        render={({ match }) => {
                            // Do whatever you want with the match...
                            return <div>{match.params.categorieName}</div>;
                          }}
                    />
                </Switch>
        </div>
    </Router>
    )}
}

export default App;