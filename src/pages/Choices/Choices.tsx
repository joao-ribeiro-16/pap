import { useState } from "react";
import { IonContent, IonLoading, IonPage } from "@ionic/react";
import TrainningDays from "../../components/choices/trainningDays";
import Goal from "../../components/choices/goal";
import Weight from "../../components/choices/weight";
import { Formik } from "formik";
import { updateUser } from "../../api/api";
import Toast from "light-toast";
import { useHistory } from "react-router-dom";

const Choices: React.FC = () => {
  const [content, setContent] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleChangeContent = () => {
    setContent(content + 1);
  };

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);

      const user: any = JSON.parse(localStorage.getItem("user")!);

      const data = await updateUser({ ...values, id: user._id });

      localStorage.setItem("user", JSON.stringify(data));

      Toast.success("Conta finalizada", 1500, () => {
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
      <IonContent>
        <IonLoading isOpen={isLoading} />
        <Formik
          initialValues={{
            numberOfWorkouts: "",
            gender: "",
            goals: "",
            age: null,
            weight: null,
            height: null,
            name: "",
          }}
          onSubmit={onSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          {(props) => (
            <>
              {content === 1 ? (
                <TrainningDays changeContent={handleChangeContent} />
              ) : null}

              {content === 2 ? (
                <Goal changeContent={handleChangeContent} />
              ) : null}

              {content === 3 ? (
                <Weight handleSubmit={props.submitForm} />
              ) : null}
            </>
          )}
        </Formik>
      </IonContent>
    </IonPage>
  );
};

export default Choices;
