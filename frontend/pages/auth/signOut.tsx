import { Button } from "antd";
import { useContext } from "react";
import auth from "../../hooks/context/auth";

const SignOut = () => {
  const [_, __, ___, signOut] = useContext(auth);

  return (
    <div>
      <Button type="primary" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
