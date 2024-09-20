import React, { useState } from 'react';
import { Upload, Button } from 'antd';
import { http } from '../util/setting';
import { useDispatch, useSelector } from 'react-redux';
import { updateAvatarActionAsync } from '../Redux/reducers/userReducer';
import avatarDefault from '../assets/img/avatar_default.jpg';

const UpdateAvatar = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.userReducer);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(profile?.avatar || avatarDefault);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await http.post('https://apistore.cybersoft.edu.vn/api/Users/uploadavatar', formData);
      setAvatar(response.data.content.avatar);
      dispatch(updateAvatarActionAsync(response.data.content));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectFile = (info) => {
    const selectedFile = info.file;
    setFile(selectedFile);

    const objectURL = URL.createObjectURL(selectedFile);
    setAvatar(objectURL);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: 100, height: 100, margin: 'auto' }}>
        <img
          src={avatar}
          alt="Avatar"
          className="rounded-circle img-fluid"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', 
            borderRadius: '50%', 
          }}
        />
      </div>
      <Upload
        className='d-flex justify-content-center mt-2'
        onChange={handleSelectFile}
        beforeUpload={() => false}
        showUploadList={false} 
      >
        <Button>Edit</Button>
      </Upload>
    </div>
  );
};

export default UpdateAvatar;