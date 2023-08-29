import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../modals/modal";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

const SingleTodo: React.FC<{
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;

  }> = ({ todo, todos, setTodos }) => {

    const [edit, setEdit] = useState<boolean|"">(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
  
    
  
   
  
    const handleDelete = (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };
  
    const handleDone = (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
        )
      );
    };

    const handleEdit = (e: React.FormEvent, id: number) => {

        console.log("fssdghjkytfgh")
  
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit("");
        console.log("adfgf");
      };

      const inputRef = useRef<HTMLInputElement>(null);  
    
    useEffect(() => {
      inputRef.current?.focus();
    }, [edit]);
  
    return (
      <form className="todos__single" >
        {edit ? (
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text"
            ref={inputRef}
          />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )}
        <div>
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit onClick={(e) => handleEdit(e, todo.id)} />
          </span>
          <span className="icon" onClick={() => handleDelete(todo.id)}>
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      </form>
    );
  };
  
  export default SingleTodo;
