import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-gray-300 opacity-40", className)} {...props} />);
}

export { Skeleton }
