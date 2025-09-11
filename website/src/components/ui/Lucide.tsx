import { cn } from "@/lib/utils";
import * as lucideIcons from "lucide-react";

export const { icons } = lucideIcons;

interface LucideProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: keyof typeof icons;
  title?: string;
  size?: number;
}

function Lucide(props: LucideProps) {
  const { className, ...computedProps } = props;
  const Component = icons[props.icon];
  return (
    <Component
      {...computedProps}
      className={cn("stroke-[1.75] min-h-5 min-w-fit", className)}
    />
  );
}

export default Lucide;
