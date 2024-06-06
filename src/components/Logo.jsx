export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="#4CAF50"
          stroke="#333"
          strokeWidth="2"
        />

        {/* Inner circle */}
        <circle cx="50" cy="50" r="30" fill="#FFFFFF" />

        {/* Letter R */}
        <text
          x="50"
          y="55"
          fontFamily="Arial, Helvetica, sans-serif"
          fontSize="70"
          fill="#4CAF50"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          r
        </text>
      </svg>
      <span className="text-xl font-semibold">Blog</span>
    </div>
  );
};
