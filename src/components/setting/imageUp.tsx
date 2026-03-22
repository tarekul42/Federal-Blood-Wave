import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Popup from "../popup/popup";
import SfLoading from "../loading/slfLoad";
import { api } from "../../db/api";
import { useAuth } from "../../context/AuthContext";

const ImageUp = () => {
  const { profData ,token} = useAuth();

  const [dp, setDp] = useState<File | null>(null);
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

  const [image, setImage] = useState({
    currentProfile: "",
    newProfile: "",
  });

  const { currentProfile, newProfile } = image;

  useEffect(() => {
    if (profData) {
      setImage({
        ...image,
        currentProfile: profData?.image || "",
      });
    }
  }, [profData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);

    setDp(files[0]);
    // Create previews for the selected images
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImage({
      ...image,
      newProfile: previews[0],
    });
  };

  const formData = new FormData();
  if (dp) {
    formData.append("donorImg", dp);
  }

  const handlePhotoUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dp) return;
    setIsLoading(true);

    try {
      const respons = await fetch(`${api}/donor/update/photo`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await respons.json();

      setPopInfo({
        trigger: Date.now(),
        type: data?.success,
        message: data?.message,
      });

      if (data?.success === true) {
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setPopInfo({
        trigger: Date.now(),
        type: false,
        message: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <form onSubmit={handlePhotoUpdate} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <h3><span role="img" aria-label="avatar">🖼️</span> Profile Picture</h3>
        
        <div className={styles.imagePreviewWrapper}>
          {(newProfile || currentProfile) ? (
            <img
              src={newProfile ? newProfile : currentProfile}
              alt={`profile`}
              className={styles.profileImage}
            />
          ) : (
            <div className={styles.profileImage} style={{ backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#cbd5e1' }}>
              👤
            </div>
          )}

          <div className={styles.fileInputWrapper}>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className={styles.fileInput}
              id="avatar-upload"
            />
          </div>
        </div>

        <button type="submit" className={styles.submitBtn} disabled={isLoading || !dp} style={{ marginTop: 'auto' }}>
          {isLoading ? <SfLoading /> : "Upload New Photo"}
        </button>
        <Popup popInfo={popInfo} />
      </form>
  );
};

export default ImageUp;
