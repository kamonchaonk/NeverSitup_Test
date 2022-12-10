import React, { useEffect } from "react";

//dom
import { useNavigate } from "react-router-dom";
import axios from "axios";

//antd
import { Button, Checkbox, Form, Input, Card } from "antd";
let LoginPage = ({}) => {
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const onFinish = (values) => {
    fetchAuthen({
      username: values.username,
      password: values.password,
      // projectcode: "445",
    });
    //password , username
  };

  const fetchAuthen = async (data) => {
    try {
      const res = await axios({
        method: "post",
        url: "https://candidate.neversitup.com/todo/users/auth",
        data: {
          username: data.username,
          password: data.password,
        },
      });

      if (res.status === 200) {
        sessionStorage.setItem("user_token", res.data.token);

        //change page
        navigate("/todo");
      }
    } catch (error) {
      console.log("error :>> ", error);
      alert("error");
    } finally {
    }
  };

  return (
    <>
      <Card
        style={{
          width: 300,
          height: 272,
          position: "absolute",
          left: `calc(50% - 150px)`,
          top: `calc(50% - 136px)`,
          padding: 0,
        }}
      >
        <>
          <Form
            name="login"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      </Card>
    </>
  );
};

export default LoginPage;
