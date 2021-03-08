import React from 'react';
import { Col } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';

export const ItemOrder = ({ detail }) => {

  const dummiesItem = {
    id: detail.id,
    name: detail.name,
    description: detail.description,
    // datetime: moment(detail.updated_at).format('DD-MM-YYYY HH:mm:ss'),
    payloadID: "_.get(payload.id, detail)",
    // is_check: detail.is_check
  }

  return (
    <Col className="gutter-row" span={12}>
      <div className={`tab-notify-item ${!dummiesItem.is_check && 'mark-as-read'}`}>
        <div className="item-thumb">
          <img src="https://cf.shopee.vn/file/db260e324552139ba91c1cb6a04696ce_tn" alt="" />
        </div>
        <div className="item-content">
          <h4>{dummiesItem.name}</h4>
          <div className="item-summary">"dummiesItem.description" <Link to="#">"dummiesItem.description"</Link></div>
          <span className="item-datetime">{}</span>
          <Link className="link-detail" to={`/deal/${dummiesItem.id}`}>Xem chi tiết</Link>
        </div>
      </div>
      
    </Col>
  )
}

export default ItemOrder;