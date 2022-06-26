import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFourNums = (value) => value.trim().length !== 4;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    postalCode: true,
    city: true,
    street: true,
    name: true,
  });

  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const streetInputRef = useRef();
  const nameInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredName = nameInputRef.current.value;

    const enteredPostalIsValid = !isNotFourNums(enteredPostal);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredNameIsValid = !isEmpty(enteredName);

    setFormInputsValidity({
      postalCode: enteredPostalIsValid,
      city: enteredCityIsValid,
      street: enteredStreetIsValid,
      name: enteredNameIsValid,
    });

    const formsValid =
      enteredPostalIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredNameIsValid;

    if (!formsValid) {
      return;
    }

    props.onConfirm({
      postalCode: enteredPostal,
      city: enteredCity,
      street: enteredStreet,
      name: enteredName,
    });
  };

  const postalControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Irányítószám</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Kérjük adj meg egy 4 számjegyű irányitószámot!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">Város</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && (
          <p>Kérjük adj meg egy igazi város nevet!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Utca</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p>Kérjük adj meg egy igazi utca nevet!</p>
        )}
      </div>
      <div className={nameControlClasses}>
        <label htmlFor="name">Név</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Kérjük adj meg a valódi nevét!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Törlés
        </button>
        <button>Megerősítés</button>
      </div>
    </form>
  );
};

export default Checkout;
