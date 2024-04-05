import { ReactNode } from "react";

interface TimelineStepProps {
  step: ReactNode;
  fee?: string;
  title: ReactNode;
  description?: ReactNode;
  isLast?: boolean;
}

export const TimelineStep = ({
  step,
  title,
  description,
  isLast = false,
}: TimelineStepProps) => {
  return (
    <div className="mt-1 flex gap-3">
      <div className="flex flex-col items-center gap-1">
        <div className="h-12 w-12 rounded-xl border border-[#EAECF0] p-3">
          {step}
        </div>
        {!isLast && (
          <div className={`h-3 rounded-sm border-l-2 border-[#EAECF0]`} />
        )}
      </div>

      <div className="mt-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm font-normal">{description}</div>
      </div>
    </div>
  );
};
