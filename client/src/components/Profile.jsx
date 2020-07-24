import React, { useState, useContext, useEffect } from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import wyncode from '../assets/images/Wyncode_icon.png';
import swal from 'sweetalert';

const Profile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [image, setImage] = useState(null);

  const handleImageSelect = async (e) => {
    const formData = new FormData();
    formData.append('upload_preset', 'todoapp');
    formData.append('file', e.target.files[0]);
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/wyncode/image/upload',
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      swal('Error', 'Oops, something went wrong.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedUser = await axios.patch('/api/users/me', {
        avatar: image
      });
      setCurrentUser(updatedUser.data);
    } catch (error) {
      swal('Error', 'Oops, something went wrong.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <h1 className="mt-4">Your Profile</h1>
      <div className="mt-4">
        <Image
          src={
            image ? image : currentUser?.avatar ? currentUser.avatar : wyncode
          }
          alt="profile-picture"
          width={250}
          height={250}
          roundedCircle
        />
      </div>
      <div className="mt-4">
        <form
          method="post"
          onSubmit={handleSubmit}
          className="d-flex flex-column"
        >
          <input type="file" onChange={handleImageSelect} />
          <Button type="submit" size="sm" className="mt-4">
            Save Image
          </Button>
        </form>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-4">
        <div className="d-flex ">
          <label htmlFor="name" className="pr-4 font-weight-bold">
            Name:
          </label>
          <p>{currentUser?.name}</p>
        </div>
        <div className="d-flex">
          <label htmlFor="email" className="pr-4 font-weight-bold">
            Email:
          </label>
          <p>{currentUser?.email}</p>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
