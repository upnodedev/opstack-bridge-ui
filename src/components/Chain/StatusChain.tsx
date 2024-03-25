import { Icon } from "@iconify/react";
interface StatusChainProps {
  status: "finalize" | "" | "complete";
  date?: Date;
}
export const StatusChain = ({ status, date }: StatusChainProps) => {
  if (status === "finalize") {
    return (
      <div className="flex gap-2 rounded-full border border-[#ABEFC6] bg-[#ECFDF3] px-2 py-0.5 text-[#067647]">
        <Icon icon="lucide:circle" />
        <div className="text-xs">Finalize</div>
      </div>
    );
  } else if (status === "") {
    return (
      <div className="flex gap-2 rounded-full border border-[#B9E6FE] bg-[#F0F9FF] px-2 py-0.5 text-[#026AA2]">
        <Icon icon="lucide:clock-4" />
        <div className="text-xs">1 Minutes</div>
      </div>
    );
  } else if (status === "complete") {
    return (
      <div className="flex gap-2 rounded-full border border-[#EAECF0] bg-[#F9FAFB] px-2 py-0.5 text-[#4C4E64AD]">
        <div className="text-xs">1 Minutes</div>
      </div>
    );
  }
};
