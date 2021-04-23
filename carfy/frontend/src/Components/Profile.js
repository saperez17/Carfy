import { divIcon } from "leaflet";
import React, { Component, useState, useEffect} from "react";
import styles from "./Profile.module.scss";

const ProfileCard = (props)=>{
    return(
        <div>
            <div className={styles.card}>
                <div className={styles.card_body}>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src={props.imgLogo?props.imgLogo:'https://bootdey.com/img/Content/avatar/avatar7.png'} alt="Admin" className="rounded-circle" width={props.width?props.width:"150"}/>
                    <div className="mt-3">
                      <h4>{props.dataObject.mainHeader}</h4>
                      <p className="text-secondary mb-1">{props.dataObject.substring1}</p>
                      <p className="text-muted font-size-sm"> {props.dataObject.substring2}, {props.dataObject.substring3}</p>
                      {/* <button className="btn btn-primary">Follow</button>
                      <button className="btn btn-outline-primary">Message</button> */}
                    </div> 
                  </div>
                </div>
            </div>
        </div>
    )
}

const ProfileSocialMedia= ()=>{
    return(
        <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-globe mr-2 icon-inline"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>Website</h6>
                    <span className="text-secondary">https://bootdey.com</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github mr-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                    <span className="text-secondary">bootdey</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter mr-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                    <span className="text-secondary">@bootdey</span>
                  </li>
                </ul>
        </div>
    )
}

const ProfileInfo = (props)=>{
  const renderData = Object.keys(props.dataObject).map((key,i)=>{
    return (
      <div key={i}>
      <div className="row">
        <div className="col-sm-3">
          <h6 className="mb-0">{key.at(0).toUpperCase()+key.slice(1)}</h6>
        </div>
        <div className="col-sm-9 text-secondary">
          {props.dataObject[key]}
        </div>
      </div>
      <hr/>
      </div>
    )
});
    return(
        <div className="card mb-3">
                <div className="card-body">
                  {renderData}
                </div>
            </div>          
    )
}

const ProfileStats = ()=>{
    return(
        <div className="card h-100">
                    <div className="card-body">
                      <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Project Status</h6>
                      <small>Web Design</small>
                      <div className="progress mb-3" style="height: 5px">
                        <div className="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Website Markup</small>
                      <div className="progress mb-3" style="height: 5px">
                        <div className="progress-bar bg-primary" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>One Page</small>
                      <div className="progress mb-3" style="height: 5px">
                        <div className="progress-bar bg-primary" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Mobile Template</small>
                      <div className="progress mb-3" style="height: 5px">
                        <div className="progress-bar bg-primary" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <small>Backend API</small>
                      <div className="progress mb-3" style="height: 5px">
                        <div className="progress-bar bg-primary" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </div>
        </div>
    )
}

const ProfileLayout = (props)=>{
    useEffect(()=>{
        console.log(props)
    },[])
    return(
        <div className="container mt-5 pt-3">
            <div className="main-body">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <ProfileCard dataObject={{mainHeader:props.user.user, substring1:'Full-Stack Developer', substring2: props.user.city, substring3:props.user.country}}/>
                        {/* username={props.user.user} city={props.user.city} country={props.user.country} */}
                        <ProfileSocialMedia/>
                    </div>
                    <div className="col-md-8">
                        <ProfileInfo dataObject={{fullname:props.user.user,email:props.user.email,address:props.user.address,phone:'+57 314968547'}}/>
                    </div>
                </div>
                
            
            </div>
    </div>
    )
}

export {
    ProfileLayout,
    ProfileInfo,
    ProfileCard
}





