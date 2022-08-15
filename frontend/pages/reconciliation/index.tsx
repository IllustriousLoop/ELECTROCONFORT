import { useState } from "react";
import { Button, Col, Input, Popconfirm, Row, Space, Upload } from "antd";
import { UploadOutlined, FileAddOutlined } from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import { toast } from "react-toastify";
import axios from "axios";
import Link from "next/link";
import Premium from "../../components/Premium";

const Reconciliation = () => {
  const [month, setMonth] = useState(1);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [premium, setPremium] = useState(false);

  const handleUpload = () => {
    if (true) {
      setPremium(true);
      return;
    }
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file as RcFile);
    });
    setUploading(true);

    try {
      const send = async () => {
        await axios.post(
          `http://localhost:5000/api/upload/files?MES=${month}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setFileList([]);
      };

      toast.promise(send, {
        pending: "Subiendo archivos...",
        success: "Archivos subidos con exito",
        error: "No se pudieron subir los archivos",
      });
    } catch (error) {
      toast.error("upload failed.");
    }
    setUploading(false);
  };

  const props: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    onChange: (e) => {
      const newArrayFiles = e.fileList.map((file) =>
        file.originFileObj ? file.originFileObj : file
      );
      setFileList(newArrayFiles);
    },
    fileList,
  };

  return (
    <div>
      <Premium
        view={premium}
        message={"Subir archivos es una funcion premium"}
        handleCancel={() => setPremium(false)}
      />
      <Row>
        <Col span={24}>
          <Input
            placeholder="Numero de mes"
            type="number"
            value={month}
            onChange={(e: any) => setMonth(e.target.value)}
          />
        </Col>
        <Col span={24}>
          <Space align="center">
            <Link href={`/reconciliation/statement&auxiliary/${month}`}>
              <Button type="primary">Extrcto y auxiliar</Button>
            </Link>
            <Link href={`/reconciliation/bankCards/${month}`}>
              <Button type="primary">Tarjetas</Button>
            </Link>

            <Upload {...props}>
              <Button type="dashed">
                <UploadOutlined /> Agregar archivos
              </Button>
            </Upload>

            <Popconfirm
              title="Are you sure upload this month?"
              onConfirm={handleUpload}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                disabled={fileList.length === 0}
                loading={uploading}
                icon={<FileAddOutlined />}
                size={"large"}
              />
            </Popconfirm>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Reconciliation;
