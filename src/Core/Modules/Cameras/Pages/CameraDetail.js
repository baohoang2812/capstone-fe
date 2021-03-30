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
            const point_1 = JSON.parse(item?.point1)
            const point_2 = JSON.parse(item?.point2)
            const point_3 = JSON.parse(item?.point3)
            const point_4 = JSON.parse(item?.point4)

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