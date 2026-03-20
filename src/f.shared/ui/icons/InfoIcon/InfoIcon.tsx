import React from 'react';

type InfoIconProps = {} & React.SVGProps<SVGSVGElement>;

export const InfoIcon = (props: InfoIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="2" />
      <line
        x1="12"
        y1="10"
        x2="12"
        y2="16"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="7" r="1.5" fill="#6B7280" />
    </svg>
  );
};
