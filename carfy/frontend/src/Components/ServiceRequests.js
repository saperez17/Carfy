import React, { useEffect, useState } from 'react';
import styles from './ServiceRequests.module.scss';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'COP',
  });
  function formatCurrency(value){
    return formatter.format(value)
  }

  

const Header = ()=>{
    return(
        <>
       <div className="px-4 px-lg-0 text-dark">
        <div className="container text-white py-5 text-center">
          <h1 className="display-4 text-dark">My Orders</h1>
          <p className="lead mb-0 text-dark">Here you can keep track of your service requests</p>
        </div>
        </div>
      </>
    )
}

const ItemField = (props)=>{
    return(
        <>
        <label className="text-black-50 mb-0">{props.label}</label>
        <p>{props.value}</p>
        </>
    )
}

const OrderItem = ()=>{
    return(
        <div className={`p-4 mb-2 border-0 ${styles.itemWrapper}`}>
            <div className="d-flex align-items-center justify-content-center"><div className={`${styles.imgContainer}`}></div></div>
            <div>
                <h3 className="d-flex justify-content-center">Service</h3>
                <div className={`pl-2 ${styles.dataFieldLayout}`}>
                    <div className={`${styles.field1}`}>
                        <ItemField label="name" value="Car Wash"/>
                    </div>
                    <div className={`${styles.field2}`}>
                        <ItemField label="includes" value="Dry cleaning"/>
                    </div>
                    <div className={`${styles.field4}`}>
                        <ItemField label="price" value="COP 15,000"/>
                    </div>
                </div>
            </div>
            <div className="providerInfo">
                <h3 className="d-flex justify-content-center">Provider</h3>
                <div className={`pl-2 ${styles.dataFieldLayout}`}>
                    <div className={`${styles.field1}`}>
                        <ItemField label="name" value="Super Cars"/>
                    </div>
                    <div className={`${styles.field2}`}>
                        <ItemField label="location" value="Street 25#56-1"/>
                    </div>
                    <div className={`${styles.field3}`}>
                        <ItemField label="contact" value="+57 3148853032"/>
                    </div>
                </div>
            </div>
            <div className="sideOptionsWrapper">
                <h3>Opt</h3>
            </div>
        </div>
    )
}

const RequestsLayout = ()=>{
    return(
        <>
        <Header/>
            <div className="pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 p-5 rounded shadow-sm mb-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className={`py-2 text-uppercase `}><button className="btn btn-primary">Accepted</button></div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase"><button className="btn btn-primary">Requested</button></div>
                                            </th>
                                            <th scope="col" className="border-0 bg-light">
                                                <div className="py-2 text-uppercase"><button className="btn btn-primary">Completed</button></div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                    <th scope="row" className="border-0" colSpan="3">
                                       <OrderItem/>
                                       
                                       {/* <div className="p-2">
                                            <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg"
                                                alt="" width="70" className="img-fluid rounded shadow-sm" />
                                            <div className="ml-3 d-inline-block align-middle">
                                                <h5 className="mb-0"> <a href="#"
                                                        className="text-dark d-inline-block align-middle">Car Wash</a>
                                                </h5><span
                                                    className="text-muted font-weight-normal font-italic d-block">Category:
                                                    Watches</span>
                                            </div>
                                        </div> */}

                                    </th>
                                  </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export {RequestsLayout}