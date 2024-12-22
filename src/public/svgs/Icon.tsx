import React, { memo } from "react";

type IconProps = {
  iconName: string;
};

const Icon = (props: IconProps) => {
  const { iconName } = props;
  switch (iconName) {
    case "kakao":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" rx="30" fill="#FEE500" />
          <path
            d="M29.9727 18.625C32.3704 18.625 34.5881 19.0917 36.6257 20.025C38.6633 20.9583 40.2742 22.2274 41.4582 23.8323C42.6423 25.4372 43.2344 27.1878 43.2344 29.0841C43.2344 30.9803 42.6423 32.7334 41.4582 34.3433C40.2742 35.9531 38.6658 37.2247 36.6331 38.158C34.6004 39.0913 32.3803 39.558 29.9727 39.558C29.2129 39.558 28.4284 39.5037 27.6193 39.395C24.1065 41.8345 22.2367 43.0691 22.0097 43.0986C21.9012 43.1382 21.7975 43.1332 21.6989 43.0839C21.6594 43.0542 21.6298 43.0147 21.6101 42.9653C21.5903 42.9159 21.5805 42.8715 21.5805 42.832V42.7728C21.6397 42.3875 22.0886 40.7827 22.9274 37.958C21.023 37.0099 19.5108 35.7531 18.3909 34.1877C17.2709 32.6223 16.7109 30.9211 16.7109 29.0841C16.7109 27.1878 17.303 25.4372 18.4871 23.8323C19.6711 22.2274 21.282 20.9583 23.3196 20.025C25.3572 19.0917 27.5749 18.625 29.9727 18.625Z"
            fill="black"
          />
        </svg>
      );
    case "naver":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="60" height="60" rx="30" fill="#03C75A" />
          <g clipPath="url(#clip0_319_3499)">
            <mask
              id="mask0_319_3499"
              maskUnits="userSpaceOnUse"
              x="16"
              y="16"
              width="28"
              height="28"
            >
              <path d="M44 16H16V44H44V16Z" fill="white" />
            </mask>
            <g mask="url(#mask0_319_3499)">
              <path
                d="M33.9271 30.7369L25.6362 18.8H18.7998V41.2H26.0725V29.2631L34.3634 41.2H41.1998V18.8H33.9271V30.7369Z"
                fill="white"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_319_3499">
              <rect
                width="28"
                height="28"
                fill="white"
                transform="translate(16 16)"
              />
            </clipPath>
          </defs>
        </svg>
      );
    case "google":
      return (
        <svg
          width="60"
          height="60"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.25"
            y="0.25"
            width="59.5"
            height="59.5"
            rx="29.75"
            fill="white"
          />
          <rect
            x="0.25"
            y="0.25"
            width="59.5"
            height="59.5"
            rx="29.75"
            stroke="#D4D4D4"
            strokeWidth="0.5"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M42.88 30.305C42.88 29.3535 42.7946 28.4388 42.6361 27.5606H30V32.7504H37.2206C36.9096 34.4275 35.9644 35.8485 34.5434 36.7998V40.1662H38.8794C41.4164 37.8304 42.88 34.391 42.88 30.305Z"
            fill="#4285F4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.9999 43.4164C33.6224 43.4164 36.6594 42.215 38.8793 40.166L34.5433 36.7996C33.3418 37.6046 31.805 38.0802 29.9999 38.0802C26.5055 38.0802 23.5477 35.7202 22.4926 32.5489H18.0103V36.0251C20.2179 40.4099 24.7552 43.4164 29.9999 43.4164Z"
            fill="#34A853"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.4929 32.5493C22.2246 31.7443 22.0721 30.8843 22.0721 30.0001C22.0721 29.1158 22.2246 28.2559 22.4929 27.4509V23.9748H18.0105C17.1019 25.786 16.5835 27.8351 16.5835 30.0001C16.5835 32.165 17.1019 34.2141 18.0105 36.0254L22.4929 32.5493Z"
            fill="#FBBC05"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M29.9999 21.9195C31.9697 21.9195 33.7383 22.5964 35.1287 23.9259L38.9768 20.0778C36.6533 17.9128 33.6162 16.5833 29.9999 16.5833C24.7552 16.5833 20.2179 19.5899 18.0103 23.9747L22.4926 27.4508C23.5477 24.2796 26.5055 21.9195 29.9999 21.9195Z"
            fill="#EA4335"
          />
        </svg>
      );
    case "close":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.8764 17.2806C18.1057 17.5099 18.0007 17.9015 17.6875 17.9854C17.5421 18.0243 17.387 17.9828 17.2806 17.8764L10 10.5958L2.71939 17.8764C2.49009 18.1057 2.09855 18.0007 2.01462 17.6875C1.97566 17.5421 2.01722 17.387 2.12364 17.2806L9.40425 10L2.12364 2.71939C1.89434 2.49009 1.99925 2.09855 2.31249 2.01462C2.45787 1.97566 2.61298 2.01722 2.71939 2.12364L10 9.40425L17.2806 2.12364C17.5099 1.89434 17.9015 1.99925 17.9854 2.31249C18.0243 2.45787 17.9828 2.61298 17.8764 2.71939L10.5958 10L17.8764 17.2806Z"
            fill="#2B2B2B"
          />
        </svg>
      );

    case "downArrow":
      return (
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.15617 6.55478L10.74 0.824939C10.8448 0.693986 10.7516 0.5 10.5839 0.5L1.41612 0.5C1.24842 0.5 1.15519 0.693987 1.25995 0.82494L5.84383 6.55478C5.92389 6.65486 6.07611 6.65486 6.15617 6.55478Z"
            fill="#121314"
            stroke="#121314"
          />
        </svg>
      );

    case "upArrow":
      return (
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.84383 0.695217L1.25995 6.42506C1.15519 6.55601 1.24842 6.75 1.41613 6.75L10.5839 6.75C10.7516 6.75 10.8448 6.55601 10.74 6.42506L6.15617 0.695217C6.07611 0.595136 5.92389 0.595136 5.84383 0.695217Z"
            fill="#121314"
            stroke="#121314"
          />
        </svg>
      );

    case "moreIcon":
      return (
        <svg
          width="17"
          height="4"
          viewBox="0 0 17 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="1.99998" cy="2.0001" r="1.4" fill="#A1A9AD" />
          <circle cx="8.79996" cy="2.0001" r="1.4" fill="#A1A9AD" />
          <circle cx="15.6" cy="2.0001" r="1.4" fill="#A1A9AD" />
        </svg>
      );

    case "searchIcon":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8" cy="8" r="7" stroke="#8000FF" strokeWidth="2" />
          <path d="M13 13L19 19" stroke="#8000FF" strokeWidth="2" />
        </svg>
      );

    case "filterIcon":
      return (
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.125 2.25H2.53125M13.875 2.25H5.96875"
            stroke="#121314"
            stroke-width="1.4"
          />
          <path
            d="M0.125 7.75H8.03125M13.875 7.75H11.4688"
            stroke="#121314"
            stroke-width="1.4"
          />
          <circle
            cx="9.75"
            cy="7.75"
            r="1.3625"
            stroke="#121314"
            stroke-width="1.4"
          />
          <circle
            cx="4.25"
            cy="2.25"
            r="1.3625"
            stroke="#121314"
            stroke-width="1.4"
          />
        </svg>
      );

    default:
      return <div></div>;
  }
};

export default memo(Icon);
