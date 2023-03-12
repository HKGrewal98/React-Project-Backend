import React,{useContext,useEffect,useState} from "react"
import mealContext from "../../store/MealItemContext"
import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {

 const ctx = useContext(mealContext) 
 
 const [bump,setBump] = useState(false)

 const cartCount = ctx.cartItems.reduce((currNum,item)=>{
    return currNum + parseInt(item.amount)
 },0)

const clickHandler = () => props.showCart()

const btnClasses = `${classes.button} ${bump ? classes.bump : ''}`

const {cartItems} = ctx

useEffect(()=>{
 
    if(cartItems.length === 0){
        return;
    }
       setBump(true)
       const timer =  setTimeout(()=>setBump(false),300)
    
       return () => {
         clearTimeout(timer)
       }
},[cartItems])

return (
    <button className={btnClasses} onClick={clickHandler}>
        <span className={classes.icon}>
             <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{cartCount}</span>
    </button>
)

}

export default HeaderCartButton