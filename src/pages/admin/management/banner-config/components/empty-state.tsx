import { Icon } from "@/components/icon";

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export default function EmptyState({
  message,
  icon = "lucide:inbox",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      <Icon icon={icon} size={32} className="mb-2 text-primary" />
      <span className="text-lg">{message}</span>
    </div>
  );
}
