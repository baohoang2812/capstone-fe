import React from "react";

/* Components */
import Text from "./Text";
import Number from "./Number";
import Enum from "./Enum";
import Radio from "./Radio";
import Date from "./Date";
import JSONB from "./JSONB";

const Filters = ({ fieldType, ...rest }) => {

  const renderFilterType = () => {
    switch (fieldType) {
      case "text":
        return <Text {...rest} />
      case "number":
      case "integer":
        return <Number {...rest} format={fieldType} />
      case "enum":
        return <Enum {...rest} />
      case "radio":
        return <Radio {...rest} />
      case "date":
        return <Date {...rest} />
      case "jsonb":
        return <JSONB {...rest} />
      default:
        return null;
    }
  }

  return (
    <div className="filter-wrapper">
      {renderFilterType()}
    </div>
  )
}

export default React.memo(Filters);
