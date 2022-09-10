import { Button } from "antd";
import { useContext } from "react";
import CustomHead from "../../components/layout/CustomHead";
import auth from "../../hooks/context/auth";

const SignOut = () => {
  const [_, __, ___, signOut] = useContext(auth);

  return (
    <div>
      <CustomHead title="Cerrar sesion" />
      <Button type="primary" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
