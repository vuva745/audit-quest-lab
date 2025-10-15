import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: "verified" | "pending" | "rejected" | "claimed" | "alert";
  label?: string;
}

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const config = {
    verified: {
      icon: CheckCircle2,
      className: "bg-success/20 text-success border-success/50",
      defaultLabel: "Verified"
    },
    pending: {
      icon: Clock,
      className: "bg-warning/20 text-warning border-warning/50",
      defaultLabel: "Pending"
    },
    rejected: {
      icon: XCircle,
      className: "bg-danger/20 text-danger border-danger/50",
      defaultLabel: "Rejected"
    },
    claimed: {
      icon: CheckCircle2,
      className: "bg-primary/20 text-primary border-primary/50",
      defaultLabel: "Claimed"
    },
    alert: {
      icon: AlertCircle,
      className: "bg-danger/20 text-danger border-danger/50",
      defaultLabel: "Alert"
    }
  };

  const { icon: Icon, className, defaultLabel } = config[status];

  return (
    <Badge variant="outline" className={`${className} flex items-center gap-1 px-2 py-1`}>
      <Icon className="w-3 h-3" />
      <span>{label || defaultLabel}</span>
    </Badge>
  );
};
