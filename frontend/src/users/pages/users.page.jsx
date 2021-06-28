import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook.js";
import LoadingSpinner from "../../shared/uiElements/LoadingSpinner.jsx";
import ErrorModal from "../../shared/uiElements/ErrorModal.jsx";
import UserList from "../component/userList/userList.component.jsx";
import "./users.styles.css";

const User = () => {
  const { isLoading, errMsg, sendRequest, errorHandler } = useHttpClient();
  const [loadedUser, setLoadedUser] = useState();
  useEffect(() => {
    const fetchUser = async () =>{
      try {
        const data = await sendRequest("http://localhost:5000/api/users");
  
        setLoadedUser(data.users);
      } catch (err) {}
    }
    fetchUser();
  }, [sendRequest]);
 
  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="center">{isLoading && <LoadingSpinner />}</div>
      <div className="center">
        {loadedUser ? <UserList items={loadedUser} /> : <LoadingSpinner />}
      </div>
    </React.Fragment>
  );
};

export default User;
