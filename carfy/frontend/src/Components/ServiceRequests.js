import React, { useEffect, useState } from 'react';
import styles from './ServiceRequests.module.scss';
import {fetchData} from '../Components/utilities/network';
import Fade from 'react-reveal/Fade';

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
        <p className="fs-6 text-black-50 mb-0">{props.label}</p>
        <p className={styles.clipText}>{props.value}</p>
        </>
    )
}

const OrderItem = (props)=>{
    // console.log(props);
    return(
        <Fade left cascade>
        <div className={`p-0 mb-2 border-0 ${styles.itemWrapper}`}>
            <div className="d-flex align-items-center justify-content-center pl-2"><div className={`${styles.imgContainer}`}></div></div>
            <div className="pt-2 pb-2">
                <h4 className="d-flex justify-content-center">Service</h4>
                <div className={`pl-2 ${styles.dataFieldLayout}`}>
                    <div className={`${styles.field1}`}>
                        <ItemField label="name" value={props.order.service.service_name}/>
                    </div>
                    <div className={`${styles.field2}`}>
                        <ItemField label="includes" value={props.order.service.services}/>
                    </div>
                    <div className={`${styles.field4}`}>
                        <ItemField label="price" value={formatCurrency(props.order.service.price)}/>
                    </div>
                </div>
            </div>
            <div className="providerInfo pt-2 pb-2">
                <h4 className="d-flex justify-content-center">Provider</h4>
                <div className={`pl-2 ${styles.dataFieldLayout}`}>
                    <div className={`${styles.field1}`}>
                        <ItemField label="name" value={props.order.service.provider.shop_name}/>
                    </div>
                    <div className={`${styles.field2}`}>
                        <ItemField label="location" value={props.order.service.provider.city}/>
                    </div>
                    <div className={`${styles.field3}`}>
                        <ItemField label="owner" value={props.order.service.provider.owner}/>
                    </div>
                </div>
            </div>
            <div className={`${styles.sideOptionsWrapper}`}>
                <div>
                    <p>Open</p>
                </div>
            </div>
        </div>
        </Fade>
    )
}

const CustomButtom = (props) =>{
    useEffect(()=>{
        
    },[])
    return(
        <div className={`py-2 text-uppercase d-flex justify-content-center`}>
            <button className={`btn btn-primary rounded-3 ${styles.customBtn} ${props.active?styles.btnActive:styles.btnIdle}`} onClick={()=>props.clickHandler(props.filterStatus)}>
                <p>{props.label}</p>
            </button>
        </div>
    )
}

const RequestsLayout = ()=>{
    const [items, setItems] = useState([])
    const [navStatus, setNavStatus] = useState({filterType:"ACC", activeFilter:[true,false,false]})

    useEffect(()=>{
        const URL = "/customer/requests/"
        const service = fetchData(URL)
        .then(res => {
            setItems(res)
        })
        .catch(error => console.log('error:', error.message));
    },[])

    const loading = ()=>{
        return(<div>loading...</div>)
    }
    const clickHandler = (filterValue)=>{
        let activeFilterCopy = navStatus.activeFilter.slice();
        filterValue=="ACC"?activeFilterCopy=[true,false,false]:filterValue=="PA"?activeFilterCopy=[false,true,false]:activeFilterCopy=[false,false,true]
        setNavStatus((prevValue)=>(
            {
                ...prevValue,
                filterType:filterValue,
                activeFilter:activeFilterCopy,
            }
        ))
    }
    return(
        <>
        <Header/>
            <div className="pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 p-1 rounded shadow-sm mb-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr className="d-flex justify-content-center">
                                            <th scope="col" className="border-0">
                                                <CustomButtom label="Accepted" active={navStatus.activeFilter[0]} clickHandler={clickHandler} filterStatus={"ACC"}/>
                                            </th>
                                            <th scope="col" className="border-0 ">
                                                <CustomButtom label="Requested" active={navStatus.activeFilter[1]} clickHandler={clickHandler} filterStatus={"PA"}/>
                                            </th>
                                            <th scope="col" className="border-0 ">
                                            <CustomButtom label="Completed" active={navStatus.activeFilter[2]} clickHandler={clickHandler} filterStatus={"COM"}/>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>       
                                        <th scope="row" className="border-0" colSpan="3">
                                            {items.length==0?loading():(items.filter((item)=>item.status==navStatus.filterType).map((item, key)=>(<OrderItem key={key} order={item}/>)))}
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