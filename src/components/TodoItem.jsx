function TodoItem({ task, deleteTask, toggleCompleted }) {
  function handleChange() {
    toggleCompleted(task.id);
  }
  return (
    <div className="todo-item">
      <input type="checkbox" checked={task.completed} onChange={handleChange} />
      {task.completed ? (
        <p className="completed-task">{task.text}</p>
      ) : (
        <p>{task.text}</p>
      )}
      <button onClick={() => deleteTask(task.id)}>X</button>
    </div>
  );
}

export default TodoItem;
