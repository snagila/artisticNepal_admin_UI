import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SidebarItem = (props) => {
  const { icon, label, path, activeItem, setActiveItem } = props;
  return (
    <>
      <Link className="text-decoration-none pt-2 " to={path}>
        <Button
          variant={activeItem === label ? "dark" : "outline-dark"}
          className={
            activeItem === label
              ? "w-100 fw-bold text-light   sideBarItems px-0 "
              : "w-100 fw-bold text-dark   sideBarItems px-0"
          }
          onClick={() => setActiveItem(label)}
        >
          {icon} {label}
        </Button>
      </Link>
    </>
  );
};

export default SidebarItem;
