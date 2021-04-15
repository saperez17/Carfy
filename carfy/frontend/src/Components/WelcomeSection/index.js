import React from "react";
import './styles.module.css'

const WelcomeSection = () => {
    return (
        <div>
            <div>
                <h3 className='heading main_heading'>erat velit scelerisque in dictum</h3> 
                <p className='heading'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt
                    <br />
                    ut labore et dolore magna aliqua. Fermentum dui faucibus in ornare quam.
                </p>
            </div>

            <div className='dropdown'>
                <button className='btn btn-primary dropdown-toggle'
                        type='button'
                        id='dropdownMenuButton'
                        data-bs-toggle='dropdown'
                        aria-expanded='false'>

                    Choose your city

                </button>
                <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                    <li><a className='dropdown-item' href='#'> Popayan </a></li>
                    <li><a className='dropdown-item' href='#'> Cali </a></li>
                    <li><a className='dropdown-item' href='#'> Pasto </a></li>
                </ul>
            </div>
        </div>
    )
}

export default WelcomeSection