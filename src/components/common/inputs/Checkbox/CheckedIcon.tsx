import React from 'react';

import { SvgIcon } from '@mui/material';

const CheckedIcon = () => {
  return (
    <SvgIcon
      sx={{ fontSize: '20px' }}
      width={20}
      height={20}
      viewBox={'0 0 20 20'}>
      <rect width="20" height="20" rx="5" fill="#37E6FF" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.1325 6.18971C15.3959 6.44695 15.4009 6.86903 15.1437 7.13245L8.63325 13.7991C8.50206 13.9335 8.32031 14.0062 8.13267 13.9996C7.94503 13.9929 7.76889 13.9075 7.64754 13.7642L4.82463 10.4309C4.58667 10.1499 4.62155 9.7292 4.90253 9.49127C5.18349 9.25333 5.60416 9.2882 5.84212 9.56913L8.19138 12.3432L14.1898 6.20089C14.447 5.93747 14.8691 5.93246 15.1325 6.18971Z"
        fill="#0A072A"
      />
    </SvgIcon>
  );
};

export default CheckedIcon;
