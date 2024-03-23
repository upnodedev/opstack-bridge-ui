import { useAppSelector } from "@states/hooks";

export const useCounter = () => {
  return useAppSelector((state) => state.counter.value);
};
