import React, { useState } from 'react';
import { CLOUD_NAME, UPLOAD_PRESET } from '../../config/config';
import placeholder from '../../images/placeholder.jpg';
import { ImageSm } from '../Image';

const ImageUpload = ({url, setUrl}) => {
    const [load, setload ] = useState(false)
  
    const onImageChange = async (e) => {
      const file = e.target.files[0];
      console.log(file)
      setload(true)
      const formData = new FormData();

      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      const options = {
        method: 'POST',
        body: formData,
      };
  
      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, options)
        const image = await res.json();
        setUrl(image.public_id)
        setload(false)
      } catch (error) {
        throw new Error('upload failed')
      }
    }
    return (
      <div className="imageUploader">
        <div className="upload-btn-wrapper">
          <button className="btn">Upload Image</button>
          <input
            name="file"
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
          <p style={{ textAlign: "center" }}>{load && "uploading..."}</p>
        </div>
        <div className="img__container">
            <ImageSm url={url ? url : placeholder } />
        </div>
      </div>
    );
  }


export default ImageUpload;
