import React, { Component, useState, useEffect} from "react";
import styles from "./ShopRegistration.module.scss";

const HeaderMessage = ()=>{
    return(
        <div className={`${styles.header_message}`}>
            <h2>Ops, you dont have any shop yet</h2>
            <p>Shops are the virtual presence of your physical or virtual service in Carfy.
                With shops you can start offering services to customers.</p>
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

const BrandPanel =()=>{
    return(
        <div className={`${styles.brand_panel}`}>
            <div>⚡</div>
            <h2>Carfy</h2>
            <p>EXPLORE MORE, WORRY LESS</p>
        </div>
    )
}

const ShopRegistrationLayout = ()=>{
    return(
    <div className={`container-fluid ${styles.container_wrapper}`}>
        <div className="row">
            <div className={`col-4 ${styles.left_panel}`}>
                <BrandPanel/>
            </div>
            <div className={`col-8 col-xs-12 col-xl-8 ${styles.right_panel}`}>
                <HeaderMessage/>
                <div className={`${styles.intructions_wrapper}`}>
                    <StepInstruction stepNum={1} stepTitle={'Create Shop'} stepTxt={'Your shop represents your business in Carfy. '}/>
                    <StepInstruction stepNum={2} stepTitle={'Add services'} stepTxt={'Each shop can offer one or multiple services wich customers can request.'}/>
                    <StepInstruction stepNum={3} stepTitle={'Serve & Earn'} stepTxt={'Done! You can start attending your customer requests and earn revenue in the process.'}/>
                </div>
            </div>
        </div>
    </div>
    )
}

export {
    ShopRegistrationLayout
}