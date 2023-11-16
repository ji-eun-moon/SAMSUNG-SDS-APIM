import React from 'react';

interface StatusProps {
  status: string;
  size?: string;
}

const Icon = ({ color }: { color: string }) => (
  <svg height="19" width="19">
    <circle cx="9" cy="9" r="9" fill={color} />
  </svg>
);

const SmallIcon = ({ color }: { color: string }) => (
  <svg height="15" width="15">
    <circle cx="7" cy="7" r="7" fill={color} />
  </svg>
);

function Status({ status, size }: StatusProps) {
  let color = '';

  if (status === '정상') {
    // color = '#51AF5B';
    color = '#7EC3F5';
  }
  if (status === '오류') {
    // color = '#FF0000';
    color = '#FF5353';
  }
  if (status === '점검') {
    // color = '#F4DF6F';
    color = '#FFEA7B';
  }

  if (size === 'big') {
    return <Icon color={color} />;
  }

  if (size === 'small') {
    return <SmallIcon color={color} />;
  }
}

Status.defaultProps = {
  size: 'big',
};

export default Status;
