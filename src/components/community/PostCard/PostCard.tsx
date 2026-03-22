import React, { useState, useEffect } from "react";
import styles from "./postcard.module.css";
import { Heart, Share2, MoreHorizontal, Pencil, Trash2, ChevronLeft, ChevronRight, Clipboard, Facebook, Linkedin, Twitter, MessageSquare, Clock } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { api } from "../../../db/api";
import PostLike from "./postLike";
import PostComments from "./PostComments";
import EditP from "../editPost/EditP";
import Popup from "../../popup/popup";
import SfLoading from "../../loading/slfLoad";
import { Link } from "react-router";

const PostCard = ({ data }: { data: any }) => {

  const {
    _id,
    uName,
    userId,
    photos = [],
    uProfile,
    createdAt,
    caption = "",
    likes,
  } = data;
  
  const { t } = useTranslation();
  const { profData, token } = useAuth();
  const [currIndex, setCurrIndex] = useState(0);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const [popInfo, setPopInfo] = useState<{
    trigger: number | null;
    type: boolean | null;
    message: string | null;
  }>({
    trigger: null,
    type: null,
    message: null,
  });

  // Format date
  const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("en-US");

  // Handle ActionBar toggle
  const [actionBarControl, setActionBarControl] = useState(false);
  const handleActionBar = (id: string) => {
    if (id === _id) {
      setActionBarControl((prev) => !prev);
      setisShareOpen(false);
    }
  };
  const [isShareOpen, setisShareOpen] = useState(false);
  const handleShareOpen = (id: string) => {
    if (id === _id) {
      setisShareOpen((prev) => !prev);
    }
  };
  // Hide action bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(`.${styles.postAct}`)) {
        setActionBarControl(false);
        setisShareOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Image slider
  const previous = () => {
    if (currIndex > 0) {
      setCurrIndex((prev) => prev - 1);
    }
  };

  const next = () => {
    if (currIndex < photos.length - 1) {
      setCurrIndex((prev) => prev + 1);
    }
  };

  const [editOpen, setEditOpen] = useState(false);
  const [postData, setPostData] = useState({});

  const handleEditOpen = (pId: string) => {
    if (pId === _id) {
      setEditOpen(true);
      setPostData({ _id, caption, photos });
    }
  };
  const [deleteLoading, setDeleteLoad] = useState<string | null>(null);
  const deletePost = async (postId: string) => {
    setDeleteLoad(postId);
    try {
      const response = await fetch(`${api}/community/delete/${postId}/`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const getData = await response.json();
      setPopInfo({
        trigger: Date.now(),
        type: getData?.success,
        message: getData?.message,
      });
      if (getData?.success === true) {
        setTimeout(() => {
          window.location.reload();
          setActionBarControl((prev) => !prev);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteLoad(null);
    }
  };

  /* Share Action---> */
  const shareUrl = encodeURIComponent(`${window.location.origin}/post/${_id}`);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    linkedIn: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${shareUrl}`,
    whatsapp: `https://wa.me/?text=${shareUrl}`,
  };
  const openShareWindow = (url: string) => {
    window.open(
      url,
      "_blank",
      "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=500,width=600,height=500"
    );
  };
  return (
    <article className={styles.postCard}>
      <div className={styles.postUp}>
        <div className={styles.useInfo}>
          <div className={styles.userImg}>
            <img src={uProfile || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uName}`} alt={`${uName}`} />
          </div>
          <div className={styles.userD}>
            <h3>{uName}</h3>
            <p className={styles.postDate}>
              <Clock size={12} /> {formatDate(createdAt)}
            </p>
          </div>
        </div>
        
        <div className={styles.postAct}>
          <button className={styles.cntrl} onClick={() => handleActionBar(_id)} aria-label="Post actions">
            <MoreHorizontal size={20} />
          </button>

          {actionBarControl && (
            <ul className={styles.actionBar}>
              {deleteLoading ? (
                <SfLoading />
              ) : (
                <>
                  {profData?._id === userId && (
                    <>
                      <li>
                        <button onClick={() => handleEditOpen(_id)}>
                          <Pencil size={14} /> {t("common.edit")}
                        </button>
                      </li>
                      <li>
                        <button onClick={() => deletePost(_id)} className={styles.deleteBtn}>
                          <Trash2 size={14} /> {t("common.delete")}
                        </button>
                      </li>
                    </>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/post/${_id}`);
                        setPopInfo({
                          trigger: Date.now(),
                          type: true,
                          message: t("community.link_copied") || "Link copied to clipboard!",
                        });
                        setActionBarControl(false);
                      }}
                    >
                      <Clipboard size={14} /> {t("community.copy_link") || "Copy Link"}
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setisShareOpen(!isShareOpen)}>
                      <Share2 size={14} /> {t("community.share") || "Share"}
                    </button>
                  </li>
                </>
              )}
            </ul>
          )}

          {isShareOpen && (
            <div className={styles.shareOpt}>
              <button onClick={() => openShareWindow(shareLinks?.facebook)} title="Facebook">
                <Facebook size={18} />
              </button>
              <button onClick={() => openShareWindow(shareLinks?.twitter)} title="X (Twitter)">
                <Twitter size={18} />
              </button>
              <button onClick={() => openShareWindow(shareLinks?.linkedIn)} title="LinkedIn">
                <Linkedin size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.postMidle}>
        <div className={styles.caption}>
          <pre>{caption.trim()}</pre>
        </div>

        {photos?.length > 0 && (
          <div className={styles.photos}>
            {photos.length > 1 && (
              <button
                className={styles.slideBtn + " " + styles.preBtn}
                onClick={previous}
                disabled={currIndex === 0}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <div className={styles.images}>
              <img
                src={photos[currIndex]?.photo}
                alt={`post-${currIndex + 1}`}
              />
            </div>
            {photos.length > 1 && (
              <button
                className={styles.slideBtn + " " + styles.nextBtn}
                onClick={next}
                disabled={currIndex === photos.length - 1}
              >
                <ChevronRight size={24} />
              </button>
            )}
            
            {photos.length > 1 && (
              <div className={styles.photoCount}>
                {currIndex + 1} / {photos.length}
              </div>
            )}
          </div>
        )}
      </div>

      <hr className={styles.hr} />

      <div className={styles.postDown}>
        <PostLike pLikes={likes} postId={_id} />
        <button 
          className={styles.commentBtn}
          onClick={() => setIsCommentOpen(!isCommentOpen)}
        >
           <MessageSquare size={20} />
           <span>{t("community.comment") || "Comment"}</span>
        </button>
      </div>

      {isCommentOpen && (
        <PostComments postId={_id} />
      )}
      <EditP
        open={editOpen}
        setOpen={setEditOpen}
        postData={postData}
        setPostData={setPostData}
      />
      <Popup popInfo={popInfo} />
    </article>
  );
};

export default PostCard;
