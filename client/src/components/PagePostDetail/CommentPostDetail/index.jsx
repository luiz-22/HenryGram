import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import logoMatch from "../../../assets/coheteHenry.png";
import Comments from "../../PageHome/Comments/Comments";
import SkeletonUser from "../../Skeletons/skeletonUser";
import CardComment from "../CardComment";
function CommentPostDetail({ comments }) {
  // const [page, setPage] = useState(0);
  // const handleScroll = () => {
  //   if (
  //     document.getElementById("viewHeightComment").clientHeight +
  //       document.getElementById("viewHeightComment").scrollTop >=
  //     document.getElementById("viewHeightComment").scrollHeight
  //   ) {
  //     comment = [...comment, ...comment];
  //     console.log("llegue");
  //   }
  // };
  const userInformation = useSelector((state) => state.userInformation);
  const [commentFront, setCommentFront] = useState([]);
  function scrollLastMessage() {
    var objDiv = document.getElementById("viewHeightComment");
    objDiv.scrollTop = 0;
  }
  const handleSendCommentFront = (message) => {
    setCommentFront([...commentFront, message]);
    scrollLastMessage();
  };
  const { id } = useParams();
  useEffect(() => {
    document.getElementById("viewHeightComment");
    // .addEventListener("scroll", handleScroll);

    return () => {
      if (document.getElementById("viewHeightComment")) {
        document.getElementById("viewHeightComment");
        // .removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div className="w-full flex gap-14 mt-5 mb-5 justify-center items-center border-y border-neutral-700 py-4">
        <i className="bi bi-hand-thumbs-up text-3xl text-yellow"></i>
        <i className="bi bi-chat-square-dots text-3xl text-yellow"></i>
        {/* {type === "Match" && ( */}
        <img src={logoMatch} alt="match" className="w-8 h-8" />
        {/* )} */}
      </div>
      <Comments postId={id} handleSendCommentFront={handleSendCommentFront} />
      <div
        id="viewHeightComment"
        className="xl:h-[calc(100vh-21rem)] mt-6 xl:overflow-y-scroll"
      >
        {commentFront.length &&
          commentFront.map((comment, index) => (
            <CardComment
              key={index}
              userId={userInformation?._id}
              firstName={userInformation?.firstName}
              lastName={userInformation?.lastName}
              avatar={userInformation?.avatar}
              comment={comment}
            />
          ))}
        {comments?.length ? (
          comments.map((user) => (
            <CardComment
              key={user._id}
              userId={user.comment.userId}
              firstName={user.firstName}
              lastName={user.lastName}
              avatar={user.avatar}
              comment={user.comment.description}
            />
          ))
        ).reverse() : (
          <span className="text-sm text-center block uppercase">
            Be the first to comment 🙂
          </span>
        )}
        {!comments &&
          [1, 2, 3, 4, 5].map((value) => <SkeletonUser key={value} />)}
      </div>
    </>
  );
}

export default CommentPostDetail;
