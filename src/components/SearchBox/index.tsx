import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface Props extends SimpleComponent {
  value?: string;
  setValue?: Dispatch<SetStateAction<string>>;
}

const SearchBoxWrapper = styled.div``;

function SearchBox({ value, setValue }: Props) {
  return (
    <SearchBoxWrapper className="relative">
      <input
        type="text"
        placeholder="Search chain"
        className="w-full rounded-md border border-[#D0D5DD] p-3 pl-10 font-light placeholder-[#858796]"
        onChange={(e) => {
          setValue && setValue(e.target.value);
        }}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Icon icon="lucide:search" width={20} color="#FFBE98" />
      </div>
    </SearchBoxWrapper>
  );
}

export default SearchBox;
