import { useAppDispatch } from '@states/hooks';
import { useModal } from '@states/modal/hooks';
import { ModalSlide } from '@states/modal/reducer';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';

interface Props extends SimpleComponent {
  value: string;
}

const ModalProviderWrapper = styled.div``;

function ModalTest(props: Props) {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOk = () => {
    closed();
  };

  const handleCancel = () => {
    closed();
  };

  const closed = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(ModalSlide.actions.closeModal());
    }, 500);
  };

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{props.value}</p>
    </Modal>
  );
}

export default ModalTest;
