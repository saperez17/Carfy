import React, { Component, useState, useEffect} from "react";
import styles from "./ShopRegistration.module.scss";
import BussinessShopLogo from '../assets/business_shop.svg'
import styled, { keyframes } from 'styled-components'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import {Link, NavLink, Route, useHistory } from 'react-router-dom';
import {retrieveUserData} from './utilities/network';
const ActionButton = (props)=>{
    return(
        <button className={`${styles.action_button}`} onClick={()=>props.onClickHandler(false)}>
            NEW SHOP
        </button>
    )
}


const HeaderMessage = (props)=>{
    return(
        <div className={`${styles.header_message}`}>
            <img src={BussinessShopLogo} alt="Bussiness Shop Logo" width={150}/>
            <h2>Ops, you dont have any shop yet</h2>
            <p>Shops are the virtual presence of your physical or virtual service in Carfy.
                With shops you can start offering services to customers.</p>
            <ActionButton onClickHandler={props.onClickHandler}/>
        </div>
    )
}

const StepInstruction = (props)=>{
    return(
        <div>
            <div className={`${styles.step_wrapper}`}>
                <div className={`${styles.inner_cricle}`}>
                    <p>{props.stepNum}</p>
            </div>
        </div>
        <div className={styles.step_txt_wrapper}>
              <h3>{props.stepTitle}</h3>
              <p>
                {props.stepTxt}
              </p>
        </div>
        </div>
    )
}

const fadeIn = keyframes`
from{
    opacity:0;
}
to{
    opacity:1;
}`;
const Wrapper = styled.div`
    @media (prefers-reduced-motion: no-preference){
        animation-name: ${fadeIn};
        animation-fill-mode: backwards;
    }
`;


const FadeIn = ({
    duration = 150,
    delay = 0,
    children,
    ...delegated
  }) => {
    return (
      <Wrapper
        {...delegated}
        style={{
          ...(delegated.style || {}),
          animationDuration: duration + 'ms',
          animationDelay: delay + 'ms',
        }}
      >
        {children}
      </Wrapper>
    );
  };
const BrandPanel =()=>{
    return(
        <div className={`${styles.brand_panel}`}>
                <div>⚡</div>
                <h2>Carfy</h2>
                <p>EXPLORE MORE, WORRY LESS</p>
        </div>
    )
}
const NoShopRegistered = (props)=>{
    return(
    <div>
        <HeaderMessage onClickHandler={props.onClickHandler}/>
        <div className={`${styles.intructions_wrapper}`}>
            <StepInstruction stepNum={1} stepTitle={'Create Shop'} stepTxt={'Your shop represents your business in Carfy. '}/>
            <StepInstruction stepNum={2} stepTitle={'Add services'} stepTxt={'Each shop can offer one or multiple services wich customers can request.'}/>
            <StepInstruction stepNum={3} stepTitle={'Serve & Earn'} stepTxt={'Done! You can start attending your customer requests and earn revenue in the process.'}/>
        </div>
    </div>
    )
}

const GeneralInfoWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-template-rows: 2fr;
    grid-column-gap:5px;
`;
const LocationInfoWrapper = styled.div`
    display: flex;
    flex-direction:column;
    width:50%;
`;

const ShopMap = ()=>{
    return(
        <div style={{width:'400px', height:'200px'}}>
        <MapContainer center={[2.4452606654520093, -76.60353793244924]} zoom={13} scrollWheelZoom={false} style={{width:'400px', height:'100%'}}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[2.449953,  -76.585506]}>
                <Popup>
                    Home ❣. <br /> Hi!.
                </Popup>
            </Marker>
        </MapContainer>
        </div>
        
    )
}

const NewShopRegistration = (props)=>{
    const [shop, setShop] = useState({shop_name:'', shop_slogan:'', country:'', city:'', latitude:0, longitude:0, membership:'F' })
    const [csrftoken, setToken] = useState('')
    const [success, setSuccess] = useState(false)
    useEffect(()=>{
        setToken(getCookie('csrftoken'))
    },[])
    const onChangeName =(e)=>{
        setShop({...shop, [e.target.id]:e.target.value})
        // console.log(e.target.value)   
    }
    const registerShop =()=>{
        // Simple POST request with a JSON body using fetch
        var val = true
        Object.keys(shop).forEach((key)=>{
            if (shop[key]==''){
                val=false
                return
            }
        })
        if (val){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRFToken': csrftoken },
                body: JSON.stringify(shop)
            };
            fetch('http://127.0.0.1:9000/api/shop/', requestOptions)
                .then(response => {
                    response.json()
                    if(response.status.toString()[0]=='2'){
                        setSuccess(true);
                    }
                })
                .then(data => console.log(data))
                .catch((error) => {
                    console.log(error)
                    setSuccess(false);
                  });
        }else{
            console.log('All form fields must be filled')
        }
    }

    const getCookie=(name)=> {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    
    return(
        <div>
            <Alert variant="success" dismissible show={success} onClose={() => setSuccess(false)}>
                <Alert.Heading>Hooray!</Alert.Heading>
            </Alert>
            <GeneralInfoWrapper>
                <div>
                    <button className="btn btn-outline-primary" onClick={()=>{props.onClickHandler(true); props.updateUserData()}}>{`<-`}</button>
                    <h3>General shop info</h3>
                    <div className="mb-3">
                        <label htmlFor="shop_name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="shop_name" placeholder="Shop name" onChange={onChangeName}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="shop_slogan" className="form-label">Slogan</label>
                        <input type="text" className="form-control" id="shop_slogan" placeholder="Shop slogan" onSelect={onChangeName}/>
                    </div>
                </div>
                <div>
                    <h3>Shop Pic</h3>
                    <div className="mb-3">
                        <label htmlFor="formImageFile" className="form-label">Upload shop profile image</label>
                        <input className="form-control" type="file" id="formImageFile"/>
                    </div>
                </div>
            </GeneralInfoWrapper>
            <LocationInfoWrapper>
                <h2>Location</h2>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select className="form-select" aria-label="Default select example" id="country" defaultValue={'DEFAULT'} onChange={onChangeName}>
                        <option value="DEFAULT" disabled>Choose a country</option>
                        <option value="CO">COLOMBIA</option>
                        <option value="BR">BRAZIL</option>
                        <option value="US">US</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City</label>
                    <select className="form-select" aria-label="Default select example" id="city" defaultValue={'DEFAULT'} onChange={onChangeName}>
                        <option value="DEFAULT" disabled>Choose a city</option>
                        <option value="Sao Paulo">Sao Paulo</option>
                        <option value="Popayan">Popayan</option>
                        <option value="Medellin">Medellin</option>
                    </select>
                </div>
                <div className="d-flex">
                    <div className="mb-3">
                        <label htmlFor="longitude" className="form-label">Longitude</label>
                        <input type="number" className="form-control" id="longitude" placeholder="Shop longitude" onChange={onChangeName}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="latitude" className="form-label">Latitude</label>
                        <input type="number" className="form-control" id="latitude" placeholder="Shop latitude" onChange={onChangeName}/>
                    </div>
                </div>
                <ShopMap/>
                <button className="btn btn-primary" onClick={registerShop}>Create Shop</button>
            </LocationInfoWrapper>

        </div>
    )
}

const ShopCard = (props)=>{
    const history = useHistory();

    const routeChange = () =>{ 
        console.log(props);
      let path = `/carfy/shop-registration/${props.shop.id}`; 
      history.push(path);
    }
    return(
        <div className={`mb-2 ${styles.shop_card}`} onClick={routeChange}>
            <div className={`${styles.section} pl-5`}>
                    <div className="">
                        <p className="text-muted mb-0 ">name</p>
                        <h5 className="">{props.shop.shop_name}</h5>    
                    </div>
                    <div>
                        <p className="text-muted mb-0 ">slogan</p>
                        <h5 className="">{props.shop.slogan==''?'No slogan':props.shop.slogan}</h5>    
                    </div>
            </div>
           
            <div className={`${styles.section}`}>
                    <div>
                        <p className="text-muted mb-0 ">membership</p>
                        <h5 className="">{props.shop.membership}</h5>    
                    </div>
                    <div>
                        <p className="text-muted mb-0 ">city</p>
                        <h5 className="">{props.shop.city}</h5>    
                    </div>
            </div>

            <div className={`${styles.stats_section}`}>
                    <div>
                        <p className="text-muted mb-0 ">views</p>
                        <h5 className="">317</h5>  
                    </div>
                    <div>
                        <p className="text-muted mb-0 ">requests</p>
                        <h5 className="">179</h5>  
                    </div>
                    <div>
                        <p className="text-muted mb-0 ">earnings</p>
                        <h5 className="">$<strong>95.000</strong></h5>  
                    </div>
            </div>
            <div className={`${styles.pic_section}`}>
                <img src={BussinessShopLogo} alt="Bussiness Shop Logo" width={150}/>
            </div>
        </div>
    )
}
const AddButton = (props)=>{
    return(
        <div className={`${styles.center_content} ${props.wrapperStyle?props.wrapperStyle:""}`}>
            <button className={`btn btn-dark ${styles.btn_circle} ${styles.center_content} btn-circle-lg mt-2 `} onClick={()=>props.onClickHandler(false)}>
                <span style={{fontSize: '1.5rem'}}>
                    <i className={props.iconClass?`${props.iconClass}`:"fas fa-plus"}></i>
                </span>
            </button>
        </div>
    )
}


const ShopCardWrapper = ({
    children,
    updateUserData,
    ...rest
})=>{
    const [bodyTrigger, setBodyTrigger] = useState(true)
    const onClickHandler = (val)=>{
        console.log('hi')
        // retrieveUserData();
        setBodyTrigger((prev)=>prev=val)
    }
    const renderRegistrationSection = ()=>{
        if(bodyTrigger){
            return (
                <div>
                    <div className="d-flex justify-content-center mb-3"><h3>Your shops</h3></div>
                    {children}
                    <AddButton onClickHandler={onClickHandler}/>                    
                </div>
                )
        }else{
            return <FadeIn duration={800} delay={250}><NewShopRegistration onClickHandler={onClickHandler} updateUserData={updateUserData}/></FadeIn> 
        }
    }
    return(
        <div >
            {renderRegistrationSection()}
        </div>
    )
}



const ShopRegistrationLayout = (props)=>{
    const [bodyTrigger, setBodyTrigger] = useState(true)
    const [user, setUser] = useState({})
    useEffect(()=>{
        // console.log('user before saved: ', props.user)
        setBodyTrigger(true)
        const userData = retrieveUserData();
        userData.then(res => {
            setUser(res);
        })
        .catch(error =>console.log('error:', error.message));
        // saveUserLocalStorage();
        // console.log(localStorage.getItem('user'))
        // setUser(JSON.parse(localStorage.getItem('user')))

        // localStorage.setItem('user', props.user );
        // console.log(JSON.parse(window.localStorage.getItem('user')))
        return ()=>{}
    },[])   

    const updateUserData = ()=>{
        const userData = retrieveUserData();
        userData.then(res => {
            setUser(res);
        })
        .catch(error =>console.log('error:', error.message));
    }

    const saveUserLocalStorage = ()=>{
        if(localStorage.getItem('user')==null){
            localStorage.setItem('user',JSON.stringify(props.user))
        }
    }

    const onClickHandler = (val)=>{
        
        setBodyTrigger((prev)=>prev=val)
    }
    const renderRegistrationSection = ()=>{
        
        if(bodyTrigger){
            return <NoShopRegistered onClickHandler={onClickHandler}/>
        }else{
            return <FadeIn duration={1000} delay={500}><NewShopRegistration onClickHandler={onClickHandler}/></FadeIn> 
        }
    }
    const renderShopRegistration =()=>{
        if(!Object.keys(user).includes('my_shops')){
            return <h3>...Loading</h3>
        }
        if(user.my_shops.length!=0){
            return <ShopCardWrapper updateUserData={updateUserData}>{user.my_shops.map((shop, idx)=><ShopCard  key={idx} shop={shop}/>)} </ShopCardWrapper>
            // <div><h3>Your shops</h3> {user.my_shops.map((shop, idx)=><ShopCard key={idx} shop={shop}/>)}</div>
        }else{
            return renderRegistrationSection()
        }
    }
    
    // console.log(JSON.parse(localStorage.getItem('user')))
    // console.log('My user: ', user)
    return(
    <div className={`container-fluid ${styles.container_wrapper}`}>
        <div className="row">
            <div className={`col-4 ${styles.left_panel}`}>
                <BrandPanel/>
            </div>
            <div className={`col-8 col-xs-12 col-xl-8 ${styles.right_panel}`}>
            {renderShopRegistration()}
            </div>
            
        </div>
    </div>
    )
}




export {
    ShopRegistrationLayout,
    AddButton
}