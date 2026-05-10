import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/apiBase";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/user/admin_auth");
      console.log(res);

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return <div>{ok ? <Outlet /> : <Spinner />}</div>;
};

export default AdminRoute;