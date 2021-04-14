import './styles.css'
import NavLink from "../NavLink";

const TopNavBar = (props) => {
    return (
        <nav className='navbar navbar-expand-lg'>

            <a className='navbar-brand' href='#'>
                <p className='brand_p'>⚡Carfy</p>
            </a>

            <button 
                className='navbar-toggler' 
                type='button' 
                data-bs-toggle='collapse' 
                data-bs-target='#navbarNavDropdown'
                aria-controls='navbarNavDropdown'
                aria-expanded='false'
                aria-label='Toggle Navigation'
            >
                <span className='navbar-toggler-icon'>
                    <i className='fas fa-bars'></i>
                </span>
            </button>

            <div className='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'>
                <ul className='navbar-nav mr-auto'>
                    <li className='navItem'>
                        <NavLink>
                            <p>Truck</p>
                        </NavLink>
                    </li>

                    <li className='navItem'>
                        <NavLink>
                            <p>Car</p>
                        </NavLink>
                    </li>

                    <li className='navItem'>
                        <NavLink>
                            <p>Motorcycle</p>
                        </NavLink>
                    </li>

                    <li className='navItem'>
                        <NavLink>
                            <p>Log in</p>
                        </NavLink>
                    </li>

                    <li className='navItem'>
                        <NavLink>
                            <p>Sing in</p>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default TopNavBar