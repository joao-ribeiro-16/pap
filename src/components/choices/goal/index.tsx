import { IonCard, IonProgressBar, IonTitle } from "@ionic/react";

import classes from "./index.module.css";

import { useField } from "formik";

interface TrainningDaysProps {
  changeContent: () => void;
}

const Goal: React.FC<TrainningDaysProps> = (props) => {
  const { changeContent } = props;

  const [_, __, goalsHelpers] = useField("goals");

  const handleSelect = (value: String) => {
    goalsHelpers.setValue(value);
    changeContent();
  };

  return (
    <>
      <div className="ion-padding">
        <IonProgressBar value={0.5}></IonProgressBar>
      </div>
      <div>
        <h1 className="ion-padding">Quais é o seu principal objetivo ?</h1>
      </div>

      <IonCard
        className={classes.card}
        onClick={() => handleSelect("LOSE_WEIGHT")}
      >
        <IonTitle className={classes.title}>Perder Peso</IonTitle>
      </IonCard>
      <IonCard
        className={classes.card}
        onClick={() => handleSelect("GAIN_MUSCLES")}
      >
        <IonTitle className={classes.title}>Aumentar os músculos</IonTitle>
      </IonCard>
      <IonCard
        className={classes.card}
        onClick={() => handleSelect("KEEP_SHAPE")}
      >
        <IonTitle className={classes.title}>Manter a forma</IonTitle>
      </IonCard>
    </>
  );
};

export default Goal;
