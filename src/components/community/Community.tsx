import React, { useEffect, useState, useRef, useCallback } from "react";
import CreatePost from "./createPost/createPost";
import styles from "./community.module.css";
import { api } from "../../db/api";
import Loading from "../loading/loading";
import PostCard from "./PostCard/PostCard";
import { useAuth } from "../../context/AuthContext";

const Community = () => {
  const { token } = useAuth();

  const [openCrp, setOpenCrp] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newPost, setNewPost] = useState(null);

  const observer = useRef();

  // Last post observer for infinite scroll
  const lastPostRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  // Fetch paginated posts
  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${api}/community/allPost?page=${page}&limit=10`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data?.success) {
          const existingIds = new Set(allPosts.map((p) => p._id));
          const uniquePosts = data.posts.filter((p) => !existingIds.has(p._id));
          setAllPosts((prev) => [...prev, ...uniquePosts]);
          setHasMore(data.hasMore);
        }
      } catch (err) {
        console.error("Fetch error", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [page]);

  // Add new post on top, avoiding duplicates
  useEffect(() => {
    if (newPost && newPost._id) {
      setAllPosts((prev) => {
        const exists = prev.some((p) => p._id === newPost._id);
        return exists ? prev : [newPost, ...prev];
      });
    }
  }, [newPost]);

  return (
    <div className={styles.community}>
      <div className={styles.creatPost}>
        <div className={styles.openPost}>
          <input
            type="text"
            value="Share your blood donation experience...."
            readOnly
            onClick={() => setOpenCrp(true)}
          />
        </div>
        {openCrp && (
          <CreatePost
            open={openCrp}
            setOpen={setOpenCrp}
            setNewPost={setNewPost}
          />
        )}
      </div>

      <hr />

      <div className={styles.allPost}>
        {[...new Map(allPosts.map((p) => [p._id, p])).values()].map(
          (post, index, arr) =>
            index === arr.length - 1 ? (
              <div ref={lastPostRef} key={post._id}>
                <PostCard data={post} />
              </div>
            ) : (
              <PostCard data={post} key={post._id} />
            )
        )}
      </div>
    </div>
  );
};

export default Community;
