import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlanById } from "../../../api/api";
import classes from "./DayPlan.module.css";
import Toast from "light-toast";
import { Plan } from "../../../models/plan";

const ClientDayPlan: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<Plan>();

  let { id, day } = useParams<any>();

  useEffect(() => {
    handleGetPlan();
  }, []);

  const handleGetPlan = async () => {
    try {
      setIsLoading(true);

      const data = await getPlanById(id);

      setPlan(data);
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(plan);

  return (
    <IonPage>
      <IonToolbar>
        <IonButtons>
          <IonButton>
            <IonIcon icon={chevronBackOutline} className={classes.icon} />
          </IonButton>
        </IonButtons>
        <IonTitle>Dia {day}</IonTitle>
      </IonToolbar>
      <IonContent>
        <IonList>
          {plan &&
            plan.exercises[Number(day) - 1].map((exercise: any) => (
              <IonItem key={exercise.idExercise}>
                <img
                  src={`assets/gifs/${exercise.idExercise}.gif`}
                  className={classes.gif}
                />
                <IonTitle>{exercise.nameExercise}</IonTitle>
              </IonItem>
            ))}
        </IonList>
        <IonList className="ion-text-center ion-padding">
          <IonButton>Começar</IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ClientDayPlan;
