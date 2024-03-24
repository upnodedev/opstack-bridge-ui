import styled from 'styled-components';

interface Props extends SimpleComponent {}

const ConnectWalletButtonWrapper = styled.div``;

function ConnectWalletButton(props: Props) {
  return (
    <ConnectWalletButtonWrapper className='h-12 flex gap-4'>
      <w3m-network-button />
      <w3m-button />
    </ConnectWalletButtonWrapper>
  );
}

export default ConnectWalletButton;
