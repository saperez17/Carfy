class ServiceCard extends React.Component{
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
        async function fetchShopServices(){
            const res = await fetch("http://192.168.0.7:8000/api/v1/shop_service/");
            res.json()
            .then(res => {
                console.log(res)
            })
            .catch(err =>  {console.log(err)});
        }
        fetchShopServices();
    }
    render(){
        return(
       
                 <div className="card" style={{width: "18rem;"}}>
                            <img src="https://cdn.dribbble.com/users/2145559/screenshots/10415392/media/0fa2ed74268fd3352333d359484252e5.jpg?compress=1&resize=400x300" className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{this.state.serviceName}</h5>
                                <p className="card-text">{this.state.serviceDescription}</p>
                                <p>Price: <strong>{this.state.servicePrice}</strong></p>
                                <button onClick={this.bookService}>I want this</button>
                            </div>
                 </div>
        );
    }
    bookService = (event)=>{
        this.setState( state=> ({
            servicePrice : state.servicePrice+1000
        }));
    }
}
ReactDOM.render(<ServiceCard />, document.querySelector('#app'))