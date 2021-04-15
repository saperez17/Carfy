import { useState, useEffect } from 'react'

const ServiceCard = () => {
    [cards, setCards] = useState({
        serviceName: 'Oil Change Premium',
        serviceDescription: 'The best and most affordable local Oil Change!',
        serviceTarget: '',
        servicePrice: '',
        serviceRemote: false,
        serviceList: []
    })

    const bookService = index => {
        const selectedService = [...cards]
        
    }

    return (
        <div className='card' style={{width: '18rem'}}>
            <img src="https://cdn.dribbble.com/users/2145559/screenshots/10415392/media/0fa2ed74268fd3352333d359484252e5.jpg?compress=1&resize=400x300" 
            className="card-img-top" 
            alt="..." 
            />
            <div className='card-body'>
                <h5 className='card-title'>{serviceName}</h5>
                <p className='card-text'>{serviceDescription}</p>
                <p>Price: <strong>{servicePrice}</strong></p>
                <button onClick={bookService}>I wan this</button>
            </div>

        </div>
    )
}

export default ServiceCard