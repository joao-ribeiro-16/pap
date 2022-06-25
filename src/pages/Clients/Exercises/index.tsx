import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmark } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  createWorkout,
  getPlanById,
  getWorkout,
  getWorkouts,
} from "../../../api/api";
import { Plan } from "../../../models/plan";
import Toast from "light-toast";

import classes from "./ExercisesPlans.module.css";

const ClientExercises: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<Plan>();
  const [workout, setWorkout] = useState<any>();

  let { id, isWorkout } = useParams<any>();

  const history = useHistory();

  useEffect(() => {
    handleGetPlan();
  }, [id]);

  const user: any = JSON.parse(localStorage.getItem("user")!);

  const handleGetPlan = async () => {
    try {
      setIsLoading(true);

      const data = await getPlanById(id);

      if (isWorkout != 0) {
        const workoutData = await getWorkout(isWorkout);
        setWorkout(workoutData);
      }

      setPlan(data);
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async () => {
    try {
      setIsLoading(true);

      await createWorkout({
        idPlan: plan!._id,
        idUser: user._id,
        namePlan: plan?.namePlan,
        keyWord: plan?.keyWord,
      });

      Toast.success("Aderiu ao plano com sucesso", 1500, () => {
        history.push(`/client/workout/${plan?._id}/exercises/1`);
      });
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStart = () => {
    history.push(
      `/client/workout/${plan?._id}/exercises/${workout.completedDays + 1}`
    );
  };

  const handleGetProgress = () => {
    if (!workout) {
      return 0;
    }

    return (plan?.exercises.length * workout.completedDays) / 100;
  };

  const isDone = (index: number) => {
    if (!workout) {
      return "";
    }

    return index + 1 <= workout.completedDays ? "success" : "";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Plano {plan?.namePlan}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={isLoading} />
        <div className={classes.div}>
          {plan?.exercises.map((exercise: any, index: number) => (
            <IonButton
              className={classes.button}
              key={index}
              color={isDone(index)}
            >
              {isDone(index) ? (
                <IonIcon
                  slot="icon-only"
                  icon={checkmark}
                  className={classes.icon}
                />
              ) : null}

              {index + 1}
            </IonButton>
          ))}
        </div>

        <div className={classes.progress}>
          <h3 slot="start" className="ion-padding-bottom">
            Progresso
          </h3>
          <h4 slot="end">{handleGetProgress()}%</h4>
          <IonProgressBar value={handleGetProgress() / 100}></IonProgressBar>
        </div>

        <div className={classes.divinitialize}>
          <IonButton
            onClick={() => (isWorkout != 0 ? handleStart() : handleJoin())}
            shape="round"
            className={classes.buttoninitialize}
          >
            {isWorkout != 0 ? "Iniciar" : "Aderir"}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ClientExercises;
