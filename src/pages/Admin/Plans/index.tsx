import { useEffect, useState } from "react";
import { Router, useHistory } from "react-router";

import Toast from "light-toast";

import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import classes from "./Plans.module.css";
import { Plan } from "../../../models/plan";
import { getPlans } from "../../../api/api";

const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const history = useHistory();

  useEffect(() => {
    handleGetPlans(0);
  }, []);

  const handleGetPlans = async (skip: number) => {
    try {
      setIsLoading(true);

      const data = await getPlans(skip);

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

  const handleGetMore = () => {
    handleGetPlans(plans.length);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Planos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonLoading isOpen={isLoading} />

        {plans.map((plan: Plan) => (
          <IonCard
            key={plan._id}
            onClick={() => history.push(`/admin/plan-edit/${plan._id}`)}
          >
            <img
              src={`https://source.unsplash.com/random?${plan.keyWord}`}
              className={classes.image}
            />
            <IonTitle className={classes.title}>{plan.namePlan}</IonTitle>
          </IonCard>
        ))}

        {hasMore ? (
          <div className="ion-padding ion-text-center">
            <IonButton className={classes.add} onClick={handleGetMore}>
              Carregar mais
            </IonButton>
          </div>
        ) : null}

        <IonCard
          className={classes.card}
          onClick={() => history.push("/admin/plan-create")}
        >
          <IonTitle className={classes.title}>Adicionar Plano </IonTitle>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Plans;
