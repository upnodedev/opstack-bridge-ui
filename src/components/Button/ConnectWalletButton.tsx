import styled from 'styled-components';

interface Props extends SimpleComponent {}

const ConnectWalletButtonWrapper = styled.div``;

function ConnectWalletButton(props: Props) {
  return (
    <ConnectWalletButtonWrapper className='h-12'>
      <w3m-button />
    </ConnectWalletButtonWrapper>
  );
}

export default ConnectWalletButton;
