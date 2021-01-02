import React from "react";
import { Avatar } from "antd";

/* Configs */
import { currentEnv } from "~/Configs";

const ImageThumbnail = ({
  size = 35,
  shape = "square",
  src,
  ...rest
}) => (
  <Avatar
    {...rest}
    size={size}
    shape={shape}
    src={
      /^(http|https):/.test(src) ?
        src
      :
        `${currentEnv["REST_FULL_STATIC_API_URL"]}${src}`
    }
  />
)

export default ImageThumbnail;
