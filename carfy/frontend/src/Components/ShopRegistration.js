import React, { Component, useState, useEffect} from "react";
import styles from "./ShopRegistration.module.scss";
import BussinessShopLogo from '../assets/business_shop.svg'
import styled, { keyframes } from 'styled-components'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

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
    duration = 300,
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
    return(
        <div>
            <GeneralInfoWrapper>
                <div>
                    <button className="btn btn-outline-primary" onClick={()=>{props.onClickHandler(true)}}>{`<-`}</button>
                    <h3>General shop info</h3>
                    <div className="mb-3">
                        <label for="shopName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="shopName" placeholder="Shop name"/>
                    </div>
                    <div className="mb-3">
                        <label for="shopSlogan" className="form-label">Slogan</label>
                        <input type="text" className="form-control" id="shopSlogan" placeholder="Shop slogan"/>
                    </div>
                </div>
                <div>
                    <h3>Shop Pic</h3>
                    <div className="mb-3">
                        <label for="formImageFile" className="form-label">Upload shop profile image</label>
                        <input className="form-control" type="file" id="formImageFile"/>
                    </div>
                </div>
            </GeneralInfoWrapper>
            <LocationInfoWrapper>
                <h2>Location</h2>
                <div className="mb-3">
                    <label for="selectCountry" className="form-label">Country</label>
                    <select className="form-select" aria-label="Default select example" id="selectCountry" placeholder="Hi">
                        <option value="" selected disabled>Choose a country</option>
                        <option value="1">Colombia</option>
                        <option value="2">Brasil</option>
                        <option value="3">US</option>
                    </select>
                </div>
                <label for="selectCity" className="form-label">City</label>
                <select className="form-select" aria-label="Default select example" id="selectCity">
                    <option value="" selected disabled>Choose a city</option>
                    <option value="1">Sao Paulo</option>
                    <option value="2">Popayan</option>
                    <option value="3">Medellin</option>
                </select>
                <div className="d-flex">
                    <div className="mb-3">
                        <label for="shopLong" className="form-label">Longitude</label>
                        <input type="number" className="form-control" id="shopLong" placeholder="Shop longitude"/>
                    </div>
                    <div className="mb-3">
                        <label for="shopLat" className="form-label">Latitude</label>
                        <input type="number" className="form-control" id="shopLat" placeholder="Shop latitude"/>
                    </div>
                </div>
                <ShopMap/>
                <button className="btn btn-primary">Create Shop</button>
            </LocationInfoWrapper>

        </div>
    )
}

const ShopRegistrationLayout = ()=>{
    const [bodyTrigger, setBodyTrigger] = useState(true)
    useEffect(()=>{setBodyTrigger(true)},[])
    const onClickHandler = (val)=>{
        setBodyTrigger((prev)=>prev=val)
        // setBodyTrigger((prev)=>prev==false?true:true)
        // setBodyTrigger(true)
    }
    const renderRegistrationSection = ()=>{
        if(bodyTrigger){
            return <NoShopRegistered onClickHandler={onClickHandler}/>
        }else{
            return <FadeIn duration={1000} delay={500}><NewShopRegistration onClickHandler={onClickHandler}/></FadeIn> 
        }
    }
    return(
    <div className={`container-fluid ${styles.container_wrapper}`}>
        <div className="row">
            <div className={`col-4 ${styles.left_panel}`}>
                <BrandPanel/>
            </div>
            <div className={`col-8 col-xs-12 col-xl-8 ${styles.right_panel}`}>
            {renderRegistrationSection()}
           {/* previous section */}
            </div>
        </div>
    </div>
    )
}

export {
    ShopRegistrationLayout
}