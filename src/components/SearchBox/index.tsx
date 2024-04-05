import { Icon } from "@iconify/react";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface Props extends SimpleComponent {
  value?: string;
  placeholder?: string;
  onChange?: (val: string) => void;
}

const SearchBoxWrapper = styled.div``;

function SearchBox({ value, onChange, placeholder }: Props) {
  return (
    <SearchBoxWrapper className="relative">
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Search"}
        className="w-full rounded-md border border-[#D0D5DD] p-3 pl-10 font-light placeholder-[#858796]"
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      />
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Icon icon="lucide:search" width={20} color="#FFBE98" />
      </div>
    </SearchBoxWrapper>
  );
}

export default SearchBox;
