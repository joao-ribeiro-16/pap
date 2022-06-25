import { Link } from "react-router-dom";

import classes from "./Home.module.css";
import { IonButton, IonContent, IonHeader, IonPage } from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-padding">
        <img src="assets/images/logo.png" className={classes.image} />
      </IonHeader>
      <IonContent className="ion-padding">
        <video autoPlay muted loop className={classes.video}>
          <source src="assets/videos/home.mp4" type="video/mp4" />
        </video>
        <div className={classes.container}>
          <h1>FitBack</h1>
          <p>
            Tudo de que você precisa para alcançar suas metas de fitness. Vamos
            começar.
          </p>
          <div className={classes.buttons}>
            <Link to="/register">
              <IonButton className={classes.join}>Junte se a nós </IonButton>
            </Link>
            <Link to="/login">
              <IonButton className={classes.login} fill="outline">
                Entrar
              </IonButton>
            </Link>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
