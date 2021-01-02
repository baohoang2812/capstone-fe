import React, { useState } from "react";
import { Icon, Menu, Dropdown } from "antd";
import { FormattedMessage } from "react-intl";

/* Context */
import AppContext from "~/Core/Providers/AppContext";

const MenuLanguage = () => {

  /* State */
  const [visible, setVisible] = useState(false);

  const onChangeLange = (context, lang) => {
    context.changeLanguage(lang);
    setVisible(false);
  }

  return (
    <Dropdown
      overlay={
        <AppContext.Consumer>
          {
            (context) => (
              <Menu className="dropdown-menu">
                <Menu.Item onClick={() => onChangeLange(context, "en")} key="en">
                  <FormattedMessage id="CORE.LANG.EN" defaultMessage="En" />
                </Menu.Item>
                <Menu.Item onClick={() => onChangeLange(context, "vi")} key="vi">
                  <FormattedMessage id="CORE.LANG.VI" defaultMessage="Vi" />
                </Menu.Item>
              </Menu>
            )
          }
        </AppContext.Consumer>
      }
      trigger={["click"]}
      visible={visible}
      onVisibleChange={(value) => setVisible(value)}
    >
      <span className="dropdown-language">
        <Icon type="global" />
      </span>
    </Dropdown>
  )
}

export default MenuLanguage;
