import { Col, Button, Row, Typography } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";

const Custom500 = () => {
  const router = useRouter();
  return (
    <div>
      <Row>
        <Typography.Title
          level={1}
          style={{ textAlign: "center", width: "100%" }}
        >
          Error 500
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
          <Image src={"/image/500.svg"} width={300} height={300} />
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
            <Typography.Text type="danger">Hola!, </Typography.Text>
            <Typography.Text strong>No eres tu </Typography.Text>
            <Typography.Text>soy yo. Lo siento</Typography.Text>
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

export default Custom500;
