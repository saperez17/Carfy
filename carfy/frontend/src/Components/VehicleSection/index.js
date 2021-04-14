import VehicleDetail from '../VehicleDetail'

import './styles.css'

// Layout
const VehicleSection = () => {
    return (
        <section id='service' className='services'>
            <ul>
                <li>
                    <VehicleDetail 
                        title='Truck'
                        imgUrl='https://cdn.vox-cdn.com/thumbor/dXnH-ySPU85VXbzb9YOQE3Ac9sw=/0x0:4243x3079/1400x933/filters:focal(1783x1201:2461x1879):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/65022936/TuSimple_Self_Drving_Truck_4_copy.0.jpg' 
                        alt='Truck'
                        textContent='neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis
                        nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu'
                        txtButton='Request'
                    />
                </li>

                <li>
                    <VehicleDetail 
                        title='SUV'
                        imgUrl="https://t1-cms-3.images.toyota-europe.com/toyotaone/gben/854x480_Best%20SUVs_tcm-3060-1225584.jpg"
                        alt='SUV car'
                        textContent='neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis
                        nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu'
                        txtButton='Request'
                    />
                </li>

                <li>
                    <VehicleDetail 
                        title='Electric'
                        imgUrl="https://img.freepik.com/free-vector/electric-car-concept-illustration_114360-927.jpg?size=626&ext=jpg"
                        alt='Electric Car'
                        textContent='neque egestas congue quisque egestas diam in arcu cursus euismod quis viverra nibh cras pulvinar mattis
                        nunc sed blandit libero volutpat sed cras ornare arcu dui vivamus arcu'
                        txtButton='Request'
                    />
                </li>
            </ul>
        </section>
    )
}

export default VehicleSection