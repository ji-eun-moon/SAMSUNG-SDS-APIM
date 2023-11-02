import React from 'react';

interface StatusProps {
  status: string;
}

const Icon = ({ color }: { color: string }) => (
  <svg height="19" width="19">
    <circle cx="9" cy="9" r="9" fill={color} />
  </svg>
);

function Status({ status }: StatusProps) {
  let color = '';

  if (status === '정상') {
    color = '#51AF5B';
  }
  if (status === '오류') {
    color = '#FF0000';
  }
  if (status === '점검') {
    color = '#F4DF6F';
  }

  return <Icon color={color} />;
}

export default Status;
