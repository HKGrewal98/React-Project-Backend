import React from "react";
import classes from "./Checkout.module.css";
import { useRef, useState, useContext } from "react";
import mealContext from "../../store/MealItemContext";
import { AddressContext } from "../../store/AddressContext";
import { useNavigate } from "react-router-dom";

const Checkout = (props) => {
  const ctx = useContext(mealContext);
  const addressCtx = useContext(AddressContext);
  const navigate = useNavigate();

  const [formValidity, setFormValidity] = useState({
    houseNo: true,
    street: true,
    postal: true,
    city: true,
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const houseNoRef = useRef();
  const streetRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const isEmpty = (value) => value.trim() === "";
  const isSixChars = (value) => value.trim().length === 7 ||  value.trim().length === 6;

  const confirmHandler = (event) => {
    setSuccessMessage(null);
    event.preventDefault();
    const enteredhouseNo = houseNoRef.current.value;
    const enteredStreet = streetRef.current.value;
    const enteredPostal = postalRef.current.value;
    const enteredCity = cityRef.current.value;

    const ishouseNoValid = !isEmpty(enteredhouseNo);
    const isEnteredStreetValid = !isEmpty(enteredStreet);
    const isEnteredPostalValid = isSixChars(enteredPostal);
    const isEnteredCityValid = !isEmpty(enteredCity);

    setFormValidity({
      houseNo: ishouseNoValid,
      street: isEnteredStreetValid,
      postal: isEnteredPostalValid,
      city: isEnteredCityValid,
    });

    const isFormValid =
      ishouseNoValid &&
      isEnteredStreetValid &&
      isEnteredPostalValid &&
      isEnteredCityValid;

    if (isFormValid) {
      addressCtx.setOrderAddress(enteredhouseNo,enteredStreet,enteredPostal,enteredCity)
      navigate("/ottomons/payment");
      return;
    }
  };

  const onBeforeInputHandler = (event) => {
    const key = event.target.id;
    let newFormState = { ...formValidity };
    if (key in formValidity) {
      newFormState[key] = true;
    }
    setFormValidity(newFormState);
  };

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div
          className={`${classes.control} ${
            formValidity.houseNo ? "" : classes.invalid
          }`}
        >
          <label htmlFor="houseNo">Your House Number</label>
          <input
            type="text"
            id="houseNo"
            defaultValue={addressCtx.getOrderAddress().houseNo}
            ref={houseNoRef}
            onBeforeInput={onBeforeInputHandler}
          />
          {!formValidity.houseNo && <p>Please enter a valid house number!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.street ? "" : classes.invalid
          }`}
        >
          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            defaultValue={addressCtx.getOrderAddress().street}
            ref={streetRef}
            onBeforeInput={onBeforeInputHandler}
          />
          {!formValidity.street && <p>Please enter a valid street!</p>}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.postal ? "" : classes.invalid
          }`}
        >
          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            ref={postalRef}
            defaultValue={addressCtx.getOrderAddress().postal}
            onBeforeInput={onBeforeInputHandler}
          />
          {!formValidity.postal && (
            <p>Please enter a valid postal of length 6!</p>
          )}
        </div>
        <div
          className={`${classes.control} ${
            formValidity.city ? "" : classes.invalid
          }`}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            defaultValue={addressCtx.getOrderAddress().city}
            ref={cityRef}
            onBeforeInput={onBeforeInputHandler}
          />
          {!formValidity.city && <p>Please enter a valid city!</p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Checkout;
