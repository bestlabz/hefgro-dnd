import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";
import { FaChevronCircleRight } from "react-icons/fa";

export default function Board({
  key,
  id,
  name,
  card,
  // setName,
  addCard,
  removeCard,
  removeBoard,
  updateCard,
}) {
  // const [show, setShow] = useState(false);
  // const [dropdown, setDropdown] = useState(false);

  console.log("card", card);
  // useEffect(() => {
  //   document.addEventListener("keypress", (e) => {
  //     if (e.code === "Enter") setShow(false);
  //   });
  //   return () => {
  //     document.removeEventListener("keypress", (e) => {
  //       if (e.code === "Enter") setShow(false);
  //     });
  //   };
  // });

  return (
    <div className=" relative flex flex-col w-[390px] h-screen break-words border-[1px] border-primary_color rounded-md   bg-[#90caf92b] p-3">
      <div className="flex items-center justify-between bg-primary_color rounded-md px-3 ">
        <div className=" w-full min-h-[50px] flex items-center justify-between">
          <p className="text-primary_text_color font-semibold text-[19px]">
            {name || ""}
          </p>
          <p className="p-3 min-w-[50px] h-[30px] flex items-center justify-center rounded-md bg-white text-primary_text_color font-semibold text-[16px]">
            {card?.length}
          </p>
        </div>
      </div>
      <Droppable droppableId={id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {card?.map((items, index) => (
              <Card
                bid={id}
                id={items.id}
                index={index}
                key={items.id}
                location={items.location}
                orgin={items.orgin}
                specification={items.specification}
                vendorID={items.vendor_id}
                updateCard={updateCard}
                removeCard={removeCard}
                card={items}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* <div className=" flex items-center justify-end gap-2 text-primary_text_color cursor-pointer">


      <p className=" mb-1 font-semibold ">more </p>
      <FaChevronCircleRight />
      </div> */}
    </div>
  );
}
