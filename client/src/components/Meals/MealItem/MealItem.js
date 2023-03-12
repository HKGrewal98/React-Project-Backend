import React , {useContext} from "react";
import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import mealContext from "../../../store/MealItemContext";

export default function MealItem(props){
 
    const ctx = useContext(mealContext)
    
    const onClickAmountHandler = (amount) => {
          const item = {
                 id : props.id,
                 name : props.name,
                 price : props.price.toFixed(2),
                 amount : amount
          }
        console.log(item)
        ctx.addItem(item)
    }
   
    const price = `$${props.price.toFixed(2)}`; 

    return (
            <li className={classes.meal}>
                <div>
                    <h3>{props.name}</h3>
                    <div className={classes.description}>{props.description}</div>
                    <div className={classes.price}>{price}</div>
                    </div>
                <div>
                    <MealItemForm id={props.id} onClickAmountHandler={onClickAmountHandler} reset={ctx.cartItems.length===0} />
                </div>
            </li>
    )
}