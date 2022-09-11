import useUploadFiles from "../../../hooks/useUploadFiles";
import { UploadOutlined, FileAddOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Upload } from "antd";
import { useRouter } from "next/router";
import CustomHead from "../../../components/layout/CustomHead";
import { useContext, useEffect } from "react";
import auth from "../../../hooks/context/auth";

const UploadFiles = () => {
  const router = useRouter();
  const {
    query: { month },
  } = router;

  const [status, UploadFilesConfirm, { uploadProps }] = useUploadFiles(
    Number(month)
  );

  const [{ isAuthenticated }] = useContext(auth);

  useEffect(() => {
    if (!isAuthenticated)
      router.push(`/auth/signIn?redirect=/reconciliation/new/${month}`);
  }, [isAuthenticated]);

  return (
    <div>
      <CustomHead title="Nuevo Mes" />
      <Upload {...uploadProps}>
        <Button type="dashed">
          <UploadOutlined /> Agregar archivos
        </Button>
      </Upload>

      <Popconfirm
        disabled={status === "wait" || status === "uploading"}
        title="Are you sure upload this month?"
        onConfirm={() => UploadFilesConfirm()}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          disabled={status === "wait" || status === "uploading"}
          loading={status === "uploading"}
          icon={<FileAddOutlined />}
          size={"large"}
        />
      </Popconfirm>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const { month } = context.query;
  //add if month is in db
  return { props: {} };
};

export default UploadFiles;
