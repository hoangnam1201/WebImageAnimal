import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ linkList, orientation = "horizontal", ...rest }) => {
  const [value, setValue] = useState(0);
  const location = useLocation();

  useEffect(() => {
    linkList?.forEach((value, index) => {
      if (location.pathname.indexOf(value.href) !== -1) {
        setValue(index);
        return;
      }
    });
  }, [location]);

  return (
    <div {...rest}>
      <Tabs
        orientation={orientation}
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue);
        }}
      >
        {linkList &&
          linkList.map(({ label, href }, index) => (
            <Tab
              value={index}
              label={label}
              LinkComponent={Link}
              to={href}
              key={index}
            />
          ))}
      </Tabs>
    </div>
  );
};

export default Nav;
