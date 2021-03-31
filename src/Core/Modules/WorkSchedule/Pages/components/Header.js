/**
 *- Page header container component
 *
 * It contains also controls (tools).
 * It is implemented as a functional component using React hooks that
 * were introduced in React 16.8.0. If you cannot upgrade to that or
 * later version of React then you must convert this component to class.
 */
// libraries
import React from 'react';
import { Tools, FullscreenButton } from 'bryntum-react-shared';
import { Icon } from "antd";
import useTranslate from "~/Core/Components/common/Hooks/useTranslate";
import NavBreadcrumbContentHeader from "~/Core/Components/common/NavBreadcrumbContentHeader";

const Header = ({props, breadcrumb }) => {
    // const title = props.title || document.title || '',
    //       href = props.titleHref || '#'
    const t = useTranslate();

    return (
        // <header>
        //     {/* <div id="title-container">
        //         <a id="title" href={href}>{title}</a>
        //     </div>
        //     className="demo-header"
        //     <Tools>
        //         <FullscreenButton container='tools' />
        //     </Tools> */}
        //     <div className="breadcrumb">
        //       <div className="nav-left">
        //         <div className="btn-bookmark">
        //           <Icon type="star" theme="filled" />
        //         </div>
        //         <NavBreadcrumbContentHeader data={breadcrumb} />
        //       </div>
        //       <div className="nav-right btn-group">
                
        //       </div>
        //     </div>
        // </header>
        <div className="content-header-page">
        <div className="content-header-add">
          <div className="content-header-wrapper">
            <div className="content-breadcrumb">
              <div className="breadcrumb">
                <div className="nav-left">
                  <div className="btn-bookmark">
                    <Icon type="star" theme="filled" />
                  </div>
                  <NavBreadcrumbContentHeader data={[{ title:t("CORE.WORKSCHEDULE.MANAGEMENT") }]} />
                </div>
                <div className="nav-right btn-group">
                <Tools> <FullscreenButton container='tools' /></Tools>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}; // eo function header

export default Header;

// eof
