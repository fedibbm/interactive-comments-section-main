import React from "react";

const MinusIconSVG = ({ className, onClick }) => {
    return (
        <svg
            className={(className || "")}
            height={12}
            width={12}
            viewBox="-1 -4 12 12"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            onClick={onClick}
        >
            <path
                d="m 9.256 2.66 c 0.204 0 0.38 -0.056 0.53 -0.167 c 0.148 -0.11 0.222 -0.243 0.222 -0.396 v -1.375 c 0 -0.152 -0.074 -0.284 -0.223 -0.395 a 0.859 0.859 0 0 0 -0.53 -0.167 h -8.495 a 0.859 0.859 0 0 0 -0.53 0.167 c -0.147 0.11 -0.221 0.243 -0.221 0.395 v 1.375 c 0 0.153 0.074 0.285 0.223 0.396 a 0.859 0.859 0 0 0 0.53 0.167 h 8.495 z"
                fill="currentColor"
            />
        </svg>
    );
};

export default MinusIconSVG;
