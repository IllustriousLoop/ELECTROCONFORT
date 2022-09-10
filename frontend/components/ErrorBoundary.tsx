import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button, Typography } from "antd";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  message: ReactNode;
}
const { Title, Link, Text } = Typography;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    message: "",
  };

  constructor(props: Props | Readonly<Props>) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true, message: "" };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log({ error, errorInfo });
    if (new Date() <= new Date(2022, 11, 12)) {
      this.setState({
        ...this.state,
        message: (
          <>
            <Text>Uy! lo lamento puedes contactar a </Text>
            <Link href="http://jhairparis.com/#contact" target="_blank" italic>
              Jhair
            </Link>
            <Text> para arreglar este </Text><Text type="danger">error</Text>
          </>
        ),
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Title>Oops, Ocurio un error!</Title>
          <Title level={2}>{this.state.message}</Title>
          <Button
            type="primary"
            onClick={() => this.setState({ hasError: false })}
          >
            Intentar de Nuevo?
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
