import { Badge } from '@nextui-org/react';

interface CountBadgeProps {
  count: string;
  children: React.ReactNode;
}

function CountBadge({ count, children }: CountBadgeProps) {
  return (
    <Badge content={count} color="danger">
      {children}
    </Badge>
  );
}

export default CountBadge;
