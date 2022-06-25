import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import Toast from "light-toast";

import {
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { arrowBack, logOutOutline } from "ionicons/icons";

import classes from "./ClientPlans.module.css";
import { Plan } from "../../../models/plan";
import { getPlans, getPlansByType, getWorkouts } from "../../../api/api";
import { handleLogout } from "../../../helpers/functions";
import { Link } from "react-router-dom";

const ClientPlans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreW, setHasMoreW] = useState(true);
  const [workouts, setWorkouts] = useState<any[]>([]);

  const history = useHistory();

  const user: any = JSON.parse(localStorage.getItem("user")!);

  useIonViewWillEnter(() => {
    const handleFetchInitial = async () => {
      await handleGetPlans(0);
      await handleGetWorkouts(0);
    };

    handleFetchInitial();
  }, []);

  const handleGetPlans = async (skip: number) => {
    try {
      setIsLoading(true);

      const data = await getPlansByType(skip, user.goals);

      const newPlans = [...plans, ...data];

      setPlans(newPlans);

      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetWorkouts = async (skip: number) => {
    try {
      setIsLoading(true);

      const data = await getWorkouts(skip, user._id);

      const newWorkouts = [...workouts, ...data];

      setPlans((curPlans) => {
        const newPlans = [...curPlans];

        return newPlans.filter(
          (ar: any) => !newWorkouts.find((rm) => rm.idPlan === ar._id)
        );
      });

      setWorkouts(newWorkouts);

      if (data.length < 10) {
        setHasMoreW(false);
      }
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetMore = () => {
    handleGetPlans(plans.length);
  };

  const handleGetMoreW = () => {
    handleGetWorkouts(workouts.length);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Planos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLabel className={classes.label}>Meu Plano</IonLabel>

        {workouts.map((workout: any) => (
          <Link
            to={`/client/plan/${workout.idPlan}/${workout._id}`}
            key={workout._id}
          >
            <IonCard className={classes.card}>
              <img
                src={`https://source.unsplash.com/random?${workout.keyWord}`}
                className={classes.image}
              />
              <IonTitle className={classes.title}>{workout.namePlan}</IonTitle>
            </IonCard>
          </Link>
        ))}

        {hasMoreW ? (
          <div className="ion-padding ion-text-center">
            <IonButton className={classes.button} onClick={handleGetMoreW}>
              Carregar Mais
            </IonButton>
          </div>
        ) : null}

        <IonLoading isOpen={isLoading} />

        <IonLabel className={classes.label}>Todos os Plano</IonLabel>

        {plans.map((plan: Plan) => (
          <Link to={`/client/plan/${plan._id}/0`} key={plan._id}>
            <IonCard className={classes.card}>
              <img
                src={`https://source.unsplash.com/random?${plan.keyWord}`}
                className={classes.image}
              />
              <IonTitle className={classes.title}>{plan.namePlan}</IonTitle>
            </IonCard>
          </Link>
        ))}

        {hasMore ? (
          <div className="ion-padding ion-text-center">
            <IonButton className={classes.button} onClick={handleGetMore}>
              Carregar Mais
            </IonButton>
          </div>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default ClientPlans;
