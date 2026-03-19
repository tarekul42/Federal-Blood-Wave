import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import styles from "./postcard.module.css";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../db/api";

export default function PostLike({ postId, pLikes }) {
  const { profData ,token} = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(pLikes);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLiked(pLikes.includes(profData?._id));
  }, [profData, pLikes]);

  const handleClick = () => {
    setLiked(!liked); // Toggle like state

    fetch(`${api}/community/like/${postId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.likes?.find((i) => i === profData?._id)) {
          setLiked(true);
          setLikes(res?.likes);
          setMessage(res?.message);
        } else {
          setMessage(res?.message);
          setLikes(res?.likes);
          setLiked(false);
        }
      })
      .catch((err) => console.log(err));
  };
// console.log(message);
  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.iconBtn} ${liked ? styles.liked : ""}`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
      </button>
      <span className={styles.likeText}>
        {likes.length > 0 ? `${likes.length} likes` : ""}
      </span>
    </div>
  );
}
