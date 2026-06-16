import React from "react";
import ContentLoader from "react-content-loader";

const UsersSkeleton = () => (
  <ContentLoader
    viewBox="0 0 900 360"
    width="100%"
    height={360}
    speed={2}
    backgroundColor="#f5f5f5"
    foregroundColor="#ecebeb"
  >
    <circle cx="95" cy="95" r="95" />

    <rect x="240" y="20" rx="4" ry="4" width="280" height="24" />

    <rect x="240" y="80" rx="3" ry="3" width="120" height="14" />
    <rect x="400" y="80" rx="3" ry="3" width="240" height="14" />

    <rect x="240" y="120" rx="3" ry="3" width="220" height="14" />
    <rect x="500" y="120" rx="3" ry="3" width="320" height="14" />

    <rect x="240" y="180" rx="3" ry="3" width="140" height="14" />
    <rect x="420" y="180" rx="3" ry="3" width="200" height="14" />

    <rect x="240" y="220" rx="3" ry="3" width="80" height="14" />
    <rect x="360" y="220" rx="3" ry="3" width="160" height="14" />

    <rect x="240" y="290" rx="4" ry="4" width="180" height="36" />
  </ContentLoader>
);

export default UsersSkeleton;
