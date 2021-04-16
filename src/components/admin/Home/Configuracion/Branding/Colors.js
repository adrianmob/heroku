import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import { ChromePicker } from "react-color";
import Popover from "@material-ui/core/Popover";

export const Colors = () => {
  const [color, setColor] = useState({
    displayColorPicker: false,
    changeColor: "#18e7f4",
    defaultColor: "#18e7f4",
    color: {
      r: "26",
      g: "230",
      b: "244",
      a: "1",
    },
  });

  const colors = ["#18e7f4", " #ed90fc", "#ffe142", "#f28c2d", "#93f764"];

  const [anchor, setAnchor] = useState(null);
  const handleChangeColor = (color) => {
    deleteClassActive();
    setColor({ ...color, color: color.rgb, changeColor: color.hex });
  };

  const handleOpenPicker = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClosePicker = () => {
    setAnchor(null);
  };
  const handleColorRectClick = (event, background) => {
    deleteClassActive();
    setColor({ ...color, changeColor: background });

    event.target.classList.add("color_active");
  };

  const deleteClassActive = () => {
    let colorsRect = document.querySelectorAll(".branding__color");
    colorsRect.forEach((color) => {
      color.classList.remove("color_active");
    });
  };
  const open = Boolean(anchor);
  const brightness = Math.round(
    (parseInt(color.color.r) * 299 +
      parseInt(color.color.g) * 587 +
      parseInt(color.color.b) * 114) /
      1000
  );
  const textColour = brightness > 125 ? "black" : "white";

  return (
    <div>
      <div className="branding_container_colors">
        {colors.map((color, idx) => (
          <div
            style={{ background: color }}
            className="branding__color"
            onClick={(e) => {
              handleColorRectClick(e, color);
            }}
            key={idx}
          ></div>
        ))}
        <IconButton className="branding__color" onClick={handleOpenPicker}>
          <AddIcon fontSize="large" />
        </IconButton>
        <Popover
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={open}
          onClose={handleClosePicker}
        >
          <ChromePicker color={color.color} onChange={handleChangeColor} />
        </Popover>
      </div>
      <div className="branding_container_picker">
        <input
          style={{ backgroundColor: color.changeColor, color: textColour }}
          value={color.changeColor}
          className="branding__input"
          readOnly
        />
      </div>
    </div>
  );
};
