import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 *- React Widget wrapper
 */
import React, { Component } from 'react'; // we import schedulerpro.umd for IE11 compatibility only. If you don't use IE import:
// import { WidgetHelper, ObjectHelper } from 'bryntum-schedulerpro';

import { WidgetHelper, ObjectHelper } from 'bryntum-schedulerpro/schedulerpro.umd';

var BryntumWidget = /*#__PURE__*/function (_Component) {
  _inherits(BryntumWidget, _Component);

  var _super = _createSuper(BryntumWidget);

  function BryntumWidget() {
    var _this;

    _classCallCheck(this, BryntumWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.configs = ['activeTab', 'allowOver', 'anchorToTarget', 'animateTabChange', 'autoClose', 'autoComplete', 'autoExpand', 'autoShow', 'badge', 'bbar', 'checked', 'chipView', 'clearable', 'clearHandler', 'closable', 'closeAction', 'closeParent', 'cls', 'color', 'dataset', 'defaults', 'disabled', 'displayField', 'displayValueRenderer', 'editable', 'emptyText', 'filterOperator', 'filterSelected', 'flex', 'focusOnHover', 'footer', 'forElement', 'forSelector', 'format', 'header', 'height', 'hidden', 'hideDelay', 'highlightExternalChange', 'html', 'icon', 'iconTpl', 'inline', 'inputWidth', 'itemCls', 'items', 'keyStrokeChangeDelay', 'keyStrokeFilterDelay', 'label', 'labelWidth', 'layoutStyle', 'listCls', 'listeners', 'listItemCls', 'loadingMsg', 'margin', 'max', 'menu', 'min', 'minChars', 'mode', 'mouseOffsetX', 'mouseOffsetY', 'multiSelect', 'onAction', 'onChange', 'onClick', 'onItem', 'picker', 'pickerAlignElement', 'pickerFormat', 'pickerWidth', 'placeholder', 'pressed', 'readOnly', 'required', 'resize', 'ripple', 'selected', 'showOnClick', 'showOnHover', 'showProgress', 'showTooltip', 'showValue', 'step', 'store', 'style', 'tabMinWidth', 'tabMaxWidth', 'tbar', 'text', 'timeout', 'title', 'toggle', 'toggleable', 'toggleGroup', 'tools', 'tooltip', 'trapFocus', 'triggerAction', 'triggers', 'type', 'unit', 'useAbbreviation', 'validateFilter', 'value', 'valueField', 'visible', 'width'];
    _this.skipUpdateProps = ['clearable', 'listeners', 'placeholder', 'triggers', 'type'];
    return _this;
  }

  _createClass(BryntumWidget, [{
    key: "componentDidMount",
    value:
    /* #endregion */
    // runs when React rendered DOM so we render the widget into that dom
    function componentDidMount() {
      var _this2 = this;

      var config = {
        // we cannot use adopt because widgets can have different tags
        // e.g. button is <button></button>, adopt does not change tag
        appendTo: this.props.container || this.el
      };
      this.configs.forEach(function (configName) {
        if (undefined !== _this2.props[configName]) config[configName] = _this2.props[configName];
      }); // we must use adopt for splitter to prevent it from being wrapped

      if (config.type === 'splitter' && !this.props.container) {
        delete config.appendTo;
        config.adopt = this.el;
      }

      this.widget = WidgetHelper.createWidget(config);

      if (config.adopt) {
        // this triggers the setter - important for splitter
        this.widget.element = this.el;
      }
    } // eo function componentDidMount

  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var widget = this.widget,
          props = this.props,
          configs = this.configs,
          skipUpdateProps = this.skipUpdateProps;
      Object.keys(props).forEach(function (propName) {
        // we update only changed props skipping the listed props
        if (configs.includes(propName) && !skipUpdateProps.includes(propName) && !ObjectHelper.isEqual(props[propName], nextProps[propName])) {
          widget[propName] = nextProps[propName];
        }
      }); // we don't let React to re-render this component

      return false;
    } // eo function shouldComponentUpdate
    // let's destroy the underlying Bryntum widget

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.widget && this.widget.destroy();
    } // eo function componentWillUnmount

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return this.props.container ? null : /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this3.el = el;
        }
      });
    } // eo function render

  }]);

  return BryntumWidget;
}(Component); // eo class BryntumWidget


BryntumWidget.defaultProps = {};
export default BryntumWidget; // eof