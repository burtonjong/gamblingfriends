"use client";

import { uploadData } from "aws-amplify/storage";
import { useState } from "react";

import { StorageManager } from "@aws-amplify/ui-react-storage";
import "@aws-amplify/ui-react/styles.css";

export default function UserProfile() {
  const [file, setFile] = useState<File>();

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (file) {
        const result = await uploadData({
          path: `picture-submissions/${file.name}`,
          data: file,
        }).result;
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} required accept="image/*" />
      <button onClick={() => handleUpload()}>Upload</button>
      <StorageManager
        acceptedFileTypes={["image/*"]}
        path="picture-submissions/"
        maxFileCount={1}
        isResumable
        autoUpload={false}
      />
    </div>
  );
}
