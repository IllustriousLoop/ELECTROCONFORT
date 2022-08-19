import { useContext, useEffect, useState } from "react";
import { Button, Col, Input, Popconfirm, Row, Space, Upload } from "antd";
import { UploadOutlined, FileAddOutlined } from "@ant-design/icons";
import Link from "next/link";
import useUploadFiles from "../../hooks/useUploadFiles";
import auth from "../../hooks/context/auth";
import { useRouter } from "next/router";

const Reconciliation = () => {
  const [month, setMonth] = useState<number>(1);
  const [status, UploadFiles, { uploadProps }] = useUploadFiles(month);
  const [{ isAuthenticated }] = useContext(auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) router.push(`/auth/signIn?redirect=${router.asPath}`);
  }, [isAuthenticated]);

  return (
    <div>
      <Row>
        <Col span={24}>
          <Input
            placeholder="Numero de mes"
            type="number"
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
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

            <Upload {...uploadProps}>
              <Button type="dashed">
                <UploadOutlined /> Agregar archivos
              </Button>
            </Upload>

            <Popconfirm
              title="Are you sure upload this month?"
              onConfirm={() => UploadFiles()}
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
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Reconciliation;
