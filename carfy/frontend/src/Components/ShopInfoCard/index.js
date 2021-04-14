import './styles.css'

const ShopInfoCard = () => {
    return (
        <div>
            <div>
                <h4>Shop Name</h4>
                <h6>Category</h6>

                <div>
                    ⭐⭐⭐
                </div>
                Price 💰
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Numquam, sapiente illo. Sit error voluptas repellat rerum quidem, 
                    soluta enim perferendis voluptates laboriosam. 
                </p>

                <hr/>

                <h5> Car Category </h5>
                <ul>
                    <li>
                        SUV
                    </li>
                    <li>
                        EV
                    </li>
                </ul>

                <h5> Service </h5>
                <ul>
                    <li>
                        Oil Change
                    </li>
                    <li>
                        Wheel alignment
                    </li>
                </ul>
            </div>

            <h5>Location</h5>
            <p>Popayan</p>
            <hr/>

        </div>
    )
}

export default ShopInfoCard