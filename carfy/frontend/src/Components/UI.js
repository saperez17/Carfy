import React, { Component, useState, useEffect} from "react";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import styles from "./UI.module.scss";
import './UI.module.scss'
import Filter from "./Filter";
import Fade from 'react-reveal/Fade';

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

const NavLink = (props)=>{
    return(
        <a className={styles.navLink} href="">
            {props.children}
        </a>
    )
}

const AuthButton = (props)=>{
   let isLoggedIn = props.isLoggedIn;
   let AuthBtn;
   if(isLoggedIn){
       return(
        <div className="btn-group">
            <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fas fa-user"></i>
            </button>
            <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Profile</a></li>
                {props.user.user_type=='provider'?<li><NavLink to="/shop-registration/">My Shop</NavLink> </li>:<li><a className="dropdown-item" href="#">My requests</a></li>}
                {/* <a className="dropdown-item" href="http://127.0.0.1:9000/shop-registration">My shop</a> */}
                <li><hr className="dropdown-divider"/></li>
                <li><a href="http://127.0.0.1:9000/logout" className="dropdown-item"><p>Logout</p></a></li>
            </ul>
        </div>
       )    
   }else{
       return(
        <div className="d-flexflex-row">
               <li className={styles.navItem}><a href="http://127.0.0.1:9000/login" className={styles.navLink}><p>Login</p></a></li>
               <li className={styles.navItem}><a href="" className={styles.navLink}><p>Signin</p></a></li>
        </div>
       )
   }
    
}

const TopNavBar = ()=>{
    const [user, setUser] = useState({isLoggedIn:false})
    useEffect(()=>{
        fetch('http://127.0.0.1:9000/carfy/check_auth')
        .then((response) => response.json())
        .then(response => {
            if(Object.keys(response).length >1){
                setUser({isLoggedIn:true,...response})              
            }else{
                setUser({isLoggedIn:false})              
            }
        })
        .catch(err=>{console.log(err)});
    },[])
    let AuthBtn;
    if(user.isLoggedIn){
        AuthBtn = <li><a href="http://127.0.0.1:9000/logout" className={styles.navLink}><p>Logout</p></a></li>
    }else{
        AuthBtn = <div className="d-flex flex-row">
            <li className={styles.navItem}><a href="http://127.0.0.1:9000/login" className={styles.navLink}><p>Login</p></a></li>
            <li className={styles.navItem}><a href="http://127.0.0.1:9000/signin" className={styles.navLink}><p>Signin</p></a></li>
        </div>
    }
    // console.log(user)
    return(
           <nav className="navbar navbar-expand-lg ">
    <a className="navbar-brand" href="#"><p className={styles.brand_p}>⚡Carfy</p></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
    </button>
    <div className={`${styles.collapse} navbar-collapse justify-content-end`} id="navbarNavDropdown">
        <ul className="navbar-nav mr-auto">          
            <li className={styles.navItem} >
                <NavLink>
                    <p>Truck</p>
                </NavLink>
            </li>
            <li className={styles.navItem} >
                <NavLink >
                    <p>Car</p>
                </NavLink>

            </li>
            <li className={styles.navItem}>
                <NavLink>
                    <p>Motorcycle</p>
                </NavLink>
            </li>
            <AuthButton isLoggedIn={user.isLoggedIn} user={user} />

        </ul>
    </div>
</nav>
    )
}

const WelcomeTextCity = ()=>{
    return(
        <div>
            <div>
                <h3 className={`${styles.heading} ${styles.main_heading}`}>erat velit scelerisque in dictum</h3>
                <p className={styles.heading}> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
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
                    <div className="row" style={{marginRight:0}}>
                        <div className={`col-12 ${styles.navbar_col} `}>
                            <TopNavBar/>
                        </div>
                    </div>
                    <div className="row" style={{marginRight:0}}>
                            <div className={` col-12 ${styles.welcome_section}`}>
                                <WelcomeTextCity/>
                            </div>
                    </div>                   
                    
                </div>
                
            </div>
        </div>
    )
}
const VehicleSectionToast = (props)=>{
    return(
        <div>
            <figure>
                <img src={props.imgUrl}
                     alt={props.alt} />
                <figcaption>
                    <h3>{props.title}</h3>
                </figcaption>
            </figure>
            <p>
                {props.textContent}
            </p>
                <a href="">{props.txtButton}</a>
        </div>
    )
}
const VehicleSectionLayout = ()=>{
    return(
        <section id="services" className={styles.services} >
            <ul>
                <li>
                    <VehicleSectionToast 
                        title="Truck" 
                        imgUrl="https://cdn.vox-cdn.com/thumbor/dXnH-ySPU85VXbzb9YOQE3Ac9sw=/0x0:4243x3079/1400x933/filters:focal(1783x1201:2461x1879):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65022936/TuSimple_Self_Drving_Truck_4_copy.0.jpg"
                        alt="Truck"
                        textContent="neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis
                        nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum"
                        txtButton="Request"/>
                </li>
                <li>
                <VehicleSectionToast 
                        title="SUV" 
                        imgUrl="https://t1-cms-3.images.toyota-europe.com/toyotaone/gben/854x480_Best%20SUVs_tcm-3060-1225584.jpg"
                        alt="SUV car"
                        textContent="neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis
                        nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu felis bibendum"
                        txtButton="Request"/>
                </li>
                <li>
                <VehicleSectionToast 
                        title="Electric Car" 
                        imgUrl="https://img.freepik.com/free-vector/electric-car-concept-illustration_114360-927.jpg?size=626&ext=jpg"
                        alt="Electric car ilustration"
                        textContent="semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget"
                        txtButton="Request"/>
                </li>
            </ul>
        </section>
    )
}

class ServiceCardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            serviceName: 'Oil Change Premium',
            serviceDescription: 'The best and most affordable Oil Change in the city. We have at home service.',
            serviceTarget: '',
            servicePrice: 15000,
            serviceList: [],
        }
       
    }
    componentDidMount(){
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          });
         
    }
    
    render(){
      
        return(
            <Fade bottom cascade>
                 <div className="card" className={styles.service_card}>
                            <img src="https://cdn.dribbble.com/users/2145559/screenshots/10415392/media/0fa2ed74268fd3352333d359484252e5.jpg?compress=1&resize=400x300" className="card-img-top" alt="..." />
                            <div className={`card-body ${styles.cardBody}`}>
                                {/* <h5 className="card-title">{this.props.service.provider.shop_name}</h5> */}
                                <h5 className="card-title">{this.props.serviceName}</h5>
                                <h6>{this.props.targetAutomobile}</h6>
                                <p className={`${styles.description}`}>{this.props.serviceDescription}</p>
                                <div className="d-flex flex-column">
                                <p className={`card-text price mt-2 d-flex align-content-center justify-content-center ${styles.price}`}><strong>{(parseInt(this.props.price)).toLocaleString('en-US', {style:'currency',currency: 'COP'}) }</strong></p>
                                <Link to={`/carfy/service-detail/${this.props.id}`} className="btn btn-primary ">I want this</Link>
                                </div>
                                {/* <button className="btn btn-primary" onClick={()=>{this.props.clickHandler(this.props.service)}}>Add to cart</button> */}
                            </div>
                 </div>
            </Fade>
        );
    }
    bookService(event){
        this.setState( state=> ({
            servicePrice : state.servicePrice+1000
        }));
    }
}


const ServicesMainSectionLayout = (props)=>{
    const {services} = props;
    const [data, setData] = useState({services:[], loading:true, price:"", sort:"", count:0, cartItems:[]})
    // const [filterOptions, setFilterOptions] = useState({count:0, price:"", sort:""})
    useEffect(()=>{     
        setData((prevState)=>(
            {...prevState, 
                services:services,
                count:props.services.length
            }
        ))
    },[services])
    const addToCart = (service)=>{
        console.log(service);
        let cartItemsCopy = data.cartItems.slice()
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
        setData((prevState)=>(
            {
                ...prevState,
                cartItems:cartItemsCopy
            }))
    }
    const checkUserAuth = ()=>{
        const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };
            // fetch('http://127.0.0.1:9000/api/check_auth', requestOptions)
            //     .then(response => response.json())
            //     .then(data => console.log(data));
        // fetch('127.0.0.1:9000/api/service-provider')
        // .then((response) => response.json())
        // .then(response => {
        //     // console.log(response)
        // })
        // .catch(err=>{console.log(err)});
    }
    // console.log(service)

    const sortServices = (event)=>{
        //todo
        const filteredServices = data.services.slice()
        filteredServices.sort((a,b)=>{
            if(event.target.value=='lowest'){
                return new Date(a.created_at)-new Date(b.created_at)
            }else if(event.target.value=='highest'){
                return new Date(b.created_at)-new Date(a.created_at)
            }else{
                return a.id-b.id
            }
        })
        setData((prevState)=>(
            {...prevState, 
                services:filteredServices,
                count:filteredServices.length,
                sort:event.target.value
            }
        ))
    }
    const filterServices = (event)=>{
        let priceFilteredServices = props.services.slice()
        if(event.target.value==""){
            setData((prevState)=>(
                {...prevState,
                services:props.services,
                count:props.services.length,
                price:""
            }
            ))
        }else{
            priceFilteredServices = priceFilteredServices.filter((value)=>{
                if(event.target.value.toString()=="15-"){
                    return parseFloat(value.price)<=15000
                }else if(event.target.value=='15-40'){
                    return parseFloat(value.price)>15000 && parseFloat(value.price)<40000
                }else if(event.target.value=='40+'){
                    return parseFloat(value.price)>=40000
                }else{
                    return value
                }
            })

            setData((prevState)=>(
                {...prevState,
                services:priceFilteredServices,
                count:priceFilteredServices.length,
                price:event.target.value
            }
            ))
        } 
    }
    // console.log('data', data)
    //  console.log(data.cartItems);
    return(
    <div className="container-fluid">
        <div className="row row-cols-sm-1 row-cols-md-12  justify-content-sm-center">
            <div className="col">
            <Filter count={0} sort={data.sort} price={data.price} filterServices={filterServices} sortServices={sortServices} />
                <section className={styles.shop_services_wrapper}>
                    {data.services.length==0?<div>loading...</div> : (data.services.map((item, key)=>
                    <ServiceCardComponent key={key}
                                            // service={value}
                                            id = {item.id}
                                            serviceName={item.service_name} 
                                            serviceDescription={item.description} 
                                            price={item.price}
                                            targetAutomobile={item.target_automobile}
                                             clickHandler={addToCart}/>
                    // id={value.id} serviceName={value.provider} serviceDescription={value.description} price={value.price} target_automobile={value.target_automobile}
                    ))}
                </section>
                {/* <button className="btn btn-primary" onClick={checkUserAuth}>User Auth</button> */}
            </div>
        </div>
    </div>
   
    )
}

const LandingPage = (props)=>{
    return (
        <div>
            <div className={styles.bg_landing}>
                <div className={`${styles.welcome_section}`}>
                    <WelcomeTextCity/>
                </div>
            </div>
            <h3>Vehicle Categories</h3>
            <VehicleSectionLayout />
                <div>
                    <h3>Car Shops Available</h3>
                </div>
                <ServicesMainSectionLayout services={props.services}/>
        </div>
    )
}




export {Clock, 
        ServiceCard,
        LandingPage,
        TopNavBar,
        TopBanner,
        LandingTopSection,
        WelcomeTextCity,
        AuthButton,
        ServiceCardComponent,
}