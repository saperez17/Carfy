import React from "react";
import styles from './styles.module.css'

const NavLink = props => {
    return (
        <a className={styles.NavLink} href=''>
            {props.children}
        </a>
    )
}

export default NavLink