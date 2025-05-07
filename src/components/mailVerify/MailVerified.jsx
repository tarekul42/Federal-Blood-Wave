import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "../../db/api";
import Loading from "../loading/loading";

const MailVerified = () => {
  const [searchIndex] = useSearchParams();
  const token = searchIndex.get("token");

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(`${api}/donor/verifyMail/${token}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setMsg(res.message);
        } else {
          alert(res.message);
          navigate("/profile");
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [token]);
  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {msg && (
            <h1
              style={{
                color: "greenyellow",
                fontSize: "2.3rem",
                fontWeight: "bold",
                fontFamily: "monospace",
              }}
            >
              {msg}
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default MailVerified;
