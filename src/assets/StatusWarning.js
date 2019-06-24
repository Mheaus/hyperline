import React from 'react';

function StatusWarning() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <g fillRule="evenodd">
        <path d="M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z" />
        <path d="M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z" fill="#FFF" />
        <path d="M6 3.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4m0 6c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-1" />
      </g>
    </svg>
  );
}

export default StatusWarning;