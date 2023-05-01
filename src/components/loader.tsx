import React from "react";

const Loader = () => {
  return (
    <div className="loader">
      <svg className="circular">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default Loader;
