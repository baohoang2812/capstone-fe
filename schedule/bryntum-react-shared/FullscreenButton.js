import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 *- React Fullscreen button wrapper
 *
 * If container is passed in props then it
 * appends itself to that container. Otherwise it creates a
 * div and renders into that div.
 */
// libraries
import React, { Component } from 'react'; // we import schedulerpro.umd for IE11 compatibility only. If you don't use IE import:
// import { Fullscreen, WidgetHelper } from 'bryntum-schedulerpro';

import { Fullscreen, WidgetHelper } from 'bryntum-schedulerpro/schedulerpro.umd';

var FullscreenButton = /*#__PURE__*/function (_Component) {
  _inherits(FullscreenButton, _Component);

  var _super = _createSuper(FullscreenButton);

  function FullscreenButton() {
    _classCallCheck(this, FullscreenButton);

    return _super.apply(this, arguments);
  }

  _createClass(FullscreenButton, [{
    key: "componentDidMount",
    value:
    /**
     * Configure and render Fullscreen button
     */
    function componentDidMount() {
      var _this = this;

      var button = Fullscreen.enabled ? WidgetHelper.createWidget({
        type: 'button',
        id: 'fullscreen-button',
        icon: 'b-icon-fullscreen',
        tooltip: 'Fullscreen',
        toggleable: true,
        cls: 'b-tool',
        onToggle: function onToggle(_ref) {
          var pressed = _ref.pressed;

          if (pressed) {
            Fullscreen.request(document.documentElement);
          } else {
            Fullscreen.exit();
          }
        }
      }) : null; // eo function button

      if (button) {
        Fullscreen.onFullscreenChange(function () {
          _this.button.pressed = Fullscreen.isFullscreen;
        });
        button.appendTo = this.props.container || this.el;

        if (!this.props.skipRender) {
          button.render();
        }

        this.button = button;
      }
    } // eo function componentDidMount

    /**
     * Cleanup
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.button) {
        Fullscreen.onFullscreenChange(null);
      }
    } // eo function componentWillUnmount

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return this.props.container ? null : /*#__PURE__*/React.createElement("div", {
        ref: function ref(el) {
          return _this2.el = el;
        }
      });
    }
  }]);

  return FullscreenButton;
}(Component); // eo class FullscreenButton
// eof


export { FullscreenButton as default };