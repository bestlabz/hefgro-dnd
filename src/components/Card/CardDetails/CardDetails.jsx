import React, { useState, useEffect } from "react";
import {
  Calendar,
  Check,
  CheckSquare,
  Clock,
  CreditCard,
  List,
  Plus,
  Tag,
  Trash,
  Type,
  X,
} from "react-feather";
import Editable from "../../Editable/Editable";
import Modal from "../../Modal/Modal";
import "./CardDetails.css";
import { v4 as uuidv4 } from "uuid";
import Label from "../../Label/Label";

export default function CardDetails({updateCard,
  onClose,
  card,
  bid,
  removeCard}) {
  const colors = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0"];
  console.log(card)

  const [values, setValues] = useState({ ...card });
  const [input, setInput] = useState(false);
  const [text, setText] = useState(values.specification);
  const [labelShow, setLabelShow] = useState(false);
  const Input = (props) => {
    return (
      <div className="">
        <input
          autoFocus
          defaultValue={text}
          type={"text"}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    );
  };
  const addTask = (value) => {
    values.task.push({
      id: uuidv4(),
      task: value,
      completed: false,
    });
    setValues({ ...values });
  };

  const removeTask = (id) => {
    const remaningTask = values.task.filter((item) => item.id !== id);
    setValues({ ...values, task: remaningTask });
  };

  const deleteAllTask = () => {
    setValues({
      ...values,
      task: [],
    });
  };

  const updateTask = (id) => {
    const taskIndex = values.task.findIndex((item) => item.id === id);
    values.task[taskIndex].completed = !values.task[taskIndex].completed;
    setValues({ ...values });
  };
  const updateTitle = (value) => {
    setValues({ ...values, title: value });
  };

  const calculatePercent = () => {
    const totalTask = values.task.length;
    const completedTask = values.task.filter(
      (item) => item.completed === true
    ).length;

    return Math.floor((completedTask * 100) / totalTask) || 0;
  };

  const removeTag = (id) => {
    const tempTag = values.tags.filter((item) => item.id !== id);
    setValues({
      ...values,
      tags: tempTag,
    });
  };

  const addTag = (value, color) => {
    values.tags.push({
      id: uuidv4(),
      tagName: value,
      color: color,
    });

    setValues({ ...values });
  };

  const handelClickListner = (e) => {
    if (e.code === "Enter") {
      setInput(false);
      updateTitle(text === "" ? values.title : text);
    } else return;
  };

  useEffect(() => {
    document.addEventListener("keypress", handelClickListner);
    return () => {
      document.removeEventListener("keypress", handelClickListner);
    };
  });
  useEffect(() => {
    if (updateCard) updateCard(bid, values.id, values);
  }, [values]);

  return (
    <Modal onClose={onClose}>
      <div className=" bg-white min-w-[800px] min-h-[600px] rounded-lg p-6">
        <div
          className=""
          // style={{ minWidth: "650px", position: "relative" }}
        >
          <div className="flex items-center justify-between">
              <div className="flex items-center pt-3 gap-2">
                <CreditCard size={30} />
                {input ? (
                  <Input title={values.specification} />
                ) : (
                  <h5
                    className=" cursor-pointer text-[22px] font-semibold"
                    // onClick={() => setInput(true)}
                  >
                    {values.specification}
                  </h5>
                )}
              </div>
              <h5
                    className=" cursor-pointer text-[22px] font-semibold text-primary_text_color"
                    // onClick={() => setInput(true)}
                  >
                    {values.vendor_id}
                  </h5>
          </div>
          <div className="row">
            {/* <div className="col-8">
              <h6 className="text-justify">Label</h6>
              <div
                className="d-flex label__color flex-wrap"
                style={{ width: "500px", paddingRight: "10px" }}
              >
                {values.tags.length !== 0 ? (
                  values.tags.map((item) => (
                    <span
                      className="d-flex justify-content-between align-items-center gap-2"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.tagName.length > 10
                        ? item.tagName.slice(0, 6) + "..."
                        : item.tagName}
                      <X
                        onClick={() => removeTag(item.id)}
                        style={{ width: "15px", height: "15px" }}
                      />
                    </span>
                  ))
                ) : (
                  <span
                    style={{ color: "#ccc" }}
                    className="d-flex justify-content-between align-items-center gap-2"
                  >
                    <i> No Labels</i>
                  </span>
                )}
              </div>
              <div className="check__list mt-2">
                <div className="d-flex align-items-end  justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <CheckSquare className="icon__md" />
                    <h6>Check List</h6>
                  </div>
                  <div className="card__action__btn">
                    <button onClick={() => deleteAllTask()}>
                      Delete all tasks
                    </button>
                  </div>
                </div>
                <div className="progress__bar mt-2 mb-2">
                  <div className="progress flex-1">
                    <div
                      class="progress-bar"
                      role="progressbar"
                      style={{ width: calculatePercent() + "%" }}
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {calculatePercent() + "%"}
                    </div>
                  </div>
                </div>

                <div className="my-2">
                  {values.task.length !== 0 ? (
                    values.task.map((item, index) => (
                      <div className="task__list d-flex align-items-start gap-2">
                        <input
                          className="task__checkbox"
                          type="checkbox"
                          defaultChecked={item.completed}
                          onChange={() => {
                            updateTask(item.id);
                          }}
                        />

                        <h6
                          className={`flex-grow-1 ${
                            item.completed === true ? "strike-through" : ""
                          }`}
                        >
                          {item.task}
                        </h6>
                        <Trash
                          onClick={() => {
                            removeTask(item.id);
                          }}
                          style={{
                            cursor: "pointer",
                            widht: "18px",
                            height: "18px",
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}

                  <Editable
                    parentClass={"task__editable"}
                    name={"Add Task"}
                    btnName={"Add task"}
                    onSubmit={addTask}
                  />
                </div>
              </div>
            </div> */}
            {/* <div className="col-4">
              <h6>Add to card</h6>
              <div className="d-flex card__action__btn flex-column gap-2">
                <button onClick={() => setLabelShow(true)}>
                  <span className="icon__sm">
                    <Tag />
                  </span>
                  Add Label
                </button>
                {labelShow && (
                  <Label
                    color={colors}
                    addTag={addTag}
                    tags={values.tags}
                    onClose={setLabelShow}
                  />
                )}
                <button>
                  <span className="icon__sm">
                    <Clock />
                  </span>
                  Date
                </button>

                <button onClick={() => props.removeCard(props.bid, values.id)}>
                  <span className="icon__sm">
                    <Trash />
                  </span>
                  Delete Card
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
