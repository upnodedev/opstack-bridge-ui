import SearchBox from "@components/SearchBox";
import { useOPTokens } from "@hooks/useOPTokens";
import { Icon } from "@iconify/react";
import { useAppDispatch } from "@states/hooks";
import { ModalSlide } from "@states/modal/reducer";
import { Token } from "@utils/opType";
import { Modal } from "antd";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import { Chain } from "viem";

export type TokenListDialogProps = {
  l1: Chain;
  l2: Chain;
  selectedToken: Token;
  onTokenChange: (l1Token: Token, l2Token: Token) => void;
};

const CryptoSelectWrapper = styled.div``;

function CryptoSelect({
  l1,
  l2,
  selectedToken,
  onTokenChange,
}: TokenListDialogProps) {
  const dispatch = useAppDispatch();

  const openCryptoModal = () => {
    dispatch(
      ModalSlide.actions.openModal({
        component: (
          <CryptoSelectModal
            l1={l1}
            l2={l2}
            selectedToken={selectedToken}
            onTokenChange={onTokenChange}
          />
        ),
      }),
    );
  };

  return (
    <CryptoSelectWrapper className="relative flex justify-center">
      <button
        onClick={openCryptoModal}
        className={`flex cursor-pointer items-center justify-center rounded-full bg-primary px-4 py-2 text-lg font-bold text-black transition-all hover:opacity-80 
       `}
      >
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full bg-white p-1`}
        >
          <img
            src={`${selectedToken.logoURI}`}
            alt={selectedToken.name}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="mx-2 h-6 w-[1.5px] bg-white"></div>
        <span>{selectedToken.symbol.toUpperCase()}</span>
        <Icon icon={"akar-icons:chevron-down"} className="ml-2" />
      </button>
    </CryptoSelectWrapper>
  );
}

function CryptoSelectModal({
  l1,
  l2,
  selectedToken,
  onTokenChange,
}: TokenListDialogProps) {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCancel = () => {
    closed();
  };

  const closed = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      dispatch(ModalSlide.actions.closeModal());
    }, 500);
  }, [dispatch]);

  const { ethToken: l1EthToken, erc20Tokens: l1Erc20Tokens } = useOPTokens({
    chainId: l1.id,
  });
  const { ethToken: l2EthToken, erc20Tokens: l2Erc20Tokens } = useOPTokens({
    chainId: l2.id,
  });

  const l1Tokens = useMemo<Token[]>(() => {
    return [l1EthToken, ...l1Erc20Tokens];
  }, [l1EthToken, l1Erc20Tokens]);

  const l2Tokens = useMemo<Token[]>(() => {
    return [l2EthToken, ...l2Erc20Tokens];
  }, [l2EthToken, l2Erc20Tokens]);

  const onTokenClick = useCallback(
    (l2Token: Token) => {
      if (selectedToken === l2Token) {
        return;
      }
      const l1Token = l1Tokens.find(
        (token) => token.extensions.opTokenId === l2Token.extensions.opTokenId,
      );
      if (!l1Token) {
        throw new Error(`Unable to find l1Token for ${l2Token.symbol}`);
      }
      onTokenChange(l1Token, l2Token);
      closed();
    },
    [onTokenChange, l1Tokens, closed, selectedToken],
  );

  const ItemOption = (token: Token, onTokenClick: (l2Token: Token) => void) => {
    return (
      <div
        onClick={() => onTokenClick(token)}
        key={token.name}
        className={`flex w-full cursor-pointer items-center justify-between border-b-[1px]
         border-transparent px-2 py-2 text-lg font-bold
         text-black transition-all hover:border-b-gray-dark hover:bg-gray-medium`}
      >
        <div className="flex items-center">
          <div
            className={`mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-white p-1`}
          >
            <img
              src={`${token.logoURI}`}
              alt={token.name}
              className="h-full w-full object-contain"
            />
          </div>
          <span>{token.name.toUpperCase()}</span>
        </div>

        {/* <p className="text-md text-gray-dark">0.11</p> */}
      </div>
    );
  };

  const onSearchChange = useCallback((val: string) => {
    setSearch(val);
  }, []);

  const filteredTokens = useMemo(() => {
    return l2Tokens.filter((token) => {
      return token.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [
    l2Tokens,
    search,
  ]);

  return (
    <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
      <div className="flex flex-col gap-4">
        <b className="text-2xl">Select Token</b>
        <SearchBox
          placeholder="Search"
          value={search}
          onChange={onSearchChange}
        />

        <div className="overflow-y-overlay bg-gray- rounded-lg h-[50vh] w-full gap-1 overflow-y-scroll">
          {filteredTokens.map((token) => {
            return ItemOption(token, onTokenClick);
          })}
        </div>
      </div>
    </Modal>
  );
}

export default CryptoSelect;
