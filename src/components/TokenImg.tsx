import styled from "styled-components";

interface Props extends SimpleComponent {
  name: string;
  size?: number;
  url?: string;
}

const TokenImgWrapper = styled.div``;

function TokenImg({ name, size, url }: Props) {
  let urlImg = url;
  if (!urlImg) {
    urlImg = `/token/${name.toLowerCase()}.png`;
  }


  return (
    <TokenImgWrapper>
      <img
        src={urlImg}
        alt={name}
        width={size || 20}
        height={size || 20}
        onError={(e) => {
          e.currentTarget.src = `/icon/unchain.svg`;
        }}
      />
    </TokenImgWrapper>
  );
}

export default TokenImg;



