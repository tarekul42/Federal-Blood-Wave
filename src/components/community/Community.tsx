import React, { useEffect, useState, useRef, useCallback } from "react";
import CreatePost from "./createPost/createPost";
import styles from "./community.module.css";
import { api } from "../../db/api";
import Loading from "../loading/loading";
import PostCard from "./PostCard/PostCard";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const Community = () => {
  const { t } = useTranslation();
  const { profData, token } = useAuth();

  const [openCrp, setOpenCrp] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newPost, setNewPost] = useState<any>(null);

  const observer = useRef<IntersectionObserver | null>(null);

  // Last post observer for infinite scroll
  const lastPostRef = useCallback(
    (node: any) => {
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
          const existingIds = new Set(allPosts.map((p: any) => p._id));
          const uniquePosts = data.posts.filter((p: any) => !existingIds.has(p._id));
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
  }, [page, token]);

  // Add new post on top, avoiding duplicates
  useEffect(() => {
    if (newPost && newPost._id) {
      setAllPosts((prev: any[]) => {
        const exists = prev.some((p) => p._id === newPost._id);
        return exists ? prev : [newPost, ...prev];
      });
    }
  }, [newPost]);

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.community}>
          {/* Create Post Section */}
          <div className={styles.creatPost}>
            <div className={styles.openPost}>
              <img 
                src={(profData as any)?.profile?.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profData?.name}`} 
                alt="User" 
                className={styles.userAvatar} 
              />
              <input
                type="text"
                placeholder={t("community.share_experience") || "Share your blood donation experience...."}
                readOnly
                onClick={() => setOpenCrp(true)}
              />
            </div>
            {openCrp && (
              <CreatePost
                setOpen={setOpenCrp}
                setNewPost={setNewPost}
              />
            )}
          </div>

          <div className={styles.feedHeader}>
             <hr />
             <span className={styles.feedTitle}>{t("community.latest_posts") || "Latest Posts"}</span>
             <hr />
          </div>

          {/* Posts Feed */}
          <div className={styles.allPost}>
            {[...new Map(allPosts.map((p: any) => [p._id, p])).values()].map(
              (post: any, index, arr) =>
                index === arr.length - 1 ? (
                  <div ref={lastPostRef} key={post._id} style={{ width: '100%' }}>
                    <PostCard data={post} />
                  </div>
                ) : (
                  <PostCard data={post} key={post._id} />
                )
            )}
          </div>

          {isLoading && (
            <div className={styles.loadingMore}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Community;
