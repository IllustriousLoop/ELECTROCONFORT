import useUploadFiles from "../../../hooks/useUploadFiles";
import { UploadOutlined, FileAddOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Upload } from "antd";
import { useRouter } from "next/router";
import CustomHead from "../../../components/layout/CustomHead";

const UploadFiles = () => {
  const {
    query: { month },
  } = useRouter();

  const [status, UploadFilesConfirm, { uploadProps }] = useUploadFiles(
    Number(month)
  );

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

export default UploadFiles;
