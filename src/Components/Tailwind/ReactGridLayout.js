import React from "react";
import ResponsiveGridLayout from "react-grid-layout";

const ReactGridLayout = () => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ];
  return (
    <>
      <div>ReactGridLayout</div>
      <ResponsiveGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={40}
        width={1200}
      >
        <div className="bg-blue-800" key="a">
          a
        </div>
        <div className="bg-blue-800" key="b">
          b
        </div>
        <div className="bg-blue-800" key="c">
          c
        </div>
      </ResponsiveGridLayout>
    </>
  );
};

export default ReactGridLayout;
