import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ProfilePictureProps from './ProfilePictureProps';
import Request from '../../requests/Request';
import CookieManager from '../../cookieManager/CookieManager';

const ProfilePicture: React.FC<ProfilePictureProps> = (props) => {
  const [photo, setPhoto] = useState("https://img.freepik.com/vetores-gratis/ilustracao-de-homem-negocios_53876-5856.jpg")

  useEffect(() => {
    if (props.pictureUrl) {
      setPhoto(props.pictureUrl)
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

  const upload = async () => {
    const fileInput: HTMLElement | null = document.getElementById('file-input');

    if (!fileInput) {
      return false
    }

    if (fileInput instanceof HTMLInputElement) {
      const uploader = fileInput.files

      if (uploader && uploader.length > 0) {
        const fileBase64 = await handleFile(uploader[0])
        const body = {
          file: fileBase64,
          mimeType: uploader[0].type
        }

        const userData = await CookieManager.getUserData()
        const response = await Request.put(`/profile-picture/${userData.id}`, body, true)
        
        if (response && response.data.success) {
          props.callback(true)
        }
      }
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
          <Button onClick={fireUploadEvent} size="medium">Change Profile Picture</Button>
          <input onChange={upload} hidden type="file" id="file-input" accept=".jpg, .jpeg, .png" />
        </CardActions>
      </Card>
    </div>

  );
}

export default ProfilePicture