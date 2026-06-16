import React from "react";
import ContentLoader from "react-content-loader";

interface RatingUserExpandedSkeletonProps {
  initiativesOnly?: boolean;
}

const RatingUserExpandedSkeleton: React.FC<RatingUserExpandedSkeletonProps> = ({
  initiativesOnly = false,
}) => {
  if (initiativesOnly) {
    return (
      <ContentLoader
        viewBox="0 0 360 320"
        width="100%"
        height={320}
        speed={2}
        backgroundColor="#f5f5f5"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="3" ry="3" width="220" height="14" />
        <rect x="0" y="32" rx="8" ry="8" width="360" height="88" />
        <rect x="0" y="132" rx="8" ry="8" width="360" height="88" />
        <rect x="0" y="232" rx="8" ry="8" width="360" height="88" />
      </ContentLoader>
    );
  }

  return (
    <ContentLoader
      viewBox="0 0 760 420"
      width="100%"
      height={420}
      speed={2}
      backgroundColor="#f5f5f5"
      foregroundColor="#ecebeb"
    >
      <circle cx="120" cy="72" r="36" />
      <rect x="60" y="120" rx="4" ry="4" width="120" height="14" />

      <rect x="24" y="160" rx="2" ry="2" width="312" height="1" />

      <rect x="24" y="180" rx="3" ry="3" width="80" height="10" />
      <rect x="120" y="180" rx="3" ry="3" width="180" height="10" />
      <rect x="24" y="200" rx="3" ry="3" width="100" height="10" />
      <rect x="140" y="200" rx="3" ry="3" width="160" height="10" />
      <rect x="24" y="220" rx="3" ry="3" width="60" height="10" />
      <rect x="100" y="220" rx="3" ry="3" width="140" height="10" />

      <rect x="24" y="252" rx="2" ry="2" width="312" height="1" />

      <rect x="24" y="272" rx="3" ry="3" width="100" height="12" />
      <rect x="24" y="296" rx="3" ry="3" width="70" height="10" />
      <rect x="120" y="296" rx="3" ry="3" width="30" height="10" />
      <rect x="24" y="316" rx="3" ry="3" width="90" height="10" />
      <rect x="130" y="316" rx="3" ry="3" width="30" height="10" />
      <rect x="24" y="336" rx="3" ry="3" width="90" height="10" />
      <rect x="130" y="336" rx="3" ry="3" width="30" height="10" />

      <rect x="392" y="28" rx="3" ry="3" width="220" height="14" />
      <rect x="392" y="60" rx="8" ry="8" width="344" height="88" />
      <rect x="392" y="160" rx="8" ry="8" width="344" height="88" />
      <rect x="392" y="260" rx="8" ry="8" width="344" height="88" />
    </ContentLoader>
  );
};

export default RatingUserExpandedSkeleton;
