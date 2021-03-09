import React, {useState} from 'react';
import { Col,Modal,Icon,Card,Avatar } from 'antd';
import { Link } from "react-router-dom";
import moment from 'moment';
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import { OpenInBrowser } from '@material-ui/icons';
export const ItemOrder = ({ detail }) => {
  const [visible, setVisible] = useState(false);
  const dummiesItem = {
    id: detail.notification.id,
    name: detail.notification.name,
    description: detail.notification.description,
    datetime: moment(detail.notification.updatedAt).format('DD-MM-YYYY HH:mm:ss'),
    payloadID: "_.get(payload.id, detail)",
    is_check: detail.isRead
  };
  const t = useTranslate();
  const { Meta } = Card;
  const openModel = () => {
    setVisible(true);
  };
  const handleCloseModal = () => {
    setVisible(false);
  };
  return (
    <Col className="gutter-row" span={12}>
      <div className={`tab-notify-item ${!dummiesItem.isRead && 'mark-as-read'}`}>
        <div className="item-thumb">
          <img src="https://cf.shopee.vn/file/db260e324552139ba91c1cb6a04696ce_tn" alt="" />
        </div>
        <div className="item-content">
          <h4>{dummiesItem.name}</h4>
          <div className="item-summary">{dummiesItem.description}</div>
          <span className="item-datetime">{dummiesItem.datetime}</span>
          <Link onClick={openModel} className="link-detail">Xem chi tiết</Link>
        </div>
      </div>
      <Modal
        title={t("CORE.NOTIFICATION.DETAIL")}
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
      >
         <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://cf.shopee.vn/file/db260e324552139ba91c1cb6a04696ce_tn"
      />
    }
    actions={[
            <p>{dummiesItem.datetime}</p>
          ]}
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title={dummiesItem.name}
      description={dummiesItem.description}
      
    />
  </Card>

      </Modal>
    </Col>
  )
}

export default ItemOrder;