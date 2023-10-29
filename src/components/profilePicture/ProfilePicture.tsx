import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import ProfilePictureProps from './ProfilePictureProps';
import Request from '../../requests/Request';
import CookieManager from '../../cookieManager/CookieManager';
import FileUploader from '../fileUploader/FileUploader';

const ProfilePicture: React.FC<ProfilePictureProps> = (props) => {
  const [photo, setPhoto] = useState("https://img.freepik.com/vetores-gratis/ilustracao-de-homem-negocios_53876-5856.jpg")
  const basePath = "http://127.0.0.1:8000/storage"

  useEffect(() => {
    if (props.pictureUrl) {
      setPhoto(basePath + props.pictureUrl)
    }
  }, [])

  const fireUploadEvent = () => {
    const fileInput = document.getElementById('file-input');

    if (!fileInput) {
      return false
    }

    fileInput.click();
  }

  const handleFile = async (file: any) => {
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        const base64String = event.target.result;
        resolve(base64String)
      };
  
      await reader.readAsDataURL(file);

    })
  }

  const upload = async (files: any) => {
    if (! files.length) {
      return false;
    }

    const validFormats = [
      "image/jpeg",
      "image/jpg",
      "image/png" 
    ]

    if (! validFormats.includes(files[0].mimeType)) {
        props.callback("Invalid Format, please update a JPEG, JPG or PNG image")
        return false;
    }

    const body = {
      file: files[0].file,
      mimeType: files[0].mimeType
    }

    const userData = await CookieManager.getUserData()
    const response = await Request.put(`/profile-picture/${userData.id}`, body, true)
    
    if (response && response.data.success) {
      props.callback("")
    }
  }

  return (
    <div style={{ padding: '1rem', display: 'grid', placeItems: 'center' }}>
      <Card sx={{ maxWidth: 450 }}>
        <CardMedia
          component="img"
          alt="Profile Picture"
          height="300"
          image={photo}
        />
        <CardActions>
         <FileUploader
          name='CHANGE PROFILE PICTURE'
          callback={upload}
          multiple={false}
         />
        </CardActions>
      </Card>
    </div>

  );
}

export default ProfilePicture