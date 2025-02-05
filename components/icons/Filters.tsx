import React from 'react';
import { IconProps } from 'types';

const FiltersIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.3333 7.35461V8.76709C16.9613 8.80004 16.5932 8.77712 16.2265 8.78141C15.8597 8.78571 15.4611 8.78141 15.0784 8.78141H13.9277V9.76986H12.599V8.79144H0.339966V7.35891H12.6003V6.21289H13.9038V7.33886C15.0598 7.36035 16.1786 7.34315 17.3333 7.35461Z"
        fill="white"
      />
      <path
        d="M5.49024 3.05706V4.04121H4.17213V3.07855C4.03128 3.07139 3.91966 3.05993 3.80672 3.05993H0.682835C0.569891 3.05993 0.455619 3.04847 0.333374 3.04274V1.64602H4.15751V0.5H5.48626V1.62597H17.3227V3.05849L5.49024 3.05706Z"
        fill="white"
      />
      <path
        d="M17.332 13.0855V14.4879C16.9135 14.508 16.4936 14.4879 16.0737 14.4965C15.6538 14.5051 15.2021 14.4965 14.7662 14.4965H8.32978C8.31782 14.8418 8.30586 15.1655 8.2939 15.4993H7.00236V14.5051H0.333374V13.107C1.07349 13.0912 1.80164 13.107 2.53112 13.107C3.26061 13.107 4.01799 13.107 4.76209 13.107H6.9904V11.9609H8.31915V13.0984L17.332 13.0855Z"
        fill="white"
      />
    </svg>
  );
};

export default FiltersIcon;
