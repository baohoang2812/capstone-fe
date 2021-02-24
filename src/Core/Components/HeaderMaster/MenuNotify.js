import React, { useCallback } from "react";
import { Avatar, List } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

/* Actions */
// import { updateListNotification } from "~/Core/Store/actions/notification";

/* Image */
// import UntitledImg from "~/Core/Modules/Notification/assets/Untitled.png";
// import AttentionImg from "~/Core/Modules/Notification/assets/Attention.png";

export default ({
  handleOpenModal
}) => {
  // const listNotification = useSelector(state => state.NotificationCore.listNotificationHeader)
  const dispatch = useDispatch();
  const history = useHistory();

  const onMarkAllAsRead = () => {
    // dispatch(updateListNotification("all"));
  }

  const rederDataNotification = useCallback(
    () => {
      let data = [{
        is_check: true,
        title: "Hệ thống Mavca",
        content: "Vui lòng chọn lịch làm việc",
        datetime: "2 phút trước"
      },
      {
        is_check: false,
        title: "Hệ thống Mavca",
        content: "Thích vậy đó, chịu không chịu buộc chịu",
        datetime: "51 phút trước"
      },
      {
        is_check: false,
        title: "Hệ thống Mavca",
        content: "Phát hiện 2 lỗi vi phạm khu vực 2",
        datetime: "2 giờ trước"
      },
      {
        is_check: false,
        title: "Hệ thống Mavca",
        content: "Phát hiện 5 lỗi vi phạm khu vực 3",
        datetime: "3 giờ trước"
      }
    ];

      return data
    },
    []
  )

  const onClick = (e, item) => {
    e.preventDefault();
    handleOpenModal(item);
    return;
  }

  return (
    <div className="dropdown-menu-notify">
      <h4 className="title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>
          Thông báo mới nhận
        </span>
        <div style={{ padding: "0 10px" }} onClick={onMarkAllAsRead}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 11L11 14L22 3" stroke="#2B3D4B" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 12V19C20 20.1046 19.1046 21 18 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H15" stroke="#2B3D4B" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </h4>

      <List
        itemLayout="horizontal"
        dataSource={rederDataNotification()}
        renderItem={item => (
          <Link
            onClick={(e) => onClick(e, item)}
            to="#"
          >
            <List.Item className={!item.is_check && "unread"}>
              <List.Item.Meta
                avatar={<Avatar shape="square" size="large" />}
                title={<span>{item.title}</span>}
                description={
                  <div className="description">
                    <p style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }} dangerouslySetInnerHTML={{ __html: item.content }} />
                    <span>{item.datetime}</span>
                  </div>
                }
              />
            </List.Item>
          </Link>
        )}
      />
      <Link to="/notification/" className="link-read-all">Xem tất cả</Link>
    </div>
  )
}