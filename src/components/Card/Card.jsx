import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";
const Card = ({
  bid,
  id,
  index,
  key,
  location,
  orgin,
  specification,
  vendorID,
  updateCard,
  removeCard,
  card,
}) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Draggable key={id.toString()} draggableId={id.toString()} index={index}>
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={updateCard}
              onClose={setModalShow}
              card={card}
              bid={bid}
              removeCard={removeCard}
            />
          )}

          <div
            className="w-full py-3"
            onClick={() => {
              setModalShow(true);
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className=" w-full min-h-[200px] flex flex-col gap-3 rounded-md p-3 bg-white shadow-md shadow-gray-400">
              {console.log('asdasd', card)}
              <div className=" flex items-center justify-between">
                <div className=" w-[50%] flex items-start flex-col gap-2">
                  <p className=" text-primary_text_color font-semibold">
                    Vendor ID
                  </p>
                  <p className=" text-gray-400 font-semibold">{card.vendor_id}</p>
                </div>
                <div className=" w-[50%] flex items-end flex-col gap-2">
                  <p className=" text-primary_text_color font-semibold">
                    Specification
                  </p>
                  <p className=" text-gray-400 font-semibold">
                    {card.specification}
                  </p>
                </div>
              </div>

              <div className=" flex items-center justify-between my-3">
                <div className=" w-[50%] flex items-start flex-col gap-2">
                  <p className=" text-primary_text_color font-semibold">
                    Origin
                  </p>
                  <p className=" text-gray-400 font-semibold">{card.orgin}</p>
                </div>
                <div className=" w-[50%] flex items-end flex-col gap-2">
                  <p className=" text-primary_text_color font-semibold">
                    Location
                  </p>
                  <p className=" text-gray-400 font-semibold">{card.location}</p>
                </div>
              </div>

              <div className=" flex items-center justify-end w-full gap-4">
                <button className=" border-[2px] text-cancel_color border-cancel_color px-4 py-1 rounded-lg">
                  Reject
                </button>
                <button className=" border-[2px] text-white border-success_color bg-success_color px-4 py-1 rounded-lg">
                  Verified
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
