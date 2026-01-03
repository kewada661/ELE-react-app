import { icon } from "@/ui/primitives/Icon/icon.css"

export type IconSize = "14" | "16" | "20" | "24" | "32" | "40" | "48";
export type IconProps = {
  children?: React.ReactNode;
  className?: string;
  size?: IconSize;
  strokeWidth?: string;
};
export function Icon({ size = "16", strokeWidth = "4",children, className }: IconProps) {
  return (
    <svg
      className={icon}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      strokeWidth={strokeWidth}
    >
      {children}
    </svg>
  );
}
