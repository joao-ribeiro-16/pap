import { useEffect, useState } from "react";

import Toast from "light-toast";

import { deleteClient, getClients } from "../../../api/api";
import { Client } from "../../../models/clients";

import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import { trash } from "ionicons/icons";

import classes from "./Clients.module.css";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [deleteClientId, setDeleteClientId] = useState<string>("");

  useEffect(() => {
    handleGetClients(0);
  }, []);

  const handleGetClients = async (skip: number) => {
    try {
      setIsLoading(true);

      const data = await getClients(skip);

      const newClients = [...clients, ...data];

      setClients(newClients);

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
    handleGetClients(clients.length);
  };

  const handleDeleteClient = async () => {
    try {
      setIsLoading(true);

      await deleteClient(deleteClientId);

      const newClients = clients.filter(
        (client) => client._id !== deleteClientId
      );

      setClients(newClients);
      setDeleteClientId("");

      Toast.success("Cliente eliminado com sucesso", 1500);
    } catch (error) {
      Toast.fail("Algo correu mal", 1500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Clientes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonLoading isOpen={isLoading} />

        <IonAlert
          header="Tens a certeza?"
          message="Queres apagar isto"
          buttons={[
            {
              text: "Não",
              role: "cancel",
            },
            {
              text: "Sim",
              handler: handleDeleteClient,
            },
          ]}
          isOpen={!!deleteClientId}
          onDidDismiss={() => setDeleteClientId("")}
        />

        {clients.map((client: Client) => (
          <IonList key={client._id}>
            <IonItem>
              <IonAvatar slot="start">
                <img
                  src={`https://eu.ui-avatars.com/api/?name=${client.name}`}
                />
              </IonAvatar>
              <IonLabel>
                <div>
                  <h1>{client.email}</h1>
                </div>
              </IonLabel>
              <IonButtons slot="end">
                <IonButton onClick={() => setDeleteClientId(client._id)}>
                  <IonIcon icon={trash} className={classes.icon} />
                </IonButton>
              </IonButtons>
            </IonItem>
          </IonList>
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

export default Clients;
