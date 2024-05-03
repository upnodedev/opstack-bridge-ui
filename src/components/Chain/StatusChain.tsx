import { Icon } from "@iconify/react";
interface StatusChainProps {
  status?:
    | "waiting-to-prove"
    | "ready-to-prove"
    | "waiting-to-finalize"
    | "ready-to-finalize"
    | "finalized"
    | "success"
    | "reverted"
    | undefined | 'unknown'
    | "" | "pending";
  date?: Date;
}
export const StatusChain = ({ status, date }: StatusChainProps) => {
  if (status === "waiting-to-prove") {
    return (
      <div className="flex gap-2 rounded-full border border-yellow-600 bg-yellow-600 px-2 py-0.5 text-white">
        <Icon icon="lucide:circle" />
        <div className="text-xs">Waiting to prove</div>
      </div>
    );
  }

  if (status === "ready-to-prove") {
    return (
      <div className="flex gap-2 rounded-full border border-red-600 bg-red-600 px-2 py-0.5 text-white">
        <Icon icon="icon-park-solid:transaction-order" />
        <div className="text-xs">Ready to prove</div>
      </div>
    );
  }

  if (status === "waiting-to-finalize") {
    return (
      <div className="flex gap-2 rounded-full border border-yellow-600 bg-yellow-600 px-2 py-0.5 text-white">
        <Icon icon="lucide:circle" />
        <div className="text-xs">Waiting to finalize</div>
      </div>
    );
  }

  if (status === "ready-to-finalize") {
    return (
      <div className="flex gap-2 rounded-full border border-red-600 bg-red-600 px-2 py-0.5 text-white">
        <Icon icon="icon-park-solid:transaction-order" />
        <div className="text-xs">Ready to finalize</div>
      </div>
    );
  }

  if (status === "finalized") {
    return (
      <div className="flex gap-2 rounded-full border border-blue-400 bg-blue-400 px-2 py-0.5 text-white">
        <Icon icon="line-md:confirm-circle-twotone" />
        <div className="text-xs">Finalized</div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex gap-2 rounded-full border border-emerald-600 bg-emerald-600 px-2 py-0.5 text-white">
        <Icon icon="line-md:confirm-circle-twotone" />
        <div className="text-xs">Success</div>
      </div>
    );
  }

  if (status === "reverted") {
    return (
      <div className="flex gap-2 rounded-full border border-red-600 bg-red-600 px-2 py-0.5 text-white">
        <Icon icon="mdi:error" />
        <div className="text-xs">Reverted</div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="flex gap-2 rounded-full border border-gray-600 bg-gray-600 px-2 py-0.5 text-white">
        <Icon icon="carbon:unknown-filled" />
        <div className="text-xs">Pending</div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 rounded-full border border-gray-600 bg-gray-600 px-2 py-0.5 text-white">
      <Icon icon="carbon:unknown-filled" />
      <div className="text-xs">Unknown</div>
    </div>
  );
};
