import "./style.less";

import React from "react";
import { Row, Col } from "antd";

/* Components */
import CardTotalRevenue from "~/Core/Modules/Dashboard/Components/CardTotalRevenue";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

const Main = () => {
  const [t, lang] = useTranslate(true);

  return (
    <article>
      <div className="dashboard-page page">
        <div className="page-wrapper">
          <div className="page-container">
            <Row style={{ margin: "0px -8px" }}>
              <Col md={24}>
                <CardTotalRevenue />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Main;
