import "./style.less";

import React, { useEffect, useState } from "react";
import { Card, Spin, message as popupMessage } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "~/Core/Components/common/Header/NoBtn";
import withTabNotify from "~/Core/Modules/Notification/Components/TabNotify";
import notiApi from "~/Core/Modules/Notification/Api";
import ItemOrder from "~/Core/Modules/Notification/Components/TabNotify/ItemOrder";
// import * as action from "~/Core/Store/actions/notification";
// import { updateListNotification, clearCountNotification } from "~/Core/Store/actions/notification";

const ComponentSystem = (withTabNotify(ItemOrder))

export const Notify = () => {
  const [key, setKey] = useState('tab1')
  const [error, setError] = useState(false);
  // const dispatch = useDispatch();
  // const listNotification = useSelector(state => state?.NotificationCore?.listNotification || [])
  // const pageIndex = useSelector(state => state?.NotificationCore?.pageIndex || 1)
  // const pageSize = useSelector(state => state?.NotificationCore?.pageSize || 20)
  // const totalRows = useSelector(state => state?.NotificationCore?.totalRows || 100)
  // const loading = useSelector(state => state?.NotificationCore?.loading || false)
  // const error = useSelector(state => state?.NotificationCore?.error || false)
  const message = useSelector(state => state?.NotificationCore?.message || "")
  const [listNoti, setListNoti] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(50);
  const [loading, setLoading] = useState(false);
  // const callAPI = (pageSize, pageIndex, key) => {
  //   let filter = {
  //     pageSize: pageSize,
  //     pageIndex: pageIndex,
  //     where: [],
  //     order: {
  //       created_at: "desc"
  //     }
  //   }
  //   switch (key) {
  //     case 'tab2':
  //       filter.where = [
  //         {
  //           "type": {
  //             "$eq": 'order'
  //           }
  //         }
  //       ]
  //       break;
  //     case 'tab3':
  //       filter.where = [
  //         {
  //           "type": {
  //             "$eq": 'system'
  //           }
  //         }
  //       ]
  //       break;
  //     default:
  //   }

  //   // dispatch(action.getListNotification(filter))
  // }
  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        const res = await notiApi.getList(0, 10,);
        if (res.code !== 200) {
          message.error("CORE.MENU.message_error");
          setError(true);
          return;
        }
        const listNotification = res?.data?.result || {};
        setListNoti(listNotification);
        console.log(listNotification);
        const totalRows = res?.data?.total
        setTotalRows(totalRows);
        setLoading(false);

      } catch (error) {
        setError(true);
        setLoading(false);

      }
    })();
  }, []);

  useEffect(() => {

    // call api
    // callAPI(50, 1, key)
    // dispatch(clearCountNotification())
  }, [])

  useEffect(() => {
    if (loading) {
      if (error) {
        popupMessage.message(message)
      }
    }
  }, [loading])

  const onChangePageIndex = (pagination) => {
    // update pageIndex pageSize
    // call api with pageIndex - 1
    setLoading(true);

    setPageIndex(pagination.pageIndex);
    setPageSize(pagination.pageSize);
    (async () => {
      try {
        const res = await notiApi.getList(pagination.pageIndex - 1, pagination.pageSize)
        if (res.code !== 200) {
          message.error("CORE.MENU.message_error");
          setError(true);
          return;
        }
        const listNotification = res?.data?.result || {};
        setListNoti(listNotification);
        console.log(listNotification);
        const totalRows = res?.data?.total
        setTotalRows(totalRows);
        setLoading(false);

      } catch (error) {
        setError(true);
        setLoading(false);

      }
    })();

  }

  const onShowSizeChange = (pagination) => {
    // update pageIndex pageSize
    // call api with pageIndex - 1
    setPageIndex(pagination.pageIndex);
    setPageSize(pagination.pageSize);
    setLoading(true);
    (async () => {
      try {
        const res = await notiApi.getList(pagination.pageIndex - 1, pagination.pageSize)
        if (res.code !== 200) {
          message.error("CORE.MENU.message_error");
          setError(true);
          return;
        }
        const listNotification = res?.data?.result || {};
        setListNoti(listNotification);
        console.log(listNotification);
        const totalRows = res?.data?.total
        setTotalRows(totalRows);
        setLoading(false);

      } catch (error) {
        setError(true);
        setLoading(false);
      }
    })();
  }

  const onChangeTab = (key) => {
    setKey(key)
    notiApi.getList(1, 10);

  }

  const readAll = (e) => {
    e.preventDefault();
    // dispatch(updateListNotification('all'))
  }

  const pagination = { totalRows, pageIndex, pageSize };
  // const user_info = JSON.parse(localStorage.getItem("user_info"));

  const tabList = [
    {
      key: 'tab1',
      tab: 'Tất cả',
    }
  ];

  return (
    <article>
      <div className="notify-page page">
        <Header
          breadcrumb={[
            { title: "Thông báo" }
          ]}
        />
        <div className="page-wrapper">
          <div className="page-container">
            <div className="card-notify">
              <Card
                extra={<Link to="#" onClick={readAll} className="mask-all-as-read">Đánh dấu đã đọc</Link>}
                tabList={tabList}
                activeTabKey={key}
                onTabChange={key => {
                  onChangeTab(key)
                }}
              >
                <Spin spinning={loading}>
                  <ComponentSystem
                    listNoti={listNoti}
                    pagination={pagination}
                    onChangePageIndex={onChangePageIndex}
                    onShowSizeChange={onShowSizeChange}
                  />
                </Spin>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Notify;