import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../../ReduxToolkit/store/messagesSlices/SetPageSlice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const ChatBox = ({ decodedToken, message, msg, firstMessageSend }) => {
  const messageEl = useRef(null);
  const dispatch = useDispatch();

  const handleInfiniteScroll = () => {
    if (document.getElementById("chatBox").scrollTop <= 0) {
      dispatch(updatePage());
    }
  };

  const selectedId = useSelector((state) => {
    return state.selectedId.value;
  });

  const specificMessages = useSelector((state) => {
    return state.specificMessages;
  });

  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [message, selectedId]);

  return (
    <div
      onScroll={() => {
        handleInfiniteScroll();
      }}
      ref={messageEl}
      id="chatBox"
      className="chats-modalChatBody"
    >
      {firstMessageSend ? (
        message?.map((msg, i) => {
          return (
            <React.Fragment key={i}>
              <div id={msg.sentBy?._id === decodedToken._id ? "me" : "other"}>
                <p className="Chats-msg-text">{msg.text}</p>
                <p>
                  <span className="Chats-msg-senderName">
                    Sent By: {msg.sentBy?.name}
                  </span>
                  <span className="Chats-msg-time">{msg.timeStamp}</span>
                </p>
              </div>
            </React.Fragment>
          );
        })
      ) : specificMessages.isLoading ? (
        <>
          <Spin indicator={antIcon} />
        </>
      ) : (
        msg?.map((object, i) => {
          return (
            <React.Fragment key={i}>
              <div id={object.sentBy._id === decodedToken._id ? "me" : "other"}>
                <p className="Chats-msg-text">{object.text}</p>
                <p>
                  <span className="Chats-msg-senderName">
                    Sent By: {object.sentBy.name}
                  </span>
                  <span className="Chats-msg-time">{object.timeStamp}</span>
                </p>
              </div>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};

export default ChatBox;
