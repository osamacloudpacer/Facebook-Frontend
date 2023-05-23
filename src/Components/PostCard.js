import React, { useEffect, useState } from "react";
import { Avatar, Card, Input, Space, Form } from "antd";
import { Modal, message, Col, Row } from "antd";
import Buttons from "./Buttons";
import {
  CommentOutlined,
  ShareAltOutlined,
  LikeOutlined,
  LikeTwoTone,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  showComments,
  handleCommentSubmit,
  handleCommentDelete,
  likePost,
  handleDelete,
  handleUpdate,
} from "../Api";

const { Meta } = Card;

const PostCard = (props) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [commentData, setCommentData] = useState([]);
  const [commentRender, setCommentRender] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };
  const handleCommentSubmitFinish = async (values) => {
    await handleCommentSubmit(props.postId, values);
    setCommentRender(!commentRender);
    form.resetFields();
  };
  const handleLike = async () => {
    props?.setStateRender(!props?.render);
    if (isClicked === false) {
      const payload = {
        postId: props.postId,
        like: "true",
      };
      try {
        const res = await likePost(payload);
        setIsClicked(!isClicked);
        message.success("Liked");
        console.log(res.data);
      } catch (error) {
        message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    } else {
      const payload = {
        postId: props.postId,
        like: "false",
      };
      try {
        const res = await likePost(payload);
        setIsClicked(!isClicked);
        message.success("Disliked");
        console.log(res.data);
      } catch (error) {
        message.error(error.response.data.message);
        console.log(error.response.data.message);
      }
    }
  };
  const handleUpdateValues = async (value) => {
    await handleUpdate(props.postId, value);
    form.resetFields();
    props?.setStateRender(!props?.render);
  };
  const getCommentsData = async () => {
    const res = await showComments(props.postId);
    setCommentData(res);
  };

  useEffect(() => {
    getCommentsData();
  }, [commentRender]);

  return (
    <div>
      <Modal
        title="Comments"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {commentData?.map((object, i) => {
          return (
            <>
              <Row key={i}>
                <Col span={12}>
                  <b> {object.userId.name} :</b> " {object.comment} "
                </Col>
                <Col span={4} offset={6}>
                  <Buttons
                    title={<DeleteOutlined />}
                    onClick={() => {
                      const res = handleCommentDelete(object.postId);
                      if (res) {
                        setCommentRender(!commentRender);
                      }
                    }}
                  />
                </Col>
              </Row>
            </>
          );
        })}
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Form
            name="control-hooks"
            onFinish={handleCommentSubmitFinish}
            form={form}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="comment"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Add Comment" />
            </Form.Item>
            <Form.Item>
              <Buttons type="primary" htmlType="submit" title="Submit" />
            </Form.Item>
          </Form>
        </Space.Compact>
      </Modal>

      <Modal
        title="Edit Post"
        open={isEditModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Space.Compact
          style={{
            width: "100%",
          }}
        >
          <Form
            name="control-hooks"
            onFinish={handleUpdateValues}
            form={form}
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item
              name="postDescription"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Post Description" />
            </Form.Item>
            <Form.Item>
              <Buttons type="primary" htmlType="submit" title="Submit" />
            </Form.Item>
          </Form>
        </Space.Compact>
      </Modal>
      <Card
        style={{
          width: 600,
          marginTop: "50px",
        }}
        cover={
          <img
            alt="example"
            src={`${process.env.REACT_APP_API}public/images/${props.inputFile}`}
            style={{
              objectFit: "cover",
              width: 600,
              height: 400,
            }}
          />
        }
        actions={[
          <span>
            {isClicked ? (
              <LikeTwoTone
                key="likes"
                id={props.postId}
                onClick={() => {
                  handleLike();
                }}
              />
            ) : (
              <LikeOutlined
                key="unlike"
                id={props.postId}
                onClick={() => {
                  handleLike();
                }}
              />
            )}

            {props.likeCount}
          </span>,
          <CommentOutlined
            key="comment"
            id={props.postId}
            onClick={() => {
              setIsModalOpen(true);
              getCommentsData();
            }}
          />,
          <ShareAltOutlined key="share" />,

          <DeleteOutlined
            key="delete"
            onClick={() => {
              handleDelete(props.postId);
              props?.setStateRender(!props?.render);
            }}
          />,
          <EditOutlined
            key="edit"
            onClick={() => {
              setIsEditModalOpen(true);
            }}
          />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title={props.cardTitle}
          description={props.cardDescription}
        />
      </Card>
    </div>
  );
};

export default PostCard;
