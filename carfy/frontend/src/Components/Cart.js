import React, { useEffect, useState } from 'react';
import styles from './Cart.module.scss';
import {Link, useLocation} from 'react-router-dom';
import {getUserServiceRequests, updateServiceRequests, updateDeleteData} from './utilities/network'

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'COP',
});
function formatCurrency(value){
  return formatter.format(value)
}

const CartItem = ()=>{
  
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'COP',
      });
    return(
        <>
            <th scope="row" className="border-0">
            <div className="p-2">
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg" alt="" width="70" className="img-fluid rounded shadow-sm" />
            <div className="ml-3 d-inline-block align-middle">
                <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{props.service_name}</a></h5><span className="text-muted font-weight-normal font-italic d-block">Category: Watches</span>
            </div>
            </div>
        </th>
        <td className="border-0 align-middle"><strong>${formatter.format(props.price)}</strong></td>
        <td className="border-0 align-middle"><strong>{props.quantity}</strong></td>
        <td className="border-0 align-middle"><a href="#" className="text-dark"><i className="fa fa-trash"></i></a></td>
      </>
    )
}

const ShoppingCartItem = (props)=>{
  console.log(props);
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'COP',
  });
 
  const loading = ()=>{
    return <div>Loading..</div>
  }
  return(   
    <tr>
      {Object.keys(props.item).length==0 ? loading():(
      <>
        <th scope="row" className="border-0">
          <div className="p-2">
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg" alt="" width="70"
              className="img-fluid rounded shadow-sm" />
            <div className="ml-3 d-inline-block align-middle">
              <h5 className="mb-0"> <a href="#"
                  className="text-dark d-inline-block align-middle">{props.item.service.service_name}
                </a></h5><span className="text-muted font-weight-normal font-italic d-block">{`Category:
                ${props.item.service.target_automobile} `}</span>
            </div>
          </div>
        </th>
        <td className="border-0 align-middle"><strong>{formatter.format(props.item.service.price)}</strong></td>
        <td className="border-0 align-middle"><strong>1</strong></td>
        <td className="border-0 align-middle"><button className={styles.emptyStyle} onClick={()=>props.removeClickHandler(props.item)}><i className="fa fa-trash"></i></button></td>
      </>
      )}
    </tr>
    
  )
}

const OrderSummary = ({items, postHandler},props)=>{
  const [summary, setSummary] = useState({subtotal:0, additionalCosts:0, tax:0, total:0})
  useEffect(()=>{
    let subTotal = 0;
    let total = 0;
    items.forEach((item)=>{
      console.log('item xx', item);
      if (item.status=="UN"){
        subTotal += parseFloat(item.service.price)
      }
      
    })
    
    setSummary((prevState)=>(
      {
        ...prevState,
        total:total + subTotal,
        subtotal: subTotal
      }
    ))
  },[items])
  return(
    <>
      <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
      <div className="p-4">
        <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
        <ul className="list-unstyled mb-4">
          <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Order
              Subtotal </strong><strong>{formatCurrency(summary.subtotal)}</strong></li>
          <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Shipping and
              handling</strong><strong>{formatCurrency(summary.additionalCosts)}</strong></li>
          <li className="d-flex justify-content-between py-3 border-bottom"><strong
              className="text-muted">Tax</strong><strong>{formatCurrency(summary.tax)}</strong></li>
          <li className="d-flex justify-content-between py-3 border-bottom"><strong
              className="text-muted">Total</strong>
            <h5 className="font-weight-bold">{formatCurrency(summary.total)}</h5>
          </li>
        </ul><button href="#" className="btn btn-dark rounded-pill py-2 btn-block" onClick={()=>postHandler()}>Procceed to checkout</button>
      </div>
    </>
  )
}

const Modal = (props)=>{
  return(
    <>
    <div className="modal" id="modal">
    <h2>Modal Window</h2>
    <div className="content">"empty"</div>
    <div className="actions">
      <button className="toggle-button" onClick={props.onClose}>
        close
      </button>
    </div>
  </div>
  </>
  )
}



const ShoppingCart = () =>{
  const [cartItems, setCartItems] = useState({items:[]})
  useEffect(()=>{
    fetchRequests()
  },[])

  const fetchRequests = ()=>{
    const penServices = getUserServiceRequests();
    penServices.then(res=>{
      let itemsCopy = cartItems.items.slice()
      itemsCopy = res.filter((item)=>item.status=="UN")
      // itemsCopy = itemsCopy.concat(res)
      setCartItems((prevStat)=>({
        ...prevStat,
        items:itemsCopy
      }))
      
    })
    .catch(error=>console.log(error.message))
  }

  const postServices = ()=>{
    let items = cartItems.items.slice();
    let ids = [];
    items.forEach(x => ids.push(x.id));
    let status = "PAID"; //Update service requests status to PA
    const postService = updateServiceRequests(ids, status);
    postService.then(res=>{
      let itemsCopy = cartItems.items.slice();
      itemsCopy.forEach((x)=>x.status="PA")
      // itemsCopy = itemsCopy.concat(res)
      setCartItems((prevStat)=>({
        ...prevStat,
        items:[]
      }))
    })
    .catch(error=>console.log(error.message))
  }

  const removeCartItem = (item)=>{
    console.log(item);
    let endpoint = `/service-request/${item.id}`
    let method = 'DELETE'

    const deleteRequest = updateDeleteData(endpoint, method);
    deleteRequest.then(res=>{
      console.log(res)
      let itemsCopy = cartItems.items.slice();
      let index = cartItems.items.findIndex((x)=>x.id==item.id)
      itemsCopy.splice(index,1);
      setCartItems((prevStat)=>({
        ...prevStat,
        items:itemsCopy
      }))
    })
    .catch(error=>console.log(error.message))
  }

 
  // console.log(cartItems)
    return(
        <div className="px-4 px-lg-0 text-dark">
        <div className="container text-white py-5 text-center">
          <h1 className="display-4 text-dark">Shopping cart</h1>
          <p className="lead mb-0 text-dark">This is your service request summary </p>
          {/* <p className="lead">Snippet by <a href="https://bootstrapious.com/snippets" className="text-white font-italic">
                  <u>Bootstrapious</u></a>
          </p> */}
        </div>
      
        <div className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Product</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Quantity</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Remove</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.items.length!=0?
                        cartItems.items.map((item, idx)=><ShoppingCartItem item={item} key={idx} removeClickHandler={removeCartItem}/>):<tr><td colSpan="4"><p>Your shopping cart is empty</p></td></tr> 
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
      
            <div className="row py-5 p-4 bg-white rounded shadow-sm">
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                <div className="p-4">
                  <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                  <div className="input-group mb-4 border rounded-pill p-2">
                    <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0"/>
                    <div className="input-group-append border-0">
                      <button id="button-addon3" type="button" className="btn btn-dark px-4 rounded-pill"><i className="fa fa-gift mr-2"></i>Apply coupon</button>
                    </div>
                  </div>
                </div>
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                <div className="p-4">
                  <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                  <textarea name="" cols="30" rows="2" className="form-control"></textarea>
                </div>
              </div>
              <div className="col-lg-6">
                <OrderSummary items={cartItems.items} postHandler={postServices}/>
              </div>
            </div>
      
          </div>
        </div>
      </div>
        
    )
}

const Cart = ()=> {
  const locatedStyle = ()=>{
    let location = useLocation()
    let isLandingPage = location.pathname=='/carfy/'||location.pathname=='/carfy'
    let allClassNames = isLandingPage?`${styles.cartStyle}`:`${styles.cartStyle2}`
    return <span className={`${allClassNames}`}><i className="fas fa-shopping-cart"></i></span>
  }
    return (
        <div>
            <div className={`dropdown ${styles.centerContent}`}>
                <button className={`btn btn-circle-lg dropdown-toggle ${styles.btnSizing}`} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=>props.onClickHandler(false)}>
                   {locatedStyle()}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link to="/carfy/cart" className="dropdown-item" >Shopping cart</Link></li>
                    {/* <li><a className="dropdown-item" href="#">Another action</a></li> */}
                    {/* <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
            </div>
        </div>
    )
}

export {Cart,
        ShoppingCart}
