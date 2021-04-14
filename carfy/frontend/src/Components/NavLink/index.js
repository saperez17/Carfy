import './styles.css'

const NavLink = props => {
    return (
        <a className='navLink' href=''>
            {props.children}
        </a>
    )
}

export default NavLink