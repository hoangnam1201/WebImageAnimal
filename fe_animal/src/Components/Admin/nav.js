import Tab from "@mui/material/Tab";
import Link from "@mui/material/Link";
import Tabs from "@mui/material/Tabs";
import React, { useState } from "react";

const Nav = ({ linkList, orientation = "horizontal", ...rest }) => {
  const [value, setValue] = useState(0);
  useState(() => {
    linkList?.forEach((value, index) => {
      if (window?.location?.pathname.indexOf(value.href) !== -1)
        setValue(index);
    });
  }, []);
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
              href={href}
              key={index}
            />
          ))}
      </Tabs>
    </div>
  );
};

export default Nav;
