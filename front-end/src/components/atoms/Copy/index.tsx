import { Snippet } from '@nextui-org/react';

interface CopyProps {
  copyText: string;
}

function Copy({ copyText }: CopyProps) {
  return <Snippet symbol="" codeString={copyText} style={{ paddingLeft: '0px' }} />;
}

export default Copy;
