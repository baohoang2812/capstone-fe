import { Button } from "antd";
import React from "react";
import { Stage, Layer, Line, Rect } from "react-konva";
class Rector extends React.Component {
  state = {
    indexBox: 0,
    listBox: [
      {
        points: [],
        curMousePos: [0, 0],
        isMouseOverStartPoint: false,
        isFinished: false,
      },
    ],
  };

  componentDidUpdate(prevProps) {
    const { config: prevConfig } = prevProps;
    const { config: nextConfig } = this.props;

    if (nextConfig && nextConfig !== prevConfig) {
      this.setState({
        listBox: nextConfig,
      });
    }
  }

  getMousePos = (stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  };

  handleClick = (event) => {
    const {
      state: { listBox, indexBox },
      props: { setConfig },
      getMousePos,
    } = this;
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    let dummyListBox = listBox;
    const { isFinished, isMouseOverStartPoint, points } = dummyListBox[
      indexBox
    ];

    if (isFinished) {
      this.setState({
        indexBox: indexBox + 1,
        listBox: [
          ...listBox,
          {
            points: [],
            curMousePos: [0, 0],
            isMouseOverStartPoint: false,
            isFinished: false,
          },
        ],
      });

      setConfig(listBox);
      return;
    }
    if (isMouseOverStartPoint && points.length >= 3) {
      dummyListBox[indexBox].isFinished = true;

      this.setState({
        listBox: dummyListBox,
      });
      setConfig(dummyListBox);
    } else {
      dummyListBox[indexBox].points = [...points, mousePos];

      this.setState({
        listBox: dummyListBox,
      });
      setConfig(dummyListBox);
    }
  };

  handleMouseMove = (event) => {
    const { indexBox, listBox } = this.state;
    let dummyListBox = listBox;

    const { getMousePos } = this;
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    dummyListBox[indexBox].curMousePos = mousePos;
    this.setState({
      listBox: dummyListBox,
    });
  };

  handleMouseOverStartPoint = (event) => {
    const { indexBox, listBox } = this.state;
    let dummyListBox = listBox;

    const { isFinished, points } = dummyListBox[indexBox];

    if (isFinished || points.length < 3) return;
    event.target.scale({ x: 2, y: 2 });
    dummyListBox[indexBox].isMouseOverStartPoint = true;

    this.setState({
      listBox: dummyListBox,
    });
  };

  handleMouseOutStartPoint = (event) => {
    const { indexBox, listBox } = this.state;
    let dummyListBox = listBox;

    event.target.scale({ x: 1, y: 1 });
    dummyListBox[indexBox].isMouseOverStartPoint = false;

    this.setState({
      listBox: dummyListBox,
    });
  };

  handleDragStartPoint = (event) => {
    console.log("start", event);
  };

  handleDragMovePoint = (event) => {
    const { indexBox, listBox } = this.state;
    let dummyListBox = listBox;

    const points = dummyListBox[indexBox]?.points;
    const index = event.target.index - 1;
    const pos = [event.target.attrs.x, event.target.attrs.y];
    const dummyData = [
      ...points.slice(0, index),
      pos,
      ...points.slice(index + 1),
    ];

    dummyListBox[indexBox].points = dummyData;

    this.setState({
      listBox: dummyListBox,
    });
  };

  handleDragOutPoint = (event) => {
    console.log("end", event);
  };

  handleRender = (item) => {
    const { points, curMousePos, isFinished } = item;

    return points
      .concat(isFinished ? [] : curMousePos)
      .reduce((a, b) => a.concat(b), []);
  };

  handleUndo = () => {
    const { listBox, indexBox } = this.state;

    let dummyListBox = listBox;

    let { points } = dummyListBox[indexBox];

    if (points.length > 1) {
      points.pop();
      dummyListBox[indexBox].points = points;
      dummyListBox[indexBox].isMouseOverStartPoint = false;
      dummyListBox[indexBox].isFinished = false;
    } else {
      dummyListBox.pop();
      if (indexBox === 0) {
        this.setState({
          indexBox: 0,
          listBox: [
            {
              points: [],
              curMousePos: [0, 0],
              isMouseOverStartPoint: false,
              isFinished: false,
            },
          ],
        });
        return;
      } else {
        this.setState({
          indexBox: indexBox - 1,
        });
      }
    }

    this.setState({
      listBox: dummyListBox,
    });
  };

  render() {
    const {
      state: { listBox, indexBox },
      props: { image, getNewImage },
      handleClick,
      handleMouseMove,
      handleMouseOverStartPoint,
      handleMouseOutStartPoint,
      handleDragStartPoint,
      handleDragMovePoint,
      handleDragEndPoint,
    } = this;
    console.log(listBox, indexBox);

    return (
      <>
        <Button
          style={{
            margin: 15,
          }}
          type="primary"
          onClick={this.handleUndo}
        >
          Undo
        </Button>
        <Button onClick={getNewImage}>Get new image</Button>
        <div style={{ width: 722, height: 540, border: "solid 1px black" }}>
          <Stage
            width={722}
            height={540}
            onMouseDown={handleClick}
            onMouseMove={handleMouseMove}
            style={{
              backgroundImage:`url("${image}")`,
              backgroundRepeat: "no-repeat, repeat",
              backgroundSize: "contain"
            }}
          >
            <Layer>
              {listBox.map((item) => (
                <Line
                  points={this.handleRender(item)}
                  stroke="black"
                  strokeWidth={5}
                  closed={item?.isFinished}
                />
              ))}

              {listBox[indexBox]?.points?.map((point, index) => {
                const width = 6;
                const x = point[0] - width / 2;
                const y = point[1] - width / 2;
                const startPointAttr =
                  index === 0
                    ? {
                        hitStrokeWidth: 12,
                        onMouseOver: handleMouseOverStartPoint,
                        onMouseOut: handleMouseOutStartPoint,
                      }
                    : null;
                return (
                  <Rect
                    key={index}
                    x={x}
                    y={y}
                    width={width}
                    height={width}
                    fill="white"
                    stroke="black"
                    strokeWidth={3}
                    onDragStart={handleDragStartPoint}
                    onDragMove={handleDragMovePoint}
                    onDragEnd={handleDragEndPoint}
                    draggable
                    {...startPointAttr}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </>
    );
  }
}

export default Rector;