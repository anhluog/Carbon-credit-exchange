import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: 'Counterproposal' | 'Accepted' | 'Cancelled';
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const getStatusStyles = () => {
    switch (status) {
      case 'Counterproposal':
        return {
          bg: 'bg-orange-900/30',
          text: 'text-orange-500',
          border: 'border-orange-700',
          icon: AlertCircle,
        };
      case 'Accepted':
        return {
          bg: 'bg-green-900/30',
          text: 'text-green-500',
          border: 'border-green-700',
          icon: CheckCircle,
        };
      case 'Cancelled':
        return {
          bg: 'bg-red-900/30',
          text: 'text-red-500',
          border: 'border-red-700',
          icon: XCircle,
        };
    }
  };

  const styles = getStatusStyles();
  const Icon = styles.icon;

  return (
    <span
      className={`inline-flex items-center space-x-1 px-3 py-1 rounded border ${styles.bg} ${styles.text} ${styles.border} text-xs font-medium`}
    >
      <Icon className="w-3 h-3" />
      <span>{status}</span>
    </span>
  );
}
