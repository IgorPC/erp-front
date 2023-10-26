import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import ProfilePictureProps from './ProfilePictureProps';

const ProfilePicture: React.FC <ProfilePictureProps> = (props) => {

    let hasPhoto = true
    let photo = props.pictureUrl

    if (! photo) {
        hasPhoto = false
        photo = "https://img.freepik.com/vetores-gratis/ilustracao-de-homem-negocios_53876-5856.jpg"
    }

  return (
    <div style={{padding: '1rem',display: 'grid', placeItems: 'center'}}>
    <Card sx={{ maxWidth: 450 }}>
      <CardMedia
        component="img"
        alt="Profile Picture"
        height="300"
        image={photo}
      />
      <CardActions>
        <Button disabled={! hasPhoto} size="medium">Download</Button>
        <Button size="medium">Change Profile Picture</Button>
      </CardActions>
    </Card>
    </div>

  );
}

export default ProfilePicture