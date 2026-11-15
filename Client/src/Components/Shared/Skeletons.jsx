import React from "react";

export const ProductCardSkeleton = () => (
  <div className="surface-card overflow-hidden">
    <div className="skeleton h-48 w-full rounded-none"></div>
    <div className="space-y-3 p-5">
      <div className="skeleton h-5 w-3/4"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-5/6"></div>
      <div className="skeleton h-4 w-2/3"></div>
      <div className="skeleton mt-4 h-9 w-full"></div>
    </div>
  </div>
);

export const ProductGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const BannerSkeleton = () => (
  <div className="surface-card overflow-hidden">
    <div className="skeleton h-56 w-full rounded-none sm:h-72 lg:h-80"></div>
    <div className="space-y-3 p-5">
      <div className="skeleton mx-auto h-6 w-1/2"></div>
      <div className="skeleton mx-auto h-4 w-3/4"></div>
      <div className="skeleton mx-auto h-4 w-1/3"></div>
    </div>
  </div>
);

export const DetailsSkeleton = () => (
  <div className="section-shell py-8 sm:py-10">
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="surface-card overflow-hidden">
        <div className="skeleton h-72 w-full rounded-none sm:h-96"></div>
      </div>
      <div className="surface-card space-y-4 p-6">
        <div className="skeleton h-8 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-24 w-full"></div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="skeleton h-10 w-full"></div>
          <div className="skeleton h-10 w-full"></div>
        </div>
      </div>
    </div>
  </div>
);