import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { peopleOutline, clipboardOutline } from "ionicons/icons";
import { Route, Switch } from "react-router-dom";

import Clients from "../pages/Admin/Clients";
import Plans from "../pages/Admin/Plans";
import CreatePlans from "../pages/Admin/Plans/Create";
import EditPlan from "../pages/Admin/Plans/Edit";

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Switch>
        <Route path="/admin/clients" exact>
          <Clients />
        </Route>
        <Route path="/admin/plans" exact>
          <Plans />
        </Route>
        <Route path="/admin/plan-create" exact>
          <CreatePlans />
        </Route>
        <Route path="/admin/plan-edit/:id" exact>
          <EditPlan />
        </Route>
      </Switch>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="plans" href="/admin/plans">
        <IonIcon icon={clipboardOutline} />
        <IonLabel>Planos</IonLabel>
      </IonTabButton>

      <IonTabButton tab="clients" href="/admin/clients">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Clientes</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default Tabs;
