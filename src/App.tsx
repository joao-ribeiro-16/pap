import { Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/global.css";

import AdminTabs from "./tabs/AdminTabs";
import ClientTabs from "./tabs/ClientTabs";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Choices from "./pages/Choices/Choices";
import Ex from "./pages/EX";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet animated={false}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Auth />
        </Route>
        <Route exact path="/register">
          <Auth />
        </Route>
        <Route path="/client">
          <ClientTabs />
        </Route>
        <Route path="/admin">
          <AdminTabs />
        </Route>
        <Route path="/admin/login" exact>
          <Auth />
        </Route>
        <Route exact path="/ex">
          <Ex />
        </Route>
        <Route path="/client/choices" exact>
          <Choices />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
