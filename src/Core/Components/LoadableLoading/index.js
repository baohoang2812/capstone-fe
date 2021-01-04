import "./index.less";

import React, { useState, useEffect } from "react";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#FF5F6D",
    "1.0": "#FF5F6D"
  }
});

const LoadableLoading = ({
  delay = 300
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => {
      clearTimeout(timeout);
    }
  }, [])

  return show && <TopBarProgress />
}

export default LoadableLoading;
