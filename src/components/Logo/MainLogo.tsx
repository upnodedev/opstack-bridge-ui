import styled from "styled-components";

interface Props extends SimpleComponent {}

const MainLogoWrapper = styled.div``;

function MainLogo(props: Props) {
  return (
    <MainLogoWrapper>
      <div className="flex">

        <div>
          <img src="/logo.svg" className="h-8"></img>
        </div>
      </div>
    </MainLogoWrapper>
  );
}

export default MainLogo;
