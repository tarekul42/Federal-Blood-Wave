import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import styles from "./postcard.module.css";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../db/api";

export default function PostLike({ postId, pLikes }: { postId: string; pLikes: string[] }) {
  const { profData, token, logout } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(pLikes);

  useEffect(() => {
    setLiked(pLikes.includes(profData?._id as string));
  }, [profData, pLikes]);

  const handleClick = async () => {
    const prevLiked = liked;
    const prevLikes = likes;
    
    // Optimistic update
    setLiked(!prevLiked);
    if (!prevLiked) {
      setLikes([...prevLikes, profData?._id as string]);
    } else {
      setLikes(prevLikes.filter(id => id !== profData?._id));
    }

    try {
      const response = await fetch(`${api}/community/like/${postId}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      const message = data?.message?.toLowerCase() || "";

      if (message.includes("jwt expired") || response.status === 401 || response.status === 403) {
        logout();
        return;
      }

      if (data?.likes) {
        setLikes(data.likes);
        setLiked(data.likes.includes(profData?._id));
      }
    } catch (err) {
      console.error("Like failed", err);
      // Rollback on error
      setLiked(prevLiked);
      setLikes(prevLikes);
    }
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.iconBtn} ${liked ? styles.liked : ""}`}
        onClick={handleClick}
        aria-label={liked ? "Unlike" : "Like"}
      >
        <Heart size={20} fill={liked ? "currentColor" : "none"} />
      </button>
      <span className={styles.likeText}>
        {likes.length > 0 ? `${likes.length} ${likes.length === 1 ? 'like' : 'likes'}` : ""}
      </span>
    </div>
  );
}
