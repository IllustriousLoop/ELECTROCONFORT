import { Col, Button, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();
  return (
    <div>
      <Row>
        <Typography.Title
          level={1}
          style={{ textAlign: "center", width: "100%" }}
        >
          Error
        </Typography.Title>
      </Row>
      <Row>
        <Col
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={"/image/404.svg"} width={300} height={300} />
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ textAlign: "center", width: "100%" }}>
            <Typography.Text type="warning">Hola!, </Typography.Text>
            <Typography.Text strong>No </Typography.Text>
            <Typography.Text>se encontro esta pagina.</Typography.Text>
          </span>
        </Col>
        <Col
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" onClick={() => router.push("/")}>
            Regresar
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Custom404;
