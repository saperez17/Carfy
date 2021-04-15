import React from "react";
import './styles.css'

const VehicleDetail = (props) => {
    return(
        <div>
            <figure>
                <img src={props.imgUrl}
                     alt={props.alt} />

                <figcaption>
                    <h3>{props.title}</h3>
                </figcaption>
            </figure>

            <p>
                {props.textContent}
            </p>
            <a href=''>{props.txtButton}</a>
        </div>
    )
}

export default VehicleDetail