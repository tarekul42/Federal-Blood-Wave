import React, { useState } from "react";
import styles from "./createPost.module.css";
import { api } from "../../../db/api";
import SfLoading from "../../loading/slfLoad";
import Popup from "../../popup/popup";
import { useAuth } from "../../../context/AuthContext";

export default function CreatePost({ setOpen, setNewPost }) {
  const {  token } = useAuth();

  const [caption, setCaption] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [popInfo, setPopInfo] = useState({
    trigger: null,
    type: null,
    message: null,
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);

    setImageFiles(files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImages(imageURLs);
  };

  const cutImg = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formData = new FormData();
  formData.append("caption", caption);
  for (let i = 0; i < imageFiles.length; i++) {
    formData.append("postImgs", imageFiles[i]);
  }
  const handleSubmit = async (e) => {
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
    <div className={styles.createPost} onClick={() => setOpen(false)}>
      <div className={styles.formCont}>
        <div className={styles.close}>
          <button onClick={() => setOpen(false)}>❌</button>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className={styles.input}
            />

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
        </div>
      </div>
      <Popup popInfo={popInfo}/>
    </div>
  );
}
