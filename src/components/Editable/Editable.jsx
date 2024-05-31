import React, { useState } from "react";
import { Plus, X } from "react-feather";
import "./Editable.css";

const Editable = ({ name, btnName, onSubmit, placeholder }) => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (text && onSubmit) {
      setText("");
      onSubmit(text);
    }
    setShow(false);
  };

  return (
    <div className={``}>
      {show ? (
        <form onSubmit={handleOnSubmit}>
          <div className={``}>
            <textarea
              placeholder={placeholder}
              autoFocus
              id={"edit-input"}
              type={"text"}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center gap-4">
              <button className=" bg-primary_color py-2 px-4 rounded-md text-white"  type="submit">
                {`${btnName}` || "Add"}
              </button>
              <X
               className=" hover:text-red-500 cursor-pointer"
                onClick={() => {
                  setShow(false);
                  setHandler(false);
                }}
              />
            </div>
          </div>
        </form>
      ) : (
        <p className=" flex items-center gap-4"
          onClick={() => {
            setShow(true);
          }}
        >
          <Plus /> 
          {name}
        </p>
      )}
    </div>
  );
};

export default Editable;
