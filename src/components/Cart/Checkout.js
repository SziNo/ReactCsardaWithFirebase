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
        <label htmlFor="postal">Ir??ny??t??sz??m</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputsValidity.postalCode && (
          <p>K??rj??k adj meg egy 4 sz??mjegy?? ir??nyit??sz??mot!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">V??ros</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && (
          <p>K??rj??k adj meg egy igazi v??ros nevet!</p>
        )}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Utca</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && (
          <p>K??rj??k adj meg egy igazi utca nevet!</p>
        )}
      </div>
      <div className={nameControlClasses}>
        <label htmlFor="name">N??v</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>K??rj??k adj meg a val??di nev??t!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          T??rl??s
        </button>
        <button>Meger??s??t??s</button>
      </div>
    </form>
  );
};

export default Checkout;
