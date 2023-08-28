import React, {useState,useEffect} from "react";
import "./style.css";


const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist");
  if(lists)
  return JSON.parse(lists);
else
return [];
}

const Todo = () => {

  // States are here
  const [inputData, setinputData] = useState("");
  const [items,setItems]=useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState("");
  const [toggleButton,setToggleButton]=useState(false);

  useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(items));
  
  }, [items])
  



  // add items function

  const addItems=()=>{
    if(!inputData)
    alert("Please Enter the data");
  else if(inputData && toggleButton)
  {
    setItems(
      items.map((currElem)=>{
        if(currElem.id===isEditItem){
          return {...currElem,name:inputData}
        }
      return currElem;
        })
    )
    setinputData([]);
    setIsEditItem();
    setToggleButton(false);
  }
  else{
    const newInputData={
      id:new Date().getTime().toString(),
      name:inputData,
    };
    setItems([...items,newInputData]);
    setinputData("");
  }
  };

  const editItem=(index)=>{
    const item_todo_edit=items.find((currElem)=>{
      return currElem.id===index;
    })
    setinputData(item_todo_edit.name);
    setIsEditItem(index);
    setToggleButton(true);
  
  }

  // Delete element function

  const deleteItem=(id)=>{
    const updatedLists=items.filter((currElem)=>{
      return currElem.id!==id;
    })
    setItems(updatedLists);
  }

  const deleteAll=()=>{
    setItems([]);
  }



  return (

    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="image" />
            <figcaption>✌️ Add your list here...</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="📝 Enter task"
              className="form-control"
              value={inputData}
              onChange={(event)=>setinputData(event.target.value)
              }
            />
            {toggleButton ? (<i className="fa fa-edit add-btn" onClick={addItems}></i>):(<i className="fa fa-plus add-btn" onClick={addItems}></i>)}
            
          </div>


{/* showing items  */}

          <div className="showItems">

            {
              items.map((currElem,index)=>{
                return(
                    <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i className="far fa-edit add-btn" onClick={()=>editItem(currElem.id)} ></i>
                    <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
                  </div>
                </div>
                )
              })}

          </div>

          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
