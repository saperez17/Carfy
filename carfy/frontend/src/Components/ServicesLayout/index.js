import ServiceCard from '../ServiceCard'

const ServicesLayout = () => {
    return(
        <div className='container'>
            <div className='row row-cols-sm-1 row-cols-sm-2 
                            row-cols-md-3 justify-content-sm-center'>
                <div className='col-xxl-3 mb-1'>
                    <section>
                        <ServiceCard />
                    </section>
                </div>
            </div>

            <div className='col-xxl-3'>
                <section>
                    {/* <ServiceCard /> */}
                </section>
            </div>
        </div>
    )
}

export default ServicesLayout