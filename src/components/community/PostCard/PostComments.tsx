import React, { useState, useEffect } from "react";
import { Send, User as UserIcon } from "lucide-react";
import styles from "./postcard.module.css";
import { useAuth } from "../../../context/AuthContext";
import { api } from "../../../db/api";
import SfLoading from "../../loading/slfLoad";

interface Comment {
  _id: string;
  userId: string;
  uName: string;
  uProfile: string;
  text: string;
  createdAt: string;
}

export default function PostComments({ postId }: { postId: string }) {
  const { token, profData, logout } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${api}/community/comments/${postId}`, {
          headers: { authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        
        // Robust JWT check
        const message = data?.message?.toLowerCase() || "";
        if (message.includes("jwt expired") || response.status === 401 || response.status === 403) {
            logout();
            return;
        }

        if (data?.success) {
          setComments(data.comments || []);
        }
      } catch (error) {
        console.error("Failed to fetch comments", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) fetchComments();
  }, [postId, token, logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${api}/community/comment/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newComment }),
      });

      const data = await response.json();

      // Robust JWT check
      const message = data?.message?.toLowerCase() || "";
      if (message.includes("jwt expired") || response.status === 401 || response.status === 403) {
          logout();
          return;
      }

      if (data?.success) {
        setComments((prev) => [...prev, data.comment]);
        setNewComment("");
      }
    } catch (error) {
      console.error("Failed to post comment", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.commentSection}>
      <div className={styles.commentList}>
        {isLoading ? (
          <div className={styles.commentLoading}>
            <SfLoading />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className={styles.commentItem}>
              <img
                src={comment.uProfile || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.uName}`}
                alt={comment.uName}
                className={styles.commentAvatar}
              />
              <div className={styles.commentBody}>
                <div className={styles.commentHeader}>
                  <span className={styles.commentUser}>{comment.uName}</span>
                  <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
                </div>
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noComments}>No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className={styles.commentForm}>
        <img
          src={(profData as any)?.profile?.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profData?.name}`}
          alt="Me"
          className={styles.commentFormAvatar}
        />
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isSubmitting}
          />
          <button type="submit" disabled={!newComment.trim() || isSubmitting}>
            {isSubmitting ? <SfLoading /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}
