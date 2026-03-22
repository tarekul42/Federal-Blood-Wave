import React, { useState } from "react";
import { X, Image, Send } from "lucide-react";
import styles from "./createPost.module.css";
import { api } from "../../../db/api";
import SfLoading from "../../loading/slfLoad";
import Popup from "../../popup/popup";
import { useAuth } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function CreatePost({ setOpen, setNewPost }: { setOpen: any; setNewPost: any }) {
  const { t } = useTranslation();
  const { profData, token, logout } = useAuth();

  const [caption, setCaption] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [popInfo, setPopInfo] = useState<{
    trigger: number | null;
    type: boolean | null;
    message: string | null;
  }>({
    trigger: null,
    type: null,
    message: null,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5);

    setImageFiles(files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(imageURLs);
  };

  const cutImg = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formData = new FormData();
  formData.append("caption", caption);
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append("postImgs", imageFiles[i]);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${api}/community/createPost`, {
        method: "POST",
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
          setNewPost(getData?.post);
          setOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={() => setOpen(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{t("community.create_post") || "Create Post"}</h2>
          <button className={styles.closeBtn} onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.userInfo}>
           <img 
            src={(profData as any)?.profile?.img || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profData?.name}`} 
            alt="User" 
            className={styles.userAvatar} 
          />
          <div className={styles.userName}>
            <h3>{profData?.name}</h3>
            <span>{t("community.posting_publicly") || "Posting publicly"}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
           <textarea
            className={styles.textarea}
            placeholder={t("community.write_experience") || "Write your experience..."}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>

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

          <div className={styles.formFooter}>
            <div className={styles.addPhotos}>
              <label htmlFor="post-images" className={styles.photoLabel}>
                <Image size={20} />
                <span>{t("community.add_photos") || "Add Photos"}</span>
              </label>
              <input
                id="post-images"
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
              disabled={isLoading || (!caption.trim() && imageFiles.length === 0)}
            >
              {isLoading ? <SfLoading /> : (
                <>
                  <Send size={18} />
                  <span>{t("community.post") || "Post"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      <Popup popInfo={popInfo}/>
    </div>
  );
}
