import { Modal } from "antd";
import { FC } from "react";

type Props = {
  view: boolean;
  message: string;
  handleCancel: () => void;
};

const Premium: FC<Props> = ({ view, message, handleCancel }: any) => {
  return (
    <>
      <Modal
        title="Error"
        visible={view}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <img src="/premium.png" alt="premium" style={{ width: "380px" }} />
        <br />
        Hola, {message}
      </Modal>
    </>
  );
};

export default Premium;
