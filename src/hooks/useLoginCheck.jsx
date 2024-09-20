import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useLoginCheck = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const userLogin = useSelector(state => state.userReducer.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin && !modalVisible) {
      setModalVisible(true);
    }
  }, [userLogin, modalVisible]);

  const handleModalOk = () => {
    setModalVisible(false);
    navigate('/login');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    navigate('/')
  };

  const ModalComponent = (
    <Modal
      title="Cảnh báo"
      open={modalVisible}
      onOk={handleModalOk}
      onCancel={handleModalCancel}
      okText="OK"
      cancelText="Cancel"
    >
      Bạn cần đăng nhập để xem nội dung này!
    </Modal>
  );

  return { ModalComponent };
};

export default useLoginCheck;
