import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getMessageByUserBackAction } from "../../../redux/actions";
import AvatarStack from "../avatarStack";
import CardMessage from "../CardMessage";
import SendMessage from "../SendMessage";
import styles from "./index.module.css";

function Messages() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const chatByUser = useSelector((state) => state.chatByUser);
  const chatUsers = useSelector((state) => state.chatUsers);
  const chatPrevent = useSelector((state) => state.chatPrevent);
  const userInformation = useSelector((state) => state.userInformation);

  function scrollLastMessage() {
    var objDiv = document.getElementById("divu");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  useEffect(() => {
    dispatch(
      getMessageByUserBackAction({
        from: userInformation?._id,
        to: id,
        limit: 20,
      })
    );
    setTimeout(() => scrollLastMessage(), 500);
  }, [id, chatUsers]);

  if (chatUsers?.length) {
    const chatUsersID = chatUsers.map((user) => user._id).includes(id);
    const chatUsersPreventID = chatPrevent.map((user) => user._id).includes(id);
    if (!chatUsersID && !chatUsersPreventID)
      return <Navigate to={"/message"} />;
  }

  return (
    <section className={styles.section_Messages}>
      <div className={styles.header_message}>
        <div className={styles.userInformationChat}>
          <img src={chatByUser?.informationUserTo?.avatar} alt="user_chat" />
          <span>
            {`${chatByUser?.informationUserTo?.firstName} ${chatByUser?.informationUserTo?.lastName} `}
          </span>
        </div>
        <div className={styles.actionsChat}>
          <AvatarStack avatars={avatars} />
          <i className={`bi bi-camera-video`}></i>
          <i className="bi bi-telephone"></i>
          <i className="bi bi-three-dots-vertical"></i>
        </div>
      </div>
      <div id="divu" className={styles.messagesSent}>
        {chatByUser?.projectedMessages?.length &&
          chatByUser?.projectedMessages?.map((message, index) => (
            <CardMessage
              key={index}
              message={message.message}
              image={chatByUser?.informationUserTo?.avatar}
              name={chatByUser?.informationUserTo?.firstName}
              lastName={chatByUser?.informationUserTo?.lastName}
              time={message.hour}
              fromSelf={message.fromSelf}
            />
          ))}
      </div>
      <SendMessage
        informationTo={chatByUser.informationUserTo}
        scrollLastMessage={scrollLastMessage}
      />
    </section>
  );
}

const avatars = [
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];

export default Messages;
