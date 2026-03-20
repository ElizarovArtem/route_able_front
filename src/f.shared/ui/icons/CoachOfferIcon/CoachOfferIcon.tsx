import React from 'react';

export const CoachOfferIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#3da8a5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect x="1" y="8" width="3" height="8" rx="1" fill="#3da8a5" />
      <rect x="4" y="9" width="2.5" height="6" rx="1" fill="#3da8a5" />

      <rect x="6.5" y="11" width="11" height="2" rx="1" fill="#3da8a5" />

      <rect x="17.5" y="9" width="2.5" height="6" rx="1" fill="#3da8a5" />
      <rect x="20" y="8" width="3" height="8" rx="1" fill="#3da8a5" />
    </svg>
  );
});

CoachOfferIcon.displayName = 'CoachOfferIcon';
