import classes from "./MealSummary.module.css";

const MealSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>Ínycsiklandó ételek házhoz szállítva!</h2>
      <p>
        Itt megtalálhatod az éppen aktuális menüket széles kínálatunkból. Legyen
        szó reggeliről, ebédről vagy vacsoráról, minden étfogáshoz találni fogsz
        ízlésednek megfelelőt!
      </p>
      <p>
        Minden ételünk a legjobb minőségű hozzávalókból készült a legjobb séfek
        által, kik ügyelnek a minőségre!
      </p>
    </section>
  );
};

export default MealSummary;
