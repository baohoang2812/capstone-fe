import "~/styles/components/content_header.less"

import React from "react";
import { Link } from "react-router-dom";

const NavBreadcrumbContentHeader = ({
  data = []
}) => (
  <ul className="nav-breadcrumb">
    {
      data.map((item, index) => {
        if (item.link) return <li key={index + "li"}><Link to={item.link} >{item.title}</Link></li >;

        return <li key={index + "li"}><span>{item.title}</span></li>
      })
    }
  </ul>
)

export default NavBreadcrumbContentHeader;

