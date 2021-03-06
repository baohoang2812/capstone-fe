import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
// import { Alert} from "antd";

/* Hooks */
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";

/* Components */
import Header from "~/Core/Modules/Employee/Components/Header/Header";
import ProfileForm from "~/Core/Modules/Profile/Components/Form/ProfileForm";

/* Api */

const Profile = ({ match: { params } }) => {
  const t = useTranslate();
  const history = useHistory();
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(false);

  const action = () => {
    history.push("/employee");
  };

  useEffect(() => {
   

    
  }, []);

  return (
    <>
      <div className="user">
        <Header
          breadcrumb={[
            {
              title: t("CORE.EMPLOYEE.PROFILE.TITLE"),
            },
          ]}
          action={action}
          text={t("CORE.back")}
          className="btn-yellow"
        />
        {/* {error ? (
          <Alert type="error" message={t("CORE.task_failure")} />
        ) : ( */}
          <ProfileForm />
        {/* )} */}
      </div>
    </>
  );
};

export default Profile;
