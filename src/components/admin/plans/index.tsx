import { useState } from "react";

import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonPicker,
  IonIcon,
} from "@ionic/react";

import classes from "./PlanDetail.module.css";
import Exercises from "../../../components/admin/plans/exercises";
import { Formik } from "formik";
import { createPlans, deletePlan, updatePlan } from "../../../api/api";
import Toast from "light-toast";
import * as Yup from "yup";
import { arrowBack } from "ionicons/icons";
import { useHistory } from "react-router-dom";

const PlanSchema = Yup.object().shape({
  namePlan: Yup.string()
    .min(2, "Nome demasiado curto!")
    .max(50, "Nome demasiado longo!")
    .required("Campo Obrigatório"),
  numberDays: Yup.number()
    .min(1, "Mínimo 1 dia de treino!")
    .max(365, "Máximo 365 dias de treino!")
    .required("Required"),
  keyWord: Yup.string()
    .min(2, "Nome demasiado curto!")
    .max(150, "Nome demasiado longo!")
    .required("Required"),
  typeWorkout: Yup.string().required("Required"),
});

interface PlanDataProps {
  planData?: any;
}

const PlanData: React.FC<PlanDataProps> = (props) => {
  const [present] = useIonPicker();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<null | number>(null);

  const isEditing = !!props.planData;
  let initialValues = {
    namePlan: "",
    numberDays: 0,
    keyWord: "",
    typeWorkout: "",
    exercises: [],
  };
  if (isEditing) {
    const { _id, __v, createdAt, ...rest } = props.planData;
    initialValues = rest;
  }

  const history = useHistory();

  const onSubmit = async (values: any) => {
    if (values.exercises.length !== values.numberDays) {
      Toast.fail("falta", 1500);
      return;
    }
    try {
      setIsLoading(true);

      let msg = "";
      if (!isEditing) {
        const newExercises = [...values.exercises];

        const newPlan = {
          ...values,
          exercises: newExercises.map(
            (exercises: any, index: number) =>
              (newExercises[index] = exercises.filter(
                (exercise: any) => exercise.selected
              ))
          ),
        };

        await createPlans(newPlan);
        msg = "Plano criado com sucesso";
      } else {
        await updatePlan({ ...values, id: props.planData._id });
        msg = "Plano alterado com sucesso";
      }

      Toast.success(msg, 1500, () => {
        history.push("/admin/plans");
      });
    } catch (error: any) {
      let message = "Algo correu mal";
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 11000
      ) {
        message = "Este nome do plano já existe";
      }

      Toast.fail(message, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateExerciseDay = (day: number) => {
    setSelectedDay(day);
  };

  const handleSaveExerciseDay = () => {
    setSelectedDay(null);
  };

  const handleDeletePlan = async () => {
    try {
      setIsLoading(true);
      await deletePlan(props.planData._id);

      Toast.success("Plano apagado com sucesso", 1500, () => {
        history.push("/admin/plans");
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <IonLoading isOpen={isLoading} />
      <Formik
        validationSchema={PlanSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <>
            <IonToolbar>
              <IonTitle>{isEditing ? "Editar" : "Criar"} Plano</IonTitle>
              <IonButtons slot="start">
                <IonButton onClick={() => props.handleSubmit()}>
                  Guardar
                </IonButton>
              </IonButtons>
              {isEditing ? (
                <IonButtons slot="end">
                  <IonButton onClick={handleDeletePlan} color="danger">
                    Apagar
                  </IonButton>
                </IonButtons>
              ) : null}
            </IonToolbar>
            <IonContent>
              <IonList>
                <div className="ion-padding">
                  <IonItem>
                    <IonLabel position="floating">Nome do treino</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={props.handleChange}
                      value={props.values.namePlan}
                      name="namePlan"
                    />
                  </IonItem>
                  {props.errors.namePlan ? (
                    <p className="errorMessage">{props.errors.namePlan}</p>
                  ) : null}
                </div>
                <div className="ion-padding">
                  <IonItem>
                    <IonLabel position="floating">Keyword</IonLabel>
                    <IonInput
                      type="text"
                      onIonInput={props.handleChange}
                      value={props.values.keyWord}
                      name="keyWord"
                    />
                  </IonItem>
                  {props.errors.keyWord ? (
                    <p className="errorMessage">{props.errors.keyWord}</p>
                  ) : null}
                </div>

                <div className="ion-padding">
                  <IonItem>
                    <IonLabel>Tipo de Treino</IonLabel>
                    <IonSelect
                      disabled={isEditing}
                      value={props.values.typeWorkout}
                      onIonChange={(e: any) => {
                        props.setFieldValue("typeWorkout", e.detail.value);
                      }}
                    >
                      <IonSelectOption value="LOSE_WEIGHT">
                        Perde Peso
                      </IonSelectOption>
                      <IonSelectOption value="GAIN_MUSCLES">
                        Aumentar os Músculos
                      </IonSelectOption>
                      <IonSelectOption value="KEEP_SHAPE">
                        Manter a Forma
                      </IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  {props.errors.typeWorkout ? (
                    <p className="errorMessage">{props.errors.typeWorkout}</p>
                  ) : null}
                </div>
                <div className="ion-padding">
                  <IonItem>
                    <IonLabel
                      onClick={() =>
                        !isEditing
                          ? present({
                              buttons: [
                                {
                                  text: "Cancelar",
                                  role: "cancel",
                                },
                                {
                                  text: "Confirmar",
                                  handler: (selected) => {
                                    props.setFieldValue("exercises", []);
                                    props.setFieldValue(
                                      "numberDays",
                                      selected.dias.value
                                    );
                                  },
                                },
                              ],
                              columns: [
                                {
                                  name: "dias",
                                  options: Array.from(
                                    { length: 31 },
                                    (v, i) => ({
                                      text: String(i + 1),
                                      value: i + 1,
                                    })
                                  ),
                                },
                              ],
                            })
                          : null
                      }
                    >
                      Número de dias {props.values.numberDays}
                    </IonLabel>
                  </IonItem>
                  {props.errors.numberDays ? (
                    <p className="errorMessage">{props.errors.numberDays}</p>
                  ) : null}
                </div>
              </IonList>
              {Array.from({ length: props.values.numberDays }, (v, i) => (
                <IonCard className={classes.card} key={i}>
                  <IonTitle
                    className={classes.title}
                    onClick={() => handleUpdateExerciseDay(i)}
                  >
                    Dia {i + 1}
                    {props.values.exercises[i] ? (
                      <div className={classes.div}>
                        <IonIcon icon={arrowBack} />
                      </div>
                    ) : null}
                  </IonTitle>
                </IonCard>
              ))}

              <IonModal isOpen={selectedDay !== null}>
                <Exercises
                  save={handleSaveExerciseDay}
                  selectedDay={selectedDay!}
                  currentExercises={props.values.exercises[selectedDay!]}
                  isEditing={isEditing}
                />
              </IonModal>
            </IonContent>
          </>
        )}
      </Formik>
    </>
  );
};

export default PlanData;
