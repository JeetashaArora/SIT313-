import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        // Load todos from local storage when the component is mounted
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    const addTodo = todo => {
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }

        const newTodos = [todo, ...todos];

        // Save new todos to local storage
        localStorage.setItem('todos', JSON.stringify(newTodos));

        setTodos(newTodos);
    };

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }

        const updatedTodos = todos.map(item => (item.id === todoId ? newValue : item));

        // Save updated todos to local storage
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        setTodos(updatedTodos);
    };

    const removeTodo = id => {
        const removedArr = todos.filter(todo => todo.id !== id);

        // Save updated todos to local storage
        localStorage.setItem('todos', JSON.stringify(removedArr));

        setTodos(removedArr);
    };

    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });

        // Save updated todos to local storage
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        setTodos(updatedTodos);
    };

    return (
        <div className='todo-bg'>
            <h1 className='heading'>What's the Plan for Today?</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo className="new"
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </div>
    );
}

export default TodoList;
