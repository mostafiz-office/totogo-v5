import { ICONS } from "./VehicleIcons";

interface Props {
  id: string;
  label: string;
}

const VehicleCard = ({ id, label }: Props) => {
  const Icon = ICONS[id];
  return (
    <div
      className="relative z-10 flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-[8px] border bg-background px-2 py-3 sm:min-h-[132px] sm:gap-3 sm:px-4 sm:py-5 md:min-h-[170px] md:gap-4 lg:min-h-[208px]"
      style={{ borderColor: "hsl(var(--ev-navy))" }}
    >
      <div className="flex h-10 w-full max-w-[88px] items-center justify-center sm:h-[54px] sm:w-28 md:h-[68px] md:w-36 lg:h-[78px] lg:w-40">
        {Icon ? <Icon /> : null}
      </div>
      <p
        className="text-center text-[0.78rem] font-medium leading-tight sm:text-[1.05rem] md:text-[1.35rem] lg:text-[1.6rem]"
        style={{ color: "hsl(var(--ev-navy))" }}
      >
        {label}
      </p>
    </div>
  );
};

export default VehicleCard;
