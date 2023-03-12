import classes from './MainNavigation.module.css'
import { NavLink } from 'react-router-dom'

 export default function MainNavigation(){
     
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li><NavLink to="/ottomonMenu"  className={(isActive)=> isActive ? classes.active : undefined} end>Menu</NavLink></li>
                    <li><NavLink to="/ottomons" className={(isActive)=> isActive ? classes.active : undefined}>About</NavLink></li>
                    <li><NavLink to="/ottomons/reviews" className={(isActive)=> isActive ? classes.active : undefined}>Reviews</NavLink></li>
                    <li><NavLink to="/ottomons/contactus" className={(isActive)=> isActive ? classes.active : undefined}>Contact Us</NavLink></li>
                </ul>
            </nav>
        </header>
    )
     
 }