import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Empty,
  Form,
  Input,
  Card,
  Row,
  Col,
  Layout,
  Space,
} from "antd";
import axios from "axios";
import moment from "moment";

import { useNavigate } from "react-router-dom";

import {
  WarningTwoTone,
  PlusCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

const { TextArea } = Input;
const { confirm, success } = Modal;
const { Header } = Layout;
let TodoList = ({}) => {
  const navigate = useNavigate();

  const [formCreate] = Form.useForm();

  const [textBtn, setTextBtn] = useState("Create");
  const [data, setData] = useState();
  const [dataEdit, setDataEdit] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    //api /todos

    const userToken = sessionStorage.getItem("user_token");
    if (!userToken) {
      navigate("/");
    } else {
      dataFetch(userToken);
    }

    return;
  }, []);

  const dataFetch = async (userToken) => {
    try {
      const res = await axios({
        method: "get",
        url: "https://candidate.neversitup.com/todo/todos",
        data: {},
        headers: {
          "Content-Type": "application/json",
          "Authorization ": `Bearer ${userToken}`,
        },
      });

      if (res.status === 200) {
        setData(res.data);
        setTextBtn("Create");
        setDataEdit(null);
      }
    } catch (error) {
      console.log("error :>> ", error);
      alert("error");
    } finally {
    }
  };

  const onCreact = () => {
    setTextBtn("Create");
    setIsCreateOpen(true);
  };

  const handleCancel = () => {
    setIsCreateOpen(false);
    setTextBtn("Create");
    setDataEdit(null);
    formCreate.resetFields();
  };

  const handleOk = async () => {
    const { des, title } = formCreate.getFieldValue();

    if (textBtn === "Create") {
      confirm({
        title: `Confirm Create " ${title} " ?`,
        content: des,
        icon: <WarningTwoTone />,
        content: "",
        okText: "Confirm",
        textCancel: "Cancel",
        onOk() {
          handleCreateUpdate(
            des,
            title,
            "post",
            `https://candidate.neversitup.com/todo/todos/`,
            textBtn
          );
        },
        onCancel() {
          console.log(" cancel");
        },
      });
    } else if (textBtn === "Update") {
      //api update  /todos/${_id}

      confirm({
        title: `Confirm Update " ${title} "?`,
        content: des,
        icon: <WarningTwoTone />,
        content: "",
        okText: "Confirm",
        textCancel: "Cancel",
        onOk() {
          handleCreateUpdate(
            des,
            title,
            "put",
            `https://candidate.neversitup.com/todo/todos/${dataEdit._id}`,
            textBtn
          );
        },
        onCancel() {
          console.log(" cancel");
          setDataEdit(null);
        },
      });
    }
  };

  const onEdit = (data) => {
    setTextBtn("Update");
    setDataEdit(data);
    formCreate.setFieldsValue({
      title: data.title,
      des: data.description,
    });

    setIsCreateOpen(true);
  };

  const handleCreateUpdate = async (des, title, method, url, text) => {
    // console.log(des, title, userToken, method, url);
    const userToken = sessionStorage.getItem("user_token");
    try {
      const res = await axios({
        method: method,
        url: url,
        data: {
          title: title,
          description: des,
        },
        headers: {
          "Content-Type": "application/json",
          "Authorization ": `Bearer ${userToken}`,
        },
      });
      if (res.status === 200) {
        // console.log("textBtn :>> ", textBtn, res);
        success({
          title: `${text} success!`,
        });
        dataFetch(userToken);
      }
    } catch (error) {
      console.log("error :>> ", error);
      alert("error");
    } finally {
      setIsCreateOpen(false);
      formCreate.resetFields();
    }
  };

  const confirmDelete = (param) => {
    confirm({
      title: ` Confirm Delete " ${param.title} "? `,
      icon: <WarningTwoTone />,
      content: "",
      okText: "Confirm",
      textCancel: "Cancel",
      onOk() {
        handleCreateUpdate(
          param.description,
          param.title,
          "delete",
          `https://candidate.neversitup.com/todo/todos/${param._id}`,
          "Delete"
        );
      },
      onCancel() {
        console.log(" cancel");
      },
    });
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.clear();
  };

  return (
    <>
      <Layout>
        {/* ---- list ---- */}
        <Header style={{ marginBottom: "10px" }}>
          <label style={{ color: "#fff", fontSize: "24px" }}> TODO LIST </label>{" "}
          <Button
            style={{
              position: "absolute",
              right: 24,
              top: 24,
              color: "white",
            }}
            type="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Header>
        {data !== undefined && data !== null && data.length > 0 ? (
          <>
            {data.map((item) => {
              return (
                <Row
                  key={item._id}
                  style={{ margin: "10px" }}
                  justify="space-around"
                  align="middle"
                >
                  <Col>
                    <Card
                      extra={
                        <Button
                          onClick={(e) => {
                            confirmDelete(item);
                            e.stopPropagation();
                          }}
                          icon={<CloseCircleTwoTone />}
                        ></Button>
                      }
                      onClick={() => onEdit(item)}
                      title={<p style={{ fontSize: "18px" }}>{item.title} </p>}
                      bordered={false}
                      type="inner"
                      style={{ width: 500 }}
                    >
                      <p style={{ fontSize: "16px" }}>{item.description} </p>

                      <p style={{ textAlign: "right" }}>
                        {moment(item.updatedAt).format("DD-MM-YYYY")}{" "}
                      </p>
                    </Card>
                  </Col>
                </Row>
              );
            })}
          </>
        ) : (
          <>
            <Empty description="Empty press 'Create' fot add new todo." />
          </>
        )}
        <div style={{ position: "fixed", bottom: 10, right: 10 }}>
          <Button
            type="primary"
            onClick={onCreact}
            icon={<PlusCircleTwoTone color="#000" />}
            style={{ backgroundColor: "#0CCB80" }}
            size="large"
          >
            Create
          </Button>
        </div>

        <Modal
          title={`${textBtn} Todo!`}
          open={isCreateOpen}
          onOk={handleOk}
          okText="OK"
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            form={formCreate}
            layout="vertical"
            onFinish={handleOk}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 0,
            }}
          >
            <Form.Item
              label="TITLE"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please input your title!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="DESCRIPTION"
              name="des"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <TextArea />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                xs: { span: 24, offset: 8 },
                sm: { span: 16, offset: 8 },
              }}
            >
              <Button htmlType="button" onClick={handleCancel}>
                Cancel
              </Button>{" "}
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                {textBtn}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>
    </>
  );
};

export default TodoList;
