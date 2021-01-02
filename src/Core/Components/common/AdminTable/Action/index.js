import React, { useState, useMemo } from "react";
import { Button, Icon } from "antd";

/* Components */
import ModalDelete from "./ModalDelete";

const AdminTableAction = ({
  t,
  apiDelete,
  selectedRowKeys,
  refreshDataAfterDelete,
  afterDeleteSuccess,
  customDefaultActionIcon,
  customDefaultActionTitle,
  modeCustomAction,
  customAction
}) => {

  /* State */
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  }

  const hiddenModal = () => {
    setVisible(false);
  }

  const tableActions = useMemo(() => {
    let actions = [{
      title: customDefaultActionTitle || t("CORE.delete"),
      icon: customDefaultActionIcon || "delete",
      action: showModal
    }];

    if (customAction.length !== 0) {
      if (modeCustomAction === "merge") {
        actions = [...actions, ...customAction];
      } else if (modeCustomAction === "override") {
        actions = customAction;
      }
    }

    return actions.map(({ title, icon, action }) =>
      <Button
        key={title}
        className="btn-transparent btn-blue"
        size="small"
        onClick={action}
      >
        <Icon type={icon} />
        {title}
      </Button>
    )
  }, [modeCustomAction, customAction])

  return selectedRowKeys.length > 0 && (
    <div className="admin-table__action">
      <div className="admin-table__message">{selectedRowKeys.length} {t("TABLE.ROW.selected_row_message")}</div>
      {tableActions}
      <ModalDelete
        t={t}
        selectedRowKeys={selectedRowKeys}
        apiDelete={apiDelete}
        refreshDataAfterDelete={refreshDataAfterDelete}
        afterDeleteSuccess={afterDeleteSuccess}
        visible={visible}
        hiddenModal={hiddenModal}
      />
    </div>
  )
}

AdminTableAction.defaultProps = {
  selectedRowKeys: [],
  customAction: []
}

export default React.memo(AdminTableAction);
