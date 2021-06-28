import React, { useRef,useState,useEffect } from "react";
import CustomButton from "./customButton.component";
import "./imageUpload.styles.css";

const ImageUpload = (props) => {
    const [file,setFile] = useState();
    const [previewUrl,setPreviewUrl] = useState();
    const [isValid,setIsValid] = useState(false);
  const filePickerRef = useRef();
  useEffect(()=>{
    if(!file){
        return
    }
    const fileReader = new FileReader();
    fileReader.onload = () =>{
        setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file);
  },[file])
  const imageHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if(event.target.files && event.target.files.length === 1){
        pickedFile = event.target.files[0];
        setFile(pickedFile);
        setIsValid(true);
        fileIsValid = true;
    }else{
        setIsValid(false);
        fileIsValid=false;
    }
    props.onInput(props.id,pickedFile,fileIsValid);
  };
  const pickImageHandler = () => {
    filePickerRef.current.click();
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
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p className="center">Please pick a image</p>}
        </div>
        <CustomButton button onClick={pickImageHandler}>
          Pick Image
        </CustomButton>
      </div>
    </div>
  );
};

export default ImageUpload;
