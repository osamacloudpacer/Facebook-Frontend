import { message } from "antd";
import axios from "axios";

const token = localStorage.getItem("jwt");

//Show All Posts
export const getAllPosts = async (page) => {
  try {
    const posts = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}posts/all/?page=${page}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return posts.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Not Found");
    } else {
      console.error(error.response.data.message);
    }
  }
};

//Show My Posts
export const getPosts = async () => {
  try {
    const posts = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}posts/`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return posts.data.post;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log("Not Found");
    } else {
      console.error(error.response.data.message);
    }
  }
};

//Create Posts
export const postCreate = async (data) => {
  try {
    const res = await axios({
      method: "post",
      url: `http://localhost:8081/`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.message === "Created Successfully") {
      message.success("Created Successfully");
      return res.data.message;
    } else {
      message.error("Something Broke");
    }
    console.log(res.data);
  } catch (error) {
    message.error(error.response.data.message);
  }
};

//Like Post
export const likePost = async (payload) => {
  const res = await axios({
    method: "put",
    url: `${process.env.REACT_APP_API}posts/like`,
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });
  return res.data?.post;
};

//Show Comments
export const showComments = async (postId) => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}posts/comments/${postId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

//Comment Submit
export const handleCommentSubmit = async (postId, values) => {
  try {
    const payload = {
      comment: values.comment,
      postId: postId,
    };
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API}posts/comments/`,
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    message.success("Comment Posted");
    console.log(res.data.comments);
    return res.data.comments;
  } catch (error) {
    message.error(error.response.data.message);
  }
};

//Comment Delete
export const handleCommentDelete = async (postId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API}posts/comments/${postId._id}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    message.success(res.data.message);
    console.log(res.data.message);

    return res.data.message;
  } catch (error) {
    message.error(error.response.data.message);
  }
};

//Post Like
// export const handleLike = async () => {
//   props?.setStateRender(!props?.render);
//   if (isClicked === false) {
//     const payload = {
//       postId: props.postId,
//       like: "true",
//     };
//     await axios({
//       method: "post",
//       url: `${process.env.REACT_APP_API}posts/like`,
//       headers: { Authorization: `Bearer ${token}` },
//       data: payload,
//     })
//       .then((res) => {
//         setIsClicked(!isClicked);

//         message.success("Liked");
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   } else {
//     const payload = {
//       postId: props.postId,
//       like: "false",
//     };
//     await axios({
//       method: "post",
//       url: `${process.env.REACT_APP_API}posts/like`,
//       headers: { Authorization: `Bearer ${token}` },
//       data: payload,
//     })
//       .then((res) => {
//         setIsClicked(!isClicked);
//         message.success("Disliked");
//         console.log(res.data);
//       })
//       .catch((err) => {
//         console.log(err.response.data.message);
//       });
//   }
// };

// export const onFinish = async (values) => {
//   console.log("inputFile:", values.inputFile[0].originFileObj);
//   const data = new FormData();
//   data.append("inputFile", values.inputFile[0].originFileObj);
//   data.append("postDescription", values.postDescription);
//   const token = localStorage.getItem("jwt");
//   await axios({
//     method: "post",
//     url: `${process.env.REACT_APP_API}posts/`,
//     data: data,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   })
//     .then((res) => {
//       if (res.data.message === "Created Successfully") {
//         message.success("Created Successfully");
//         // form.resetFields();
//       } else {
//         message.error("Something Broke");
//       }
//       console.log(res.data);
//     })
//     .catch((error) => {
//       message.error(error.response.data.message);
//     });
// };

//Delete Post

export const handleDelete = async (postId) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API}posts/${postId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    message.success(res.data.message);
    console.log(res.data);
  } catch (error) {
    message.error(error.response.data.message);
  }
};

//Update Post
export const handleUpdate = async (data) => {
  try {
    const res = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API}posts/`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: data,
    });
    if (res) {
      message.success(res.data.message);
      return res.data.message;
    }
  } catch (err) {
    message.error(err.response.data.message);
  }
};

//Show Friends
export const fetchFriends = async (page) => {
  try {
    const friends = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}addfriends/paginated/?page=${page}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return friends.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      message.info("No Friends");
    } else {
      message.error(error.response.data.message);
    }
  }
};

//Find Friends
export const findFriends = async (value) => {
  const res = await axios({
    method: "get",
    url: `${process.env.REACT_APP_API}addfriends/${value}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

//Find All Users
export const findAllUsers = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API}addfriends/allusers`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    message.error(error.response.data.message);
  }
};

//Send Request
export const sendRequest = async (payload) => {
  const res = await axios({
    method: "post",
    url: `${process.env.REACT_APP_API}addfriends`,
    headers: { Authorization: `Bearer ${token}` },
    data: payload,
  });
  return res;
};

//Delete Friend
export const deleteFriend = async (friendId) => {
  const res = await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API}addfriends/${friendId}`,
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

//Show Friend Requests
export const fetchFriendRequests = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}addfriends/requests`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.requests;
  } catch (error) {
    message.error(error.response.data.message);
  }
};

//Handle Friend Requests
export const handleRequest = async (status, friendId) => {
  const payload = {
    status: status,
    friendId: friendId,
  };
  try {
    const friendRequest = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API}addfriends/status`,
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    message.success("Friend Request " + status + "ed");

    console.log(friendRequest);
    return friendRequest;
  } catch (err) {
    message.error(err.response.data.message);
    console.log(err.response.data.message);
  }
};

//Show Messages
export const showMessages = async () => {
  try {
    const messages = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}messages/`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return messages.data.chats;
  } catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

//show Specific Chat
export const showSpecificChat = async (payload) => {
  try {
    const messages = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}messages/${payload.selectedId}?page=${payload.page}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return messages.data.chats;
  } catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

//SendMessage
export const saveMessages = async (
  chatRoomId,
  participant2,
  messageOwner,
  text,
  time
) => {
  try {
    // console.log("chatRoomId: ", chatRoomId);
    const payload = {
      chatRoomId: chatRoomId,
      participant2: participant2,
      messageOwner: messageOwner,
      text: text,
      time: time,
    };
    const res = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API}messages/`,
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    // console.log("response of API", res);
    return res.data;
  } catch (error) {
    message.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};
