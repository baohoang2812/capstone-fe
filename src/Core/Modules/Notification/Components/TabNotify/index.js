import "./style.less";

import React from "react";
import { Row, Empty, Pagination } from "antd";
// import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
// import { updateListNotification } from "~/Core/Store/actions/notification";
// import PopUpNotifyPage from "~/Core/Modules/Notification/Component/PopUpNotiDetail/withPopUpNotiDetail";
// const t = useTranslate();
const TabNotify = (Component) => ({
  listNoti,
  pagination,
  onChangePageIndex,
  onShowSizeChange,
}) => {
  // const [visibleChangePopUp, setVisibleChangePopUp] = useState(false);
  // const [dataDetail, setDataDetail] = useState();

  const { totalRows = 0, pageIndex = 1, pageSize = 1 } = pagination;

  const handleChangePageIndex = (pageIndex, pageSize) => {
    onChangePageIndex({ pageIndex, pageSize });
  };

  const handleShowSizeChange = (current, pageSize) => {
    onShowSizeChange({ pageIndex: 1, pageSize });
  };

  const handleOpenModal = (item) => {
    // setDataDetail(item);
    // setVisibleChangePopUp(true);
    // dispatch(updateListNotification([item.id]));
  };

  return (
    <>
      {/* <PopUpNotifyPage
        visibleModal={visibleChangePopUp}
        setVisibleModal={setVisibleChangePopUp}
        dataDetail={dataDetail}
      /> */}
      <div className="tab-notify-list">
        <Row gutter={24}>
          {listNoti && listNoti.length > 0 ? (
            listNoti.map((item, index) => (
              <Component
                key={index}
                detail={item}
                handleOpenModal={handleOpenModal}
              />
            ))
          ) : (
            <Empty description={<span>Do not have notification</span>} />
          )}
        </Row>
        {pagination && listNoti && listNoti.length > 0 && (
          <div style={{ textAlign: "center", marginTop: 10, marginBottom: 10 }}>
            <Pagination
              total={totalRows}
              pageSize={pageSize}
              defaultCurrent={1}
              current={pageIndex}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} rows`
              }
              showSizeChanger={true}
              pageSizeOptions={["5", "10", "20", "50", "100", "200", "500"]}
              onChange={handleChangePageIndex}
              onShowSizeChange={handleShowSizeChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TabNotify;