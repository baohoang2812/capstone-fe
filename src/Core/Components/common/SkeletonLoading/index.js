import React from "react";
import { Skeleton } from "antd";

const SkeletonLoading = ({ number, rows, avatar, active }) => {
  return (
    <div className="placeholder-list">
      {new Array(number).fill(1).map((_, index) => (
        <Skeleton key={index} className="item" active={active} avatar={avatar} paragraph={{ rows: rows }} />
      ))}
    </div>
  );
};

SkeletonLoading.defaultProps = {
  number: 1,
  rows: 1,
  active: true,
  avatar: false
};

export default SkeletonLoading;
