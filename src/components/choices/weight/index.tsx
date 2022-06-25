import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  useIonPicker,
} from "@ionic/react";
import { useState } from "react";

import classes from "./index.module.css";

import { useField } from "formik";

interface TrainningDaysProps {
  handleSubmit: () => void;
}

const Weight: React.FC<TrainningDaysProps> = (props) => {
  const [gender, _, genderHelpers] = useField("gender");
  const [age, __, ageHelpers] = useField("age");
  const [weight] = useField("weight");
  const [height] = useField("height");
  const [name] = useField("name");

  const [present] = useIonPicker();

  return (
    <>
      <IonContent>
        <div className="ion-padding">
          <IonProgressBar value={0.75}></IonProgressBar>
        </div>

        <div>
          <h3 className={classes.h3}>Insira os seus dados</h3>
        </div>

        <IonList>
          <IonItem className="ion-padding">
            <IonLabel>Nome:</IonLabel>
            <IonInput
              placeholder="Insira o seu nome"
              type="text"
              name="name"
              value={name.value}
              onIonInput={name.onChange}
            ></IonInput>
          </IonItem>
          <IonItem className="ion-padding">
            <IonLabel>Género</IonLabel>
            <IonSelect
              value={gender.value}
              onIonChange={(e: any) => {
                genderHelpers.setValue(e.detail.value);
              }}
            >
              <IonSelectOption value="masc">Masculino</IonSelectOption>
              <IonSelectOption value="fem">Feminino</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="ion-padding">
            <IonLabel
              onClick={() =>
                present({
                  buttons: [
                    {
                      text: "Cancelar",
                      role: "cancel",
                    },
                    {
                      text: "Confirmar",
                      handler: (selected) => {
                        ageHelpers.setValue(selected.anos.value);
                      },
                    },
                  ],
                  columns: [
                    {
                      name: "anos",
                      options: Array.from({ length: 100 }, (v, i) => ({
                        text: String(i + 1),
                        value: i + 1,
                      })),
                    },
                  ],
                })
              }
            >
              Idade: {age.value} anos
            </IonLabel>
          </IonItem>
          <IonItem className="ion-padding">
            <IonLabel>Peso:</IonLabel>
            <IonInput
              placeholder="Insira o seu peso"
              type="number"
              name="weight"
              value={weight.value}
              onIonInput={weight.onChange}
            ></IonInput>
            <IonLabel>KG</IonLabel>
          </IonItem>
          <IonItem className="ion-padding">
            <IonLabel>Altura:</IonLabel>
            <IonInput
              placeholder="Insira a sua altura"
              type="number"
              name="height"
              value={height.value}
              onIonInput={height.onChange}
            ></IonInput>
            CM
          </IonItem>
        </IonList>

        {gender.value && age.value && height.value && weight.value ? (
          <div className="ion-padding ion-text-center">
            <IonButton onClick={() => props.handleSubmit()}>Terminar</IonButton>
          </div>
        ) : null}
      </IonContent>
    </>
  );
};

export default Weight;
