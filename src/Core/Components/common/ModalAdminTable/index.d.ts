import * as React from "react";

export interface Props {
  defs: Array<any>;
  scroll: object;
  widthModal: number,
  title: string,
  btnText: string,
  mode: "radio" | "checkbox";
  api: () => void,
  identity: string,
  getListMethod: string | "getList",
  notInKeys: Array<string>;
  notInFilterKey: string;
  onSelected: (ids: Array<string>) => void,
}

export interface State {
  visible: boolean;
  rowKeys: Array<string>;
}

export default class ModalAdminTable extends React.Component<Props, State> {
  static defaultProps: {
    defs: Array<any>;
    scroll: object;
    getListMethod: string | "getList",
    mode: "radio",
    notInKeys: Array<string>;
  };

  state: {
    visible: boolean;
    rowKeys: Array<string>;
  };
}
