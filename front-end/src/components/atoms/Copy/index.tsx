import { Snippet } from '@nextui-org/react';

interface CopyProps {
  copyText: string;
}

function Copy({ copyText }: CopyProps) {
  return (
    <Snippet symbol="" codeString={copyText} style={{ padding: '1px', gap: '0px' }} size="sm" className="self-center" />
  );
}

export default Copy;
