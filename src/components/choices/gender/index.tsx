import { IonCol, IonGrid, IonProgressBar, IonRow } from "@ionic/react";

import classes from "./index.module.css";

interface TrainningDaysProps {
  changeContent: () => void;
}

const Gender: React.FC<TrainningDaysProps> = (props) => {
  const { changeContent } = props;

  const handleSelect = () => {
    changeContent();
  };

  return (
    <>
      <div className="ion-padding">
        <IonProgressBar value={0.4}></IonProgressBar>
      </div>
      <div>
        <h1 className={classes.h1}>Qual o seu género ?</h1>
      </div>

      <IonGrid className={classes.grid}>
        <IonRow>
          <IonCol onClick={handleSelect}>
            <div>
              <img
                className={classes.imageMasc}
                src="assets/images/masculino.png"
              />
              <h3 className={classes.h3}>Masculino</h3>
            </div>
          </IonCol>
          <IonCol onClick={handleSelect}>
            <div>
              <img className={classes.image} src="assets/images/feminino.png" />
              <h3 className={classes.h3}>Feminino</h3>
            </div>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Gender;
