import { useContext, useEffect, useState } from "react";
import { Button, Col, Input, Row, Space } from "antd";
import Link from "next/link";
import auth from "../../hooks/context/auth";
import { useRouter } from "next/router";

const Reconciliation = () => {
  const [month, setMonth] = useState<number>(1);
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
            <Link href={`/reconciliation/new/${month}`}>
              <Button type="primary">Upload new month</Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Reconciliation;
