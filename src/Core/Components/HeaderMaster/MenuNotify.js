import React, { useState, useEffect } from "react";
import { Avatar, List } from "antd";
import { Link} from "react-router-dom";
import notiApi from "~/Core/Modules/Notification/Api";
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

  const onMarkAllAsRead = () => {
    // dispatch(updateListNotification("all"));
  }
  const [listNoti, setListNoti] = useState([]);

  useEffect(() => {
    ( async () => {
      const res = await notiApi.getList(0, 5);
        if (res.code !== 200) {

          return;
        }
        const data = res?.data?.result || [];
        setListNoti(data);
    })()
   
  }, [])

  const onClick = (e, item) => {
    e.preventDefault();
    handleOpenModal(item);
    return;
  }

  return (
    <div className = "dropdown-menu-notify">
      <h4 className = "title" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>
          Thông báo mới nhận
        </span>
        <div style ={{ padding: "0 10px" }} onClick={onMarkAllAsRead}>
          <svg width ="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d ="M8 11L11 14L22 3" stroke="#2B3D4B" strokeLinecap="round" strokeLinejoin="round" />
            <path d ="M20 12V19C20 20.1046 19.1046 21 18 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H15" stroke="#2B3D4B" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </h4>

      <List
        itemLayout ="horizontal"
        dataSource ={listNoti}
        renderItem ={item => (
          <Link
            onClick ={(e) => onClick(e, item)}
            to ="#"
          >
            <List.Item className ={!item.isRead && "unread"}>
              <List.Item.Meta
                avatar ={<Avatar shape="square" size="large" />}
                title ={<span>{item?.notification?.name}</span>}
                description ={
                  <div className ="description">
                    <p style ={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }} dangerouslySetInnerHTML={{ __html: item?.notification?.description }} />
                    <span>{
                      moment(item?.notification?.createdAt).format("DD-MM-YYYY HH:mm")
                    }</span>
                  </div>
                }
              />
            </List.Item>
          </Link>
        )}
      />
      <Link to ="/notification/" className="link-read-all">Xem tất cả</Link>
    </div>
  )
}