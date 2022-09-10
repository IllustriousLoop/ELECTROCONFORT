import { Button, Checkbox, Form, Input } from "antd";
import { NextPage } from "next";
import { useContext, useEffect } from "react";
import CustomHead from "../../components/layout/CustomHead";
import auth from "../../hooks/context/auth";
import { Role } from "../../ts/types/auth/authData";

const SignIn: NextPage = () => {
  const [_, signIn, restoreAuth] = useContext(auth);

  useEffect(() => {
    restoreAuth();
  }, []);

  const onFinish = (values: any) => {
    if (values.userName === "admin" && values.password === "JhairDev") {
      signIn(Role.ADMIN);
    } else if (values.userName === "user" && values.password === "123") {
      signIn(Role.USER);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <CustomHead title="Inicio de sesion" />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Recordar</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;
