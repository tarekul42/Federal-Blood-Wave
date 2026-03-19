import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Popup from "../popup/popup";
import SfLoading from "../loading/slfLoad";
import { api } from "../../db/api";
import { useAuth } from "../../context/AuthContext";

const ImageUp = () => {
  const { profData ,token} = useAuth();

  const [dp, setDp] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popInfo, setPopInfo] = useState({
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
        currentProfile: profData?.profile?.img,
      });
    }
  }, [profData]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);

    setDp(e.target.files[0]);
    // Create previews for the selected images
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setImage({
      ...image,
      newProfile: previews[0],
    });
  };

  const formData = new FormData();
  formData.append("donorImg", dp);

  const handlePhotoUpdate = async (e) => {
    e.preventDefault();
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
    <section>
      {/* Profile Photo Update */}
      <form onSubmit={handlePhotoUpdate} className={styles.formCard}>
        <h3>🖼️ Update Profile Picture</h3>
        <div>
          {(newProfile || currentProfile) && (
            <img
              src={newProfile ? newProfile : currentProfile}
              alt={`profile`}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px solid #d80032",
                backgroundColor: "#0da533",
              }}
            />
          )}
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <SfLoading /> : "Update Photo"}
        </button>
      </form>
      <Popup popInfo={popInfo} />
    </section>
  );
};

export default ImageUp;
