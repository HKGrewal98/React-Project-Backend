import React, { useContext, useState, useEffect } from "react";
import mealContext from "../../store/MealItemContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart(props) {
  const ctx = useContext(mealContext);

  const [showConfirmForm, setShowConfirmForm] = useState(false);
  // const [billAmount, setBillAmount] = useState(0);

  // useEffect(() => {
  //   setBillAmount(ctx.totalAmount);
  // }, [showConfirmForm]);

  const hasItems = ctx.cartItems.length !== 0;

  const addItem = (item) => {
    item.amount = +item.amount + 1;
    if (+item.amount > 10) {
      alert("Maximum order amount for a meal is 10.");
    } else {
      ctx.addItem(item);
    }
  };

  const removeItem = (id) => ctx.removeItem(id);

  const cartItems = (
    <ul>
      {ctx.cartItems.map((meal) => (
        <CartItem
          key={meal.id}
          id={meal.id}
          name={meal.name}
          price={meal.price}
          amount={meal.amount}
          addItem={addItem.bind(null, meal)}
          removeItem={removeItem.bind(this, meal.id)}
        />
      ))}
    </ul>
  );

  const clickHandler = () => props.disableCart();

  return (
    <Modal disableCart={clickHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{ctx.totalAmount}</span>
      </div>

      {showConfirmForm && <Checkout onCancel={clickHandler} />}

      {!showConfirmForm && (
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={clickHandler}>
            Close
          </button>
          {hasItems && (
            <button
              className={classes.button}
              onClick={() => setShowConfirmForm(true)}
            >
              Order
            </button>
          )}
        </div>
      )}
    </Modal>
  );
}

// ctx.cartItems.map(meal => {
//     return  <ul className={classes['cart-items']} key={meal.id}>
//           <li>{meal.name}</li>
//           <li>{meal.description}</li>
//           <li>{meal.price}</li>
//     </ul>
//  })
