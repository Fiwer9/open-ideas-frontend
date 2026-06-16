import React from "react";
import ContentLoader from "react-content-loader";

interface TableListSkeletonProps {
  rows?: number;
}

const ROW_HEIGHT = 48;
const HEADER_HEIGHT = 48;

const TableListSkeleton: React.FC<TableListSkeletonProps> = ({ rows = 8 }) => {
  const viewHeight = HEADER_HEIGHT + 8 + rows * ROW_HEIGHT;

  return (
    <ContentLoader
      viewBox={`0 0 800 ${viewHeight}`}
      width="100%"
      height={viewHeight}
      speed={2}
      backgroundColor="#f5f5f5"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="2" ry="2" width="800" height={HEADER_HEIGHT} />
      {Array.from({ length: rows }, (_, index) => {
        const y = HEADER_HEIGHT + 8 + index * ROW_HEIGHT;

        return (
          <React.Fragment key={index}>
            <rect x="16" y={y + 14} rx="3" ry="3" width="40" height="12" />
            <rect x="80" y={y + 14} rx="3" ry="3" width="28" height="12" />
            <rect x="140" y={y + 14} rx="3" ry="3" width="280" height="12" />
            <rect x="480" y={y + 14} rx="3" ry="3" width="120" height="12" />
            <rect x="640" y={y + 14} rx="3" ry="3" width="100" height="12" />
          </React.Fragment>
        );
      })}
    </ContentLoader>
  );
};

export default TableListSkeleton;
