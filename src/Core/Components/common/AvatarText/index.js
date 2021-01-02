import "./index.less";

import React from "react";

/* Configs */
import { currentEnv } from "~/Configs";

import { stringToHslColor } from "~/Core/utils/helper/format";

const { REST_FULL_STATIC_API_URL } = currentEnv;

const AvatarText = ({
  image,
  alt,
  text,
  backgroundColor,
  width,
  height,
  style,
  fontSize,
  fontWeight,
  heightText,
  textColor,
  tagType,
  fontSizeTag,
  tagColorBg,
  fontColorTag,
  affix,
}) => {
  return image ? (
    <div className="background-text">
      <img
        src={
          /^(http|https):/.test(image)
            ? image.url
            : `${REST_FULL_STATIC_API_URL}${image}`
        }
        alt={alt}
        style={style}
        height={height}
        width={width}
      />
    </div>
  ) : (
    <div className="avatar-item">
      {tagType && (
        <div className="tag-type" style={{ backgroundColor: tagColorBg }}>
          <span
            className="text-type"
            style={{ fontSize: fontSizeTag, color: fontColorTag }}
          >
            {tagType}
          </span>
        </div>
      )}
      <div
        className="background-text"
        style={{
          width: width,
          height: heightText || height,
          backgroundColor: backgroundColor || stringToHslColor(text),
          fontSize: fontSize,
          fontWeight: fontWeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: { textColor },
        }}
      >
        {text && (
          <span style={style}>{`${text.charAt(0).toUpperCase()}${affix
            .charAt(0)
            .toUpperCase()}`}</span>
        )}
      </div>
    </div>
  );
};

AvatarText.defaultProps = {
  width: "100%",
  height: "auto",
  style: {},
  fontSize: 24,
  fontWeight: 800,
  alt: "avatar-rubik",
  textColor: "#303030",
  fontSizeTag: 16,
  tagColorBg: "#f0f8ff",
  fontColorTag: "#303030",
};

export default React.memo(AvatarText);
