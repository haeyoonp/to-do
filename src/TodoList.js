import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import React, { useState } from 'react';

const TodoList = ({data, taskAction}) => {
    //checkTask , removeTask , saveTask, updateIndexTask, setTodoTask

    function handleOnDragEnd(result){
        const items = Array.from(data);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        taskAction[4](items);
        taskAction[3](items);
    };

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todo-list">
                {(provided) => (
                    <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                    {data && data.map(({ _key, content}, index) => {
                    return(<Draggable  key={_key}  draggableId={_key} index={index} >
                     {(provided) => (
                      <li key={_key} className="todo-task" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <input type="checkbox" onClick={() => taskAction[0](_key)}></input>
                      <input key={_key} className="task-input" onFocus={(e) => {console.log('Focused on input');}} 
                      onBlur={(e) => {taskAction[2](_key, e.target.value)}}
                        defaultValue={content}></input>
                      <button className="delete-btn" onClick={() => taskAction[1](_key)}></button>
                      </li>
                      )}
                    </Draggable>)
                    })}
                    {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
  }

export default TodoList;
