import React from "react";
import { Alert, Button } from "antd";

const SelectedAll = ({ t, selectedAll, selectedRowKeysLength, removeSelectedAll }) => {

  return selectedAll && (
    <Alert
      type="info"
      className="admin-table__selected-all"
      message={(
        <>
          {t("CORE.all")} <strong>{selectedRowKeysLength}</strong> {t("TABLE.ROW.selected_row_message")}
          <Button
            className="btn-transparent btn-red"
            size="small"
            onClick={removeSelectedAll}
          >
            {t("CORE.deselect", "Deselect")}
          </Button>
        </>
      )}
    />
  )
}

export default React.memo(SelectedAll);
