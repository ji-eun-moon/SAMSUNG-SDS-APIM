import { Chip } from '@nextui-org/react';

interface ChipTextProps {
  label: 'GET' | 'POST' | string;
}

function ChipText({ label }: ChipTextProps) {
  if (label === 'GET') {
    return (
      <Chip size="lg" radius="sm" className="bg-green-600 text-white font-bold">
        {label}
      </Chip>
    );
  }
  return (
    <Chip size="lg" radius="sm" className="bg-blue-600 text-white font-bold">
      {label}
    </Chip>
  );
}

export default ChipText;
