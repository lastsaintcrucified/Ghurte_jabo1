import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/uiElements/LoadingSpinner.jsx";
import ErrorModal from "../../shared/uiElements/ErrorModal.jsx";
import UserList from "../component/userList/userList.component.jsx";
import "./users.styles.css";

const User = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [loadedUser, setLoadedUser] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message);
        }
        setLoadedUser(data.users);
        
      } catch (err) {
        setErrMsg(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);
  const errorHandler = () => {
    setErrMsg(null);
  };
  return (
    <React.Fragment>
      <ErrorModal error={errMsg} onClear={errorHandler} />
      <div className="center">
      {isLoading && <LoadingSpinner/>}
      </div>
      <div className="center">
        {loadedUser?<UserList items={loadedUser} />:<LoadingSpinner/>}
      </div>
    </React.Fragment>
  );
};

export default User;
