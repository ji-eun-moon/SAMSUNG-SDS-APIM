import React from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import { SpeedDial } from '@material-tailwind/react/components/SpeedDial';

function SpeedDialF() {
  return (
    <SpeedDial>
      <div data-dial-init className="fixed end-6 bottom-6 group">
        <div id="menu" className="flex flex-col items-center hidden mb-4 space-y-2">
          <button
            type="button"
            data-tooltip-target="tooltip-print"
            data-tooltip-placement="left"
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          >
            <Image src="/images/desktop.png" alt="itda logo" width={22} height={22} />
            <span className="sr-only">Server</span>
          </button>
          <div
            id="tooltip-server"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Server
            <div className="tooltip-arrow" data-popper-arrow />
          </div>

          <button
            type="button"
            data-tooltip-target="tooltip-download"
            data-tooltip-placement="left"
            className="flex justify-center items-center w-[52px] h-[52px] text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 dark:border-gray-600 shadow-sm dark:hover:text-white dark:text-gray-400 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:focus:ring-gray-400"
          >
            <Image src="/images/database.png" alt="itda logo" width={22} height={22} />
            <span className="sr-only">Usage</span>
          </button>
          <div
            id="tooltip-usage"
            role="tooltip"
            className="absolute z-10 invisible inline-block w-auto px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
            Usage
            <div className="tooltip-arrow" data-popper-arrow />
          </div>
        </div>

        <button
          type="button"
          data-dial-toggle="menu"
          aria-controls="menu"
          aria-expanded="false"
          className="flex items-center justify-center text-white bg-blue-700 rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
          <span className="sr-only">Open actions menu</span>
        </button>
      </div>
    </SpeedDial>
  );
}

export default SpeedDialF;
