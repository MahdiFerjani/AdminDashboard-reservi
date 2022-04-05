import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { makeData, Logo, Tips } from "./Utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { firestore } from "../../../../../fire";

// Import React Table
import ReactTable from "react-table";
import "./react-table.css";
import { AddMostPopular, deleteMostPopular, getMostPopular } from "../../../../store/actions/mostPopular_actions";
import { connect, useDispatch, useSelector } from "react-redux";
import { setDate } from "date-fns";
import { AddTrending, deleteTrending } from "../../../../store/actions/trendingThisWeek_actions";

class DragTrComponent extends React.Component {
   
    constructor(props){
        super(props);   
     }



  render() {
    const { children = null, rowInfo } = this.props;
    console.log('test')
    console.log(rowInfo)
    if (rowInfo) {
      debugger;
      const { original, index } = rowInfo;
      const { name_restaurant } = original;
      
     
      return (

        <Draggable key={name_restaurant} index={index} draggableId={name_restaurant}>
          {(draggableProvided, draggableSnapshot) => (
            <div
              ref={draggableProvided.innerRef}
              {...draggableProvided.draggableProps}
              {...draggableProvided.dragHandleProps}
            >
              <ReactTable.defaultProps.TrComponent>
                {children}
              </ReactTable.defaultProps.TrComponent>
            </div>
          )}
        </Draggable>
      );
    } else
      return (
        <ReactTable.defaultProps.TrComponent>
          {children}
        </ReactTable.defaultProps.TrComponent>
      );
  }
}

class DropTbodyComponent extends React.Component {
  render() {
    const { children = null } = this.props;
    console.log('test2')
    console.log(children)
    return (
      <Droppable droppableId="droppable">
        {(droppableProvided, droppableSnapshot) => (
          <div ref={droppableProvided.innerRef}>
            <ReactTable.defaultProps.TbodyComponent>
              {children}
            </ReactTable.defaultProps.TbodyComponent>
          </div>
        )}
      </Droppable>
    );
  }
}

const TableDndApp = (props) => {
 const [data, setData] = useState(props.data)
const dispatch = useDispatch()

//   componentDidMount() {
//     firestore.collection("RestaurantsMostPopular").get().then((querySnapshot) => {
//        let Rest = []
//        querySnapshot.forEach((doc) => {
//        console.log(`${doc.id} => ${doc.data().lastn}`);
//        Rest.push({   
//        id : doc.id,
//        data: doc.data()})
//        });
       
//        this.setState({Restaurants : Rest})
//      });  
//   }
 useEffect(() => {
 // dispatch(getMostPopular()).then(res =>   props.setresto(MostPopulars !== undefined ? MostPopulars : []))
  setData(props.data)
   return () => {
 
   }
 }, )
  const handleDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const data = reorder(
    data,
      result.source.index,
      result.destination.index
    );

    setData(
      data
    );
  };

  const getTrProps = (state, rowInfo) => {
    //  console.log(rowInfo);
    return { rowInfo };
  };

  const addMostPopularList = () => {

    dispatch(AddTrending(data))
  }

  const deletemostpopular = (id) => {
   
 props.delete(id)
    dispatch(deleteTrending(id))
  }

        


    return (
      <div>
          <div className="col-sm-10">
                                 <button
                                 onClick={() => addMostPopularList()}
                             
                                    className="btn btn-primary"
                                 >
                                    Valider modification
                                 </button>
                              </div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ReactTable
            TrComponent={DragTrComponent}
            TbodyComponent={DropTbodyComponent}
            getTrProps={getTrProps}
            data={data}
            columns={[
              {
                Header: "Name Restaurant",
                accessor: "name_restaurant"
              },
              {
                Header: "Delete",
               
                Cell: row => (
                  <button onClick={() => {
                    console.log(row.original.id)
                    deletemostpopular(row.original.id)
                  
                  }}>
                    <span >
              Delete
                    </span> 
                  </button>
                )

              }
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <div className="btn btn-danger shadow btn-xs sharp">
          <i className="fa fa-trash"></i> </div>
        </DragDropContext>
      </div>
    );}
  


const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default TableDndApp
