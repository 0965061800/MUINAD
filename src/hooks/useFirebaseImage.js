import { useState } from "react";
import { db } from "../firebase-app/firebase-config";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function useFirebaseImage(
    setValue,
    getValues,
    imageUrlName = null,
    imageName = null,
    cb = null,
) {
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState("");
    if (!setValue || !getValues) return;
    const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing at all");
        }
      },
      (error) => {
        console.log("Error");
        setImage("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(imageUrlName);
          console.log("File available at", downloadURL);
          setValue(imageUrlName,downloadURL);
          setImage(downloadURL);
          console.log(2);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue(imageName, file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      "images/" + (getValues(imageName))
    );
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage("");
        setProgress(0);
        console.log(1);
        cb && cb();
      })
      .catch((error) => {
        console.log("handleDeleteImage ~ error", error);
        console.log("Can not delete image");
        setImage("");
      });
  };
  const handleResetUpload = () => {
    setImage("");
    setProgress(0);
  };
  return {
    image,
    setImage,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  };
}
