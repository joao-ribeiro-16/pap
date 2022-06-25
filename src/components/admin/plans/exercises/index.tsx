import { useState } from "react";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonItem,
  IonLabel,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToggle,
  IonToolbar,
  ItemReorderEventDetail,
  IonInput,
} from "@ionic/react";
import { useField } from "formik";
import classes from "./Exercises.module.css";

import defaultExercicesData from "../../../../helpers/exercisesData.json";

interface ExercisesProps {
  currentExercises: any;
  save: () => void;
  selectedDay: number;
  isEditing: boolean;
}

const Exercises: React.FC<ExercisesProps> = (props) => {
  const [exercisesData, setExercisesData] = useState(
    props.currentExercises || defaultExercicesData
  );

  const [exercises, _, exercisesHelpers] = useField("exercises");

  const doReorder = (event: CustomEvent<ItemReorderEventDetail>) => {
    const newExercises = [...exercisesData];

    newExercises.splice(
      event.detail.to,
      0,
      newExercises.splice(event.detail.from, 1)[0]
    );

    setExercisesData(newExercises);

    event.detail.complete();
  };

  const handleChangeToggle = (event: any, index: number) => {
    const newExercises = [...exercisesData];
    newExercises[index] = {
      ...newExercises[index],
      selected: event.detail.checked,
    };

    setExercisesData(newExercises);
  };

  const handleChangeDuration = (event: any, index: number) => {
    const newExercises = [...exercisesData];
    newExercises[index] = {
      ...newExercises[index],
      duration: event.detail.value,
    };

    setExercisesData(newExercises);
  };

  const handleSave = () => {
    if (!props.isEditing) {
      const newExercises = [...exercises.value];
      newExercises[props.selectedDay] = exercisesData;

      exercisesHelpers.setValue(newExercises);
    }

    props.save();
  };

  return (
    <IonContent>
      <IonToolbar>
        <IonTitle>Exercícios</IonTitle>

        <IonButtons slot="end">
          <IonButton onClick={handleSave}>
            <IonLabel>{props.isEditing ? "Voltar" : "Guardar"}</IonLabel>
          </IonButton>
        </IonButtons>
      </IonToolbar>

      <IonReorderGroup disabled={props.isEditing} onIonItemReorder={doReorder}>
        {exercisesData.map((exercise: any, index: number) => (
          <IonItem key={exercise.idExercise}>
            <IonLabel>{exercise.nameExercise}</IonLabel>
            {!props.isEditing ? (
              <IonToggle
                slot="start"
                color="success"
                name={exercise.nameExercise}
                checked={exercise.selected}
                onIonChange={(event) => handleChangeToggle(event, index)}
              ></IonToggle>
            ) : null}

            <IonItem
              className={classes.item}
              style={{ width: 130, display: "flex" }}
            >
              <IonInput
                disabled={props.isEditing}
                type="number"
                name="keyWord"
                value={exercise.durationExercise}
                onIonChange={(event) => handleChangeDuration(event, index)}
              />{" "}
              seg
            </IonItem>
            {!props.isEditing ? <IonReorder /> : null}
          </IonItem>
        ))}
      </IonReorderGroup>
    </IonContent>
  );
};

export default Exercises;
