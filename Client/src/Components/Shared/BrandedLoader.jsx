import React from "react";

const BrandedLoader = ({ fullScreen = false, label = "Loading Market Monitor..." }) => {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-4 bg-base-200/60 ${
        fullScreen ? "min-h-screen" : "min-h-[40vh] py-10"
      }`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-base-300 bg-base-100 shadow-sm">
        <img src="/logo.png" alt="Market Monitor logo" className="h-10 w-10 object-contain" />
        <span className="absolute -bottom-1 -right-1 h-3 w-3 animate-ping rounded-full bg-primary/60"></span>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-sm font-semibold text-base-content">Market Monitor</p>
        <p className="text-xs text-base-content/60">{label}</p>
      </div>
    </div>
  );
};

export default BrandedLoader;