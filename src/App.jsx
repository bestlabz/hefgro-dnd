import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "./components/Editable/Editable";
function App() {
  const [data, setData] = useState(
    // localStorage.getItem("hefgro-board")
    //   ? JSON.parse(localStorage.getItem("hefgro-board"))
    //   : 
      [
        {
        id: uuidv4(),
        boardName: "Request For Quotation",
        card: [
          {
            id:uuidv4(),
            vendor_id: "98123D20A1",
            specification: "Branded t-shirt",
            orgin: "United States",
            location: "United States"
          },
          {
            id:uuidv4(),
            vendor_id: "98123D20A2",
            specification: "Branded",
            orgin: "United States",
            location: "United States"
          },
          {
            id:uuidv4(),
            vendor_id: "98123D20A3",
            specification: "Branded shirt",
            orgin: "United States",
            location: "United States"
          },
          {
            id:uuidv4(),
            vendor_id: "98123D20A4",
            specification: "Branded west",
            orgin: "United States",
            location: "United States"
          },
        ],
      },
      {
        id: uuidv4(),
        boardName: "Smart Quotation",
        card: [],
      },
      {
        id: uuidv4(),
        boardName: "Buyer Quote Verification",
        card: [],
      },
      {
        id: uuidv4(),
        boardName: "Seller Response",
        card: [],
      },
    ]
  );


 

  // const setName = (title, bid) => {
  //   const index = data.findIndex((item) => item.id === bid);
  //   const tempData = [...data];
  //   tempData[index].boardName = title;
  //   setData(tempData);
  // };

  const dragCardInBoard = (source, destination) => {
    let tempData = [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === destination.droppableId
    );
    const sourceBoardIdx = tempData.findIndex(
      (item) => item.id.toString() === source.droppableId
    );
    tempData[destinationBoardIdx].card.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].card[source.index]
    );
    tempData[sourceBoardIdx].card.splice(source.index, 1);

    return tempData;
  };


  // const addCard = (title, bid) => {
  //   const index = data.findIndex((item) => item.id === bid);
  //   const tempData = [...data];
  //   tempData[index].card.push({
  //     id: uuidv4(),
  //     title: title,
  //     tags: [],
  //     task: [],
  //   });
  //   setData(tempData);
  // };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  // const addBoard = (title) => {
  //   const tempData = [...data];
  //   tempData.push({
  //     id: uuidv4(),
  //     boardName: title,
  //     card: [],
  //   });
  //   setData(tempData);
  // };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    console.log(tempBoards);
    setData(tempBoards);
  };

  // useEffect(() => {
  //   localStorage.setItem("hefgro-board", JSON.stringify(data));
  // }, [data]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-full h-screen flex flex-col" >
        <div className="flex-1 w-full overflow-x-auto">
          <div className="p-[20px] flex gap-[30px] min-w-fit">
            {data.map((item) => (
              <Board
                key={item.id}
                id={item.id}
                name={item.boardName}
                card={item.card}
                // setName={setName}
                // addCard={addCard}
                removeCard={removeCard}
                removeBoard={removeBoard}
                updateCard={updateCard}
              />
            ))}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
