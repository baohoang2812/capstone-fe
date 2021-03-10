import React, { useEffect, useState } from "react";

class Rector extends React.Component {
  static defaultProps = {
    width: 320,
    height: 200,
    strokeStyle: "#F00",
    lineWidth: 1,
    onSelected: () => {},
  };

  canvas = null;
  ctx = null;
  isDirty = false;
  isDrag = false;
  startX = -1;
  startY = -1;
  curX = -1;
  curY = -1;

  constructor(props) {
    super(props);
  }

  componentDidMount(props) {
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = this.props.strokeStyle;
    this.ctx.lineWidth = this.props.lineWidth;

    this.addMouseEvents();
  }

  componentDidUpdate() {
    const { config } = this.props;
    console.log(config);
    requestAnimationFrame(this.updateFrame);
  }

  updateFrame = () => {
    const { config } = this.props;
    requestAnimationFrame(this.updateFrame);
    this.ctx.clearRect(0, 0, this.props.width, this.props.height);

    this.ctx.strokeStyle = "blue";
    if (config && config.length >= 0) {
      config.forEach((rect) => {
        this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
      });
    }
  };

  updateCanvas = () => {
    if (this.isDrag) {
      requestAnimationFrame(this.updateCanvas);
    }
    if (!this.isDirty) {
      return;
    }
    this.ctx.strokeStyle = "#F00";

    this.ctx.clearRect(0, 0, this.props.width, this.props.height);
    if (this.isDrag) {
      const rect = {
        x: this.startX,
        y: this.startY,
        w: this.curX - this.startX,
        h: this.curY - this.startY,
      };
      this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
    this.isDirty = false;
  };

  componentWillUnmount() {
    this.removeMouseEvents();
  }

  addMouseEvents() {
    document
      .getElementById("canvas-image")
      .addEventListener("mousedown", this.onMouseDown, false);
    document
      .getElementById("canvas-image")
      .addEventListener("mousemove", this.onMouseMove, false);
    document
      .getElementById("canvas-image")
      .addEventListener("mouseup", this.onMouseUp, false);
  }
  removeMouseEvents() {
    document
      .getElementById("canvas-image")
      .removeEventListener("mousedown", this.onMouseDown, false);
    document
      .getElementById("canvas-image")
      .removeEventListener("mousemove", this.onMouseMove, false);
    document
      .getElementById("canvas-image")
      .removeEventListener("mouseup", this.onMouseUp, false);
  }

  onMouseDown = (e) => {
    this.isDrag = true;
    this.curX = this.startX = e.offsetX;
    this.curY = this.startY = e.offsetY;
    requestAnimationFrame(this.updateCanvas);
  };

  onMouseMove = (e) => {
    if (!this.isDrag) return;
    this.curX = e.offsetX;
    this.curY = e.offsetY;
    this.isDirty = true;
  };

  onMouseUp = (e) => {
    this.isDrag = false;
    this.isDirty = true;

    const rect = {
      x: Math.min(this.startX, this.curX),
      y: Math.min(this.startY, this.curY),
      w: Math.abs(e.offsetX - this.startX),
      h: Math.abs(e.offsetY - this.startY),
    };
    this.props.onSelected(rect);
  };

  render() {
    return (
      <div id="canvas-image">
        <canvas
          style={{
            border: "1px solid blue",
            width: "640px",
            height: "480px",
            background:
              `url("${this.props.image}") no-repeat center center`,
          }}
          width={this.props.width}
          height={this.props.height}
          ref={(c) => {
            this.canvas = c;
          }}
        />
      </div>
    );
  }
}

export default Rector;
