import React, { useEffect, useState } from "react";
import styles from "./editP.module.css";
import Loading from "../../loading/loading";
import { api } from "../../../db/api";
import SfLoading from "../../loading/slfLoad";
import Popup from "../../popup/popup";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { X, Image, Send, Trash2 } from "lucide-react";

const EditP = ({ open, setOpen, postData, setPostData }: { open: boolean; setOpen: any; postData: any; setPostData: any }) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const { profData, token, logout } = useAuth();

  let { photos = [], _id } = postData ? postData : {};

  const [caption, setCaption] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [popInfo, setPopInfo] = useState<{
    trigger: number | null;
    type: boolean | null;
    message: string | null;
  }>({
    trigger: null,
    type: null,
    message: null,
  });

  useEffect(() => {
    if (postData?.caption) {
      setCaption(postData?.caption);
    }
  }, [postData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);

    setImageFiles(files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(imageURLs);
  };

  /* cut input image -->*/
  const cutImg = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  /* @delete Prev posted image--> */

  const [deleteImgLoad, setDelImgLoad] = useState<string | null>(null);
  const deleteImage = async (photoId: string) => {
    setDelImgLoad(photoId);
    try {
      const response = await fetch(
        `${api}/community/post/photo/delete/${_id}/${photoId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });
      if (data?.success) {
        setPostData((prev: any) => ({
          ...prev,
          photos: prev.photos.filter((img: any) => img.imgId !== photoId),
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDelImgLoad(null);
    }
  };
  //   console.log(photos);

  /* Update fuction---> */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("postImgs", imageFiles[i]);
    }
    try {
      const response = await fetch(`${api}/community/update/${_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const getData = await response.json();
      const message = getData?.message?.toLowerCase() || "";

      if (message.includes("jwt expired") || response.status === 401 || response.status === 403) {
        logout();
        setOpen(false);
        return;
      }

      setPopInfo({
        trigger: Date.now(),
        type: getData?.success,
        message: getData?.message,
      });

      if (getData?.success === true) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
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
      className={styles.modalOverlay}
      style={{ display: open ? "flex" : "none" }}
      onClick={handleClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <Loading />
          </div>
        ) : (
          <>
            <div className={styles.modalHeader}>
              <h2>{t("community.edit_post") || "Edit Post"}</h2>
              <button className={styles.closeBtn} onClick={handleClose}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <textarea
                className={styles.textarea}
                placeholder={t("community.write_experience") || "Write your experience..."}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></textarea>

              <div className={styles.imagePreviewContainer}>
                {/* Previous posted photo added photo */}
                {photos?.length > 0 && (
                  <div className={styles.imagePreview}>
                    {photos.map((i: any, idx: number) => (
                      <div key={i?.imgId} className={styles.previewItem}>
                        <button
                          type="button"
                          className={styles.cutImg}
                          onClick={() => deleteImage(i?.imgId)}
                          title="Delete image"
                        >
                          {deleteImgLoad === i?.imgId ? <SfLoading /> : <Trash2 size={14} />}
                        </button>
                        <img src={i?.photo} alt={`prev photo-${idx}`} />
                      </div>
                    ))}
                  </div>
                )}

                {/* Input added photo */}
                {images.length > 0 && (
                  <div className={styles.imagePreview}>
                    {images.map((img, idx) => (
                      <div key={idx} className={styles.previewItem}>
                        <button
                          type="button"
                          className={styles.cutImg}
                          onClick={() => cutImg(idx)}
                        >
                          <X size={14} />
                        </button>
                        <img src={img} alt={`uploaded-${idx}`} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.formFooter}>
                <div className={styles.addPhotos}>
                  <label htmlFor="edit-post-images" className={styles.photoLabel}>
                    <Image size={20} />
                    <span>{t("community.add_more_photos") || "Add More"}</span>
                  </label>
                  <input
                    id="edit-post-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isLoading}
                >
                  {isLoading ? <SfLoading /> : (
                    <>
                      <Send size={18} />
                      <span>{t("common.update") || "Update"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
      <Popup popInfo={popInfo} />
    </div>
  );
};

export default EditP;
