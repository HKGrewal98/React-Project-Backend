import {Fragment} from "react";
import mealsImage from '../../assests/meals.jpg'
import MainNavigation from "../UI/MainNavigation";
import classes from './Header.module.css'
import HeaderCartButton from "./HeaderCartButton";
import { useEffect , useState} from "react";

const Header = props => {
   
    const clickHandler = () => props.showCart()
    const [title,setTitle] = useState("");

    async function fetchTitle(){

        const response = await fetch(`/menu/title`,{
                headers:{
                    "Content-type":"application/json",
                    'Access-Control-Allow-Origin':'*',
                    "Accept": 'application/json'
                }
            })
        const result = await response.json()
        console.log(result)
        setTitle(result.name)
    }

    useEffect(()=>{
          fetchTitle()
    },[])
    
   return (
    <Fragment>
        <header className={classes.header}>
            <h1>{title}</h1>
            <MainNavigation/>
            <HeaderCartButton showCart={clickHandler} />
        </header>
             
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="A table full of delicious food :)."/>
        </div>
    </Fragment>
   )
}

export default Header 