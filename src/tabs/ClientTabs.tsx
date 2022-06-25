import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { personOutline, clipboardOutline } from "ionicons/icons";
import { Route, Switch } from "react-router-dom";
import Exercises from "../components/admin/plans/exercises";
import Choices from "../pages/Choices/Choices";
import ClientDayPlan from "../pages/Clients/DayPlan";
import ClientExercises from "../pages/Clients/Exercises";
import ClientPlans from "../pages/Clients/Plans/Index";
import Profile from "../pages/Clients/Profile";

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/client/plans" exact>
        <ClientPlans />
      </Route>
      <Route path="/client/workout/:id/exercises/:day" exact>
        <ClientDayPlan />
      </Route>
      <Route path="/client/plan/:id/:isWorkout" exact>
        <ClientExercises />
      </Route>
      <Route path="/client/profile" exact>
        <Profile />
      </Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="plans" href="/client/plans">
        <IonIcon icon={clipboardOutline} />
        <IonLabel>Planos</IonLabel>
      </IonTabButton>

      <IonTabButton tab="profile" href="/client/profile">
        <IonIcon icon={personOutline} />
        <IonLabel>Perfil</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
