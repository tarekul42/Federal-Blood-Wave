import React, { useEffect, useState } from "react";
import styles from "./editP.module.css";
import Loading from "../../loading/loading";
import { api } from "../../../db/api";
import SfLoading from "../../loading/slfLoad";
import Popup from "../../popup/popup";
import { useAuth } from "../../../context/AuthContext";

const EditP = ({ open, setOpen, postData, setPostData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth();

  let { photos = [], _id } = postData ? postData : {};

  const [caption, setCaption] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  useEffect(() => {
    if (postData?.caption) {
      setCaption(postData?.caption);
    }
  }, [postData]);

  const handleImageChange = (e) => {
    const lastIdxOfImg = 5 - photos?.length;
    const files = Array.from(e.target.files).slice(0, lastIdxOfImg);

    setImageFiles(files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(imageURLs);
  };

  /* cut input image -->*/
  const cutImg = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* @delete Prev posted image--> */

  const [deleteImgLoad, setDeleteImgLoad] = useState(null);
  const deleteImage = async (photoId) => {
    setDeleteImgLoad(photoId);
    try {
      const response = await fetch(
        `${api}/community/imgae/delete/${_id}/${photoId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const getData = await response.json();

      if (getData?.success === true) {
        setPostData((prev) => ({
          ...prev,
          photos: prev.photos?.filter((img) => img?.imgId !== photoId),
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDeleteImgLoad(null);
    }
  };
  //   console.log(photos);

  /* Update fuction---> */
  const formData = new FormData();
  formData.append("caption", caption);
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append("postImgs", imageFiles[i]);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${api}/community/update/${_id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const getData = await response.json();
      setPopInfo({
        trigger: Date.now(),
        type: getData?.success,
        message: getData?.message,
      });

      if (getData?.success === true) {
        setTimeout(() => {
          setOpen(false);
          setPostData({});
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  //   console.log(postData);
  const handleClose = () => {
    setOpen(false);
    setPostData({});
  };

  //   Body startS--->
  return (
    <div
      className={styles.modal}
      style={{ display: open ? "flex" : "none" }}
      onClick={handleClose}
    >
      <div className={styles.close}>
        <button className={styles.closeBtn} onClick={handleClose}>
          ❌
        </button>
      </div>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        {isLoading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className={styles.input}
            />

            {/* Input added photo */}
            {images && (
              <div className={styles.imagePreview}>
                {images?.map((img, idx) => (
                  <div key={idx}>
                    <button
                      type="button"
                      className={styles.cutImg}
                      onClick={() => cutImg(idx)}
                    >
                      ❌
                    </button>
                    <img src={img} alt={`uploaded-${idx}`} />
                  </div>
                ))}
              </div>
            )}

            {/* Previous posted photo added photo */}

            {photos && (
              <div className={styles.imagePreview}>
                {photos?.map((i, idx) => (
                  <div key={i?.imgId}>
                    <button
                      type="button"
                      className={styles.cutImg}
                      onClick={() => deleteImage(i?.imgId)}
                    >
                      {deleteImgLoad === i?.imgId ? <SfLoading /> : "❌"}
                    </button>
                    <img src={i?.photo} alt={`prev photo-${idx}`} />
                  </div>
                ))}
              </div>
            )}

            <textarea
              className={styles.textarea}
              rows="8"
              placeholder="Write your experience..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? <SfLoading /> : "Post"}
            </button>
          </form>
        )}
      </div>
      <Popup popInfo={popInfo} />
    </div>
  );
};

export default EditP;
