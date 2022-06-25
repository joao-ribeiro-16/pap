import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonPicker,
} from "@ionic/react";
import { useState } from "react";
import classes from "./Profile.module.css";
import { Formik } from "formik";
import { updateUser } from "../../../api/api";
import Toast from "light-toast";
import { useHistory } from "react-router-dom";

const Profile: React.FC = (props) => {
  const [present] = useIonPicker();

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const user: any = JSON.parse(localStorage.getItem("user")!);

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      const data = await updateUser({ ...values, id: user._id });

      localStorage.setItem("user", JSON.stringify(data));

      Toast.success("Perfil atualizado com sucesso", 1500, () => {
        history.push("/client/plans");
      });
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonLoading isOpen={isLoading} />

      <Formik
        initialValues={user}
        onSubmit={onSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {(props) => (
          <>
            <IonToolbar>
              <IonTitle>Perfil</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => props.submitForm()}>
                  Guardar
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonContent>
              <div className="ion-padding">
                <img
                  className={classes.imagem}
                  src={`https://eu.ui-avatars.com/api/?name=${props.values.name}`}
                />
              </div>

              <IonList>
                <IonItem className="ion-padding-top">
                  <IonLabel>Email</IonLabel>
                  <IonText>{props.values.email}</IonText>
                </IonItem>
                <IonItem className="ion-padding-top">
                  <IonLabel>Nome</IonLabel>
                  <IonText>{props.values.name}</IonText>
                </IonItem>
                <IonItem className="ion-padding-top">
                  <IonLabel>Género</IonLabel>
                  <IonSelect
                    value={props.values.gender}
                    onIonChange={(e: any) => {
                      props.setFieldValue("gender", e.detail.value);
                    }}
                  >
                    <IonSelectOption value="masc">Masculino</IonSelectOption>
                    <IonSelectOption value="fem">Feminino</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem className="ion-padding-top">
                  <IonLabel>Objetivo</IonLabel>
                  <IonSelect
                    value={props.values.goals}
                    onIonChange={(e: any) => {
                      props.setFieldValue("goals", e.detail.value);
                    }}
                  >
                    <IonSelectOption value="LOSE_WEIGHT">
                      Perder Peso
                    </IonSelectOption>
                    <IonSelectOption value="GAIN_MUSCLES">
                      Aumentar os Músculos
                    </IonSelectOption>
                    <IonSelectOption value="KEEP_SHAPE">
                      Manter a Forma
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem className="ion-padding-top">
                  <IonLabel
                    onClick={() =>
                      present({
                        buttons: [
                          {
                            text: "Cancelar",
                            role: "cancel",
                          },
                          {
                            text: "Confirmar",
                            handler: (selected) => {
                              props.setFieldValue("age", selected.anos.value);
                            },
                          },
                        ],
                        columns: [
                          {
                            name: "anos",
                            options: Array.from({ length: 100 }, (v, i) => ({
                              text: String(i + 1),
                              value: i + 1,
                            })),
                          },
                        ],
                      })
                    }
                  >
                    Idade: {props.values.age} anos
                  </IonLabel>
                </IonItem>
                <IonItem className="ion-padding-top">
                  <IonLabel>Peso:</IonLabel>
                  <IonInput
                    placeholder="Insira o seu peso"
                    type="number"
                    name="weight"
                    value={props.values.weight}
                    onIonInput={props.handleChange}
                  ></IonInput>
                  <IonLabel>KG</IonLabel>
                </IonItem>
                <IonItem className="ion-padding-top">
                  <IonLabel>Altura</IonLabel>
                  <IonInput
                    type="number"
                    name="height"
                    value={props.values.height}
                    onIonInput={props.handleChange}
                  ></IonInput>
                  <IonLabel>CM</IonLabel>
                </IonItem>
              </IonList>
            </IonContent>
          </>
        )}
      </Formik>
    </IonPage>
  );
};

export default Profile;
