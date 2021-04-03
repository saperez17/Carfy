import React, { Component, useState, useEffect} from "react";
import styles from "./UI.module.css";

const Clock = ()=>{
    const[date, setDate] = useState({date_now: new Date().toLocaleTimeString()})

    useEffect(()=>{
        const timerId = setInterval(()=>{
            setDate({...date, date_now:new Date().toLocaleTimeString()})
        },1000);
        return function cleanup(){
            clearInterval(timerId);
        }
    },[])

    return(
        <div>
            <h1>Time now:</h1>
            {date.date_now}
        </div>
    )
}
const ServiceCard = ()=>{

    return(
        <div>
            <div className="card">
               
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        </div>
    )
}


const TopBanner = ()=>{

    return(
        <div>
            <div className={styles.top_footer}>
                <div className={styles.media}>
                    <div className={styles.inner}>
                        <i className={`${styles.in_icon} fab fa-instagram`}></i>
                        <i className="fb-icon fab fa-facebook-f"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TopNavBar = ()=>{
    return(
        
           <nav className="navbar navbar-expand-lg ">
    <a className="navbar-brand" href="#"><p class={styles.brand_p}>⚡Carfy</p></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
    </button>
    <div className={`${styles.collapse} navbar-collapse justify-content-end`} id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">
            {/* {% if user.is_authenticated %}
            <li class="nav-item">
                <a class="nav-link" href="#" id="username"><strong>{{ user.username }}</strong></a>
            </li> */}
          
            <li className="nav-item" >
                <a className="nav-link" href=""><p>Truck</p></a>
            </li>
            <li className="nav-item" >
                <a className="nav-link" href=""><p>Car</p></a>
            </li>
            <li clclassNameass="nav-item" >
                <a className="nav-link" href=""><p>Motorcycle</p></a>
            </li>
            {/* {% if user.is_authenticated %}
            <li class="nav-item">
                <a id="following-btn" class="nav-link" href=""><p style="color:black;">Following</p> </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{% url 'logout' %}">Log Out</a>
            </li> */}
            {/* {% else %} */}
            <li className="nav-item">
                <a className="nav-link" href=""><p>Log In</p></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="">Sign in</a>
            </li>
            {/* {% endif %} */}
        </ul>
    </div>
</nav>
      

    )
}

const WelcomeTextCity = ()=>{
    return(
        <div>

            <div >
                <h3 className={`${styles.heading} ${styles.main_heading}`}>erat velit scelerisque in dictum</h3>
                <p className="heading"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt
                    <br/>
                    ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare quam.
                </p>
            </div>
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Choose your city
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><a className="dropdown-item" href="#">Popayan</a></li>
                    <li><a className="dropdown-item" href="#">Cali</a></li>
                    <li><a className="dropdown-item" href="#">Pasto</a></li>
                </ul>
            </div>
        </div>
   
    )
}

const LandingTopSection = ()=>{
    return(
        <div className={`${styles.landing_main} container-fluid`}>
            <div className={styles.bg_landing}>
                <div className={styles.front_landing}>
                    <div className="row">
                        <div className={`col-12 ${styles.navbar_col} `}>
                            <TopNavBar/>
                        </div>
                    </div>
                    <div className="row">
                            <div className={` col-12 ${styles.welcome_section}`}>
                            <WelcomeTextCity/>
                            </div>
                    </div>                   
                    
                </div>
                
            </div>
        </div>
    )
}


export {Clock, ServiceCard, TopBanner, LandingTopSection}