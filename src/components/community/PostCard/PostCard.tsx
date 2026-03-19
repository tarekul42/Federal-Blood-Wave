import React, { useState, useEffect } from "react";
import styles from "./postcard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboard,
  faDotCircle,
  faPencilAlt,
  faShare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import PostLike from "./postLike";
import EditP from "../editPost/EditP";
import { api } from "../../../db/api";
import Popup from "../../popup/popup";
import SfLoading from "../../loading/slfLoad";
import {
  faFacebook,
  faLinkedin,
  faSquareWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { useAuth } from "../../../context/AuthContext";

const PostCard = ({ data }) => {

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
  // console.log(data);
  const { profData ,token} = useAuth();
  const [currIndex, setCurrIndex] = useState(0);

  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  // Format date
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString("en-US");

  // Handle ActionBar toggle
  const [actionBarControl, setActionBarControl] = useState(false);
  const handleActionBar = (id) => {
    if (id === _id) {
      setActionBarControl((prev) => !prev);
      setisShareOpen(false);
    }
  };
  const [isShareOpen, setisShareOpen] = useState(false);
  const handleShareOpen = (id) => {
    if (id === _id) {
      setisShareOpen((prev) => !prev);
    }
  };
  // Hide action bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
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

  const handleEditOpen = (pId) => {
    if (pId === _id) {
      setEditOpen(true);
      setPostData({ _id, caption, photos });
    }
  };
  const [deleteLoading, setDeleteLoad] = useState(null);
  const deletePost = async (postId) => {
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
  const openShareWindow = (url) => {
    window.open(
      url,
      "_blank",
      "toolbar=no,scrollbars=yes,resizable=yes,top=100,left=500,width=600,height=500"
    );
  };
  return (
    <div className={styles.postCard}>
      <div className={styles.postUp}>
        <div className={styles.useInfo}>
          <div className={styles.userImg}>
            <img src={uProfile} alt={`${uName} profile`} />
          </div>
          <div className={styles.userD}>
            <h3>{uName}</h3>
            <p>{formatDate(createdAt)}</p>
          </div>
        </div>
        <div className={styles.postAct}>
          <button className={styles.cntrl} onClick={() => handleActionBar(_id)}>
            <FontAwesomeIcon icon={faDotCircle} />
            <FontAwesomeIcon icon={faDotCircle} />
            <FontAwesomeIcon icon={faDotCircle} />
          </button>

          <ul
            className={styles.actionBar}
            style={{ display: actionBarControl ? "flex" : "none" }}
          >
            {deleteLoading ? (
              <SfLoading />
            ) : (
              <>
                {profData?._id === userId && (
                  <>
                    <li>
                      <Link to="#" onClick={() => handleEditOpen(_id)}>
                        <button>
                          <FontAwesomeIcon icon={faPencilAlt} /> Edit
                        </button>
                      </Link>
                    </li>

                    <li>
                      {/* <Link to="#" > */}
                      <button onClick={() => deletePost(_id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                      {/* </Link> */}
                    </li>
                  </>
                )}

                <li>
                  <Link to="#">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/post/${_id}`
                        );
                        setPopInfo({
                          trigger: Date.now(),
                          type: true,
                          message: "Link copied to clipboard!",
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faClipboard} /> Copy Link
                    </button>
                  </Link>
                </li>

                <li>
                  {/* <Link to="#"> */}
                  <button onClick={() => handleShareOpen(_id)}>
                    <FontAwesomeIcon icon={faShare} /> Share
                  </button>
                  {/* </Link> */}
                </li>
              </>
            )}
          </ul>

          <div
            className={styles.shareOpt}
            style={{ display: isShareOpen ? "flex" : "none" }}
          >
            <button onClick={() => openShareWindow(shareLinks?.facebook)}>
              <FontAwesomeIcon icon={faFacebook} />
            </button>

            <button onClick={() => openShareWindow(shareLinks?.twitter)}>
              <FontAwesomeIcon icon={faXTwitter} />
            </button>

            <button onClick={() => openShareWindow(shareLinks?.linkedIn)}>
              <FontAwesomeIcon icon={faLinkedin} />
            </button>

            <button onClick={() => openShareWindow(shareLinks?.whatsapp)}>
              <FontAwesomeIcon icon={faSquareWhatsapp} />
            </button>
          </div>
        </div>
      </div>

      <hr className={styles.hr} />

      <div className={styles.postMidle}>
        <div className={styles.caption}>
          <pre>{caption.trim()}</pre>
        </div>

        {photos?.length > 0 && (
          <div className={styles.photos}>
            <button
              className={styles.preBtn}
              onClick={previous}
              disabled={currIndex === 0}
            >
              &#10094;
            </button>
            <div className={styles.images}>
              <img
                src={photos[currIndex]?.photo}
                alt={`post-${currIndex + 1}`}
              />
            </div>
            <button
              className={styles.nextBtn}
              onClick={next}
              disabled={currIndex === photos.length - 1}
            >
              &#10095;
            </button>
          </div>
        )}
      </div>

      <hr className={styles.hr} />

      <div className={styles.postDown}>
        <PostLike pLikes={likes} postId={_id} />
      </div>
      <EditP
        open={editOpen}
        setOpen={setEditOpen}
        postData={postData}
        setPostData={setPostData}
      />
      <Popup popInfo={popInfo} />
    </div>
  );
};

export default PostCard;
