import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert, message } from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Cameras/Components/Header/Header";
import BranchDetailForm from "~/Core/Modules/Cameras/Components/Form/CameraDetailForm";

/* Api */
import branchApi from "~/Core/Modules/Cameras/Api";

const BranchDetail = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();
  const [data, setData] = useState({});
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const action = () => {
    history.push("/cameras");
  };

  useEffect(() => {
    if (params.id === "create") {
      // setLoading(false);
      //   setError(true);
    } else {
        branchApi
        .getOne(params.id)
        .then((res) => {
          // setLoading(false);
          if (res.code !== 200) {
            message.error("CORE.MENU.message_error");
            setError(true);
            return;
          }
          let data = res?.data?.result?.[0] || {};
          const listBoxObj = data?.cameraConfig
          const listBox = listBoxObj.map(item => {
            const pointX1 = Math.round(item?.pointX1);
            const pointY1 = Math.round(item?.pointY1);
            const pointX2 = Math.round(item?.pointX2);
            const pointY2 = Math.round(item?.pointY2);
            const pointX3 = Math.round(item?.pointX3);
            const pointY3 = Math.round(item?.pointY3);
            const pointX4 = Math.round(item?.pointX4);
            const pointY4 = Math.round(item?.pointY4);
            const point_1 = [pointX1, pointY1]
            const point_2 = [pointX2, pointY2]
            const point_3 = [pointX3, pointY3]
            const point_4 = [pointX4, pointY4]

            return {
              points: [point_1, point_2, point_3, point_4],
              curMousePos: [0, 0],
              isMouseOverStartPoint: true,
              isFinished: true
            } 
          })
          console.log(listBox)

          data = {
            ...data,
            listBox
          }
          
          setData(data);
        })
        .catch((e) => {
          console.log(e)

          setError(true);
        });
    }
  }, []);
  ;

  return (
    <>
      <div className="user">
        <Header
          breadcrumb={[
            {
              title: t("CORE.CAMERA.MANAGEMENT.TITLE"),
              link: "/branch",
            },
            {
              title:
                params.id === "create"
                  ? t("CORE.CAMERA.CREATE")
                  : t("CORE.CAMERA.UPDATE"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : (
          <BranchDetailForm
            action={action}
            data={data}
            is_create={params.id === "create"}
          />
        )}
      </div>
    </>
  );
};

export default BranchDetail;