import classes from './CartItem.module.css';
import React from 'react';


const CartItem = (props) => {
  const price = `$${parseFloat(props.price).toFixed(2)}`;
  // const ctx = useContext(mealContext)

  // const onAdd = () => {
         
  //   let newAmount = +props.amount + 1
  //   if(newAmount>10){
    
  //     alert("Maximum order amount for a meal is 10.")

  //   }else{
     
  //     const item = {
  //         id : props.id,
  //         name : props.name,
  //         price : props.price,
  //         amount : newAmount
  //     }
  //     ctx.addItem(item)
  //   }
  // }

  // const onRemove = () => ctx.removeItem(props.id)

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.removeItem}>−</button>
        <button onClick={props.addItem}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
