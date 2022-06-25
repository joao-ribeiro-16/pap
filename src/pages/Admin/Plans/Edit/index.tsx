import { IonLoading, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlanById } from "../../../../api/api";
import PlanData from "../../../../components/admin/plans";

const EditPlan: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [planData, setPlanData] = useState(null);

  let { id } = useParams<any>();

  useEffect(() => {
    handleGetPlanDetail();
  }, []);

  const handleGetPlanDetail = async () => {
    try {
      setIsLoading(true);
      const data = await getPlanById(id);
      setPlanData(data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={isLoading} />
      {planData ? <PlanData planData={planData} /> : null}
    </IonPage>
  );
};

export default EditPlan;
