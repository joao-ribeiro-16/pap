import { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonLoading,
} from "@ionic/react";

import classes from "./Auth.module.css";
import Toast from "light-toast";
import { login, register } from "../../api/api";

const Auth: React.FC = () => {
  const isOnRegister = useLocation().pathname === "/register";
  const isAdmin = useLocation().pathname === "/admin/login";

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async () => {
    if (email.length === 0 || password.length === 0) {
      return;
    }

    try {
      setIsLoading(true);

      let user,
        successMessage,
        url = "/client/choices";
      if (isOnRegister) {
        user = await register({ email, password });
        successMessage = "Registo com sucesso";
      } else {
        user = await login({ email, password, isAdmin });
        successMessage = "Login com sucesso";
        if (isAdmin) {
          url = "/admin/plans";
        } else if (
          user.numberOfWorkouts ||
          user.gender ||
          user.goals ||
          user.age ||
          user.weight ||
          user.height ||
          user.name
        ) {
          url = "/client/plans";
        }
      }

      localStorage.setItem("user", JSON.stringify(user));

      Toast.success(successMessage, 1500, () => {
        history.push(url);
      });
    } catch (error) {
      console.dir(error);
      Toast.fail("Email ou password inco", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <IonPage>
      <IonContent>
        <IonLoading isOpen={isLoading} />
        <div className={classes.header}>
          <img src="assets/images/back-login.jpg" className={classes.back} />
          <img src="assets/images/logo.png" className={classes.logo} />
          <div className={classes.buttonsContainer}>
            <Link to="/login">
              <IonButton
                fill="clear"
                className={!isOnRegister ? classes.active : ""}
              >
                Entrar
              </IonButton>
            </Link>

            {!isAdmin ? (
              <Link to="/register">
                <IonButton
                  fill="clear"
                  className={isOnRegister ? classes.active : ""}
                >
                  Criar Conta
                </IonButton>
              </Link>
            ) : null}
          </div>
        </div>

        <IonList>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              id="email"
              name="email"
              type="email"
              placeholder="Insira o seu email"
              onIonChange={(e) => setEmail(e.detail.value!)}
              value={email}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Password</IonLabel>
            <IonInput
              id="password"
              name="password"
              type="password"
              placeholder="Insira a sua password"
              onIonChange={(e) => setPassword(e.detail.value!)}
              value={password}
            ></IonInput>
          </IonItem>
          {!isAdmin ? (
            <Link to="/admin/login">
              <p className="ion-text-center">Admin</p>
            </Link>
          ) : null}

          <p></p>
          <div className="ion-padding and ion-text-center">
            <IonButton onClick={handleSubmit}>
              {isOnRegister ? "Registar" : "Iniciar Sessão"}
            </IonButton>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Auth;
