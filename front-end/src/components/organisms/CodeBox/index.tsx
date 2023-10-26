import React from 'react';

interface CodeBoxProps {
  jsonString: string;
}

function CodeBox({ jsonString }: CodeBoxProps) {
  try {
    const jsonObject = JSON.parse(jsonString);
    const formattedJson = JSON.stringify(jsonObject, null, 2);
    return <pre style={{ fontFamily: 'Courier New, Nanum Gothic, sans-serif' }}>{formattedJson}</pre>;
  } catch (error) {
    return <div>Invalid JSON</div>;
  }
}

export default CodeBox;
