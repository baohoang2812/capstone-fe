import "./style.less";

import React from "react";
import { Row, Col } from "antd";

/* Components */
import CardTotalRevenue from "~/Core/Modules/Dashboard/Components/CardTotalRevenue";
import LineChart from "~/Core/Modules/Dashboard/Components/LineChart";
import LineChart2 from "~/Core/Modules/Dashboard/Components/LineChart2";
/* Hooks */
// import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const Main = () => {
  // const [t, lang] = useTranslate(true);

  return (
    <article>
      <div className="dashboard-page page">
        <div className="page-wrapper">
          <div className="page-container">
          <Row style={{ margin: "0px -8px" }}>
              <Col md={24}>
                <LineChart />
              </Col>
            </Row>
            <Row style={{ margin: "0px -8px" }}>
              <Col md={24}>
                <CardTotalRevenue />
              </Col>
            </Row>
            <Row style={{ margin: "0px -8px" }}>
              <Col md={24}>
                <LineChart2 />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Main;
