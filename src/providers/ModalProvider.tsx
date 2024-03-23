import { useModal } from '@states/modal/hooks';

interface Props extends SimpleComponent {}

function ModalProvider(props: Props) {
  const modal = useModal();

  if (!modal.open) return null;

  if (!modal.component) return null;

  return <>{modal.component}</>;
}

export default ModalProvider;
