import { IonCard, IonProgressBar, IonTitle } from "@ionic/react";

import classes from "./index.module.css";
import { useField } from "formik";

interface TrainningDaysProps {
  changeContent: () => void;
}

const TrainningDays: React.FC<TrainningDaysProps> = (props) => {
  const { changeContent } = props;

  const [_, __, numberOfWorkoutsHelpers] = useField("numberOfWorkouts");

  const handleSelect = (value: String) => {
    numberOfWorkoutsHelpers.setValue(value);
    changeContent();
  };

  return (
    <>
      <div className="ion-padding">
        <IonProgressBar value={0.25}></IonProgressBar>
      </div>
      <div>
        <h3 className={classes.h3}>Quantas vezes treina por semana ?</h3>
        <h6 className={classes.h5}>
          Usaremos isto para recomendar treinos para você experimentar
        </h6>
      </div>

      <IonCard className={classes.card} onClick={() => handleSelect("LOW")}>
        <IonTitle className={classes.title}>0-1 treino</IonTitle>
      </IonCard>
      <IonCard className={classes.card} onClick={() => handleSelect("MEDIUM")}>
        <IonTitle className={classes.title}>2-4 treinos</IonTitle>
      </IonCard>
      <IonCard className={classes.card} onClick={() => handleSelect("HIGH")}>
        <IonTitle className={classes.title}>5 treinos ou mais</IonTitle>
      </IonCard>
    </>
  );
};

export default TrainningDays;
