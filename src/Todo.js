import React from 'react';

function Todo(props) {
    const {content, id, checked, important} = props;
    let itemClass= "todo-item";
    if(checked){
        itemClass += " checked";
    }
    if(important){
      itemClass += " important";
    }

    return (
        <div className={itemClass} onClick={() => {props.onCheckedToggle(id);}}>
            {content}
            <span className="remove-todo" onClick={(e) => {e.stopPropagation();props.highlight(id,important)}}>!</span>
            <span
                className="remove-todo"
                onClick={(e) => {e.stopPropagation();props.onTodoRemove(id)}}>X</span>


        </div>
    );
}

export default Todo;
