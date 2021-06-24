import React, { useRef } from "react";
import CustomButton from "./customButton.component";
import "./imageUpload.styles.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const imageHandler = (event) => {
    event.preventDefault();
    console.log(event.target);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const submitHandler = () => {
    return false;
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={imageHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="preview" />
        </div>
        <CustomButton button onClick={pickImageHandler}>
          Pick Image
        </CustomButton>
      </div>
    </div>
  );
};

export default ImageUpload;
