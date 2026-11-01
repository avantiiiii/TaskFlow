import API from "../services/api";

function Taskcard({ task, onTaskUpdated, onTaskDeleted }) {
const updateStatus = async (e) => {
const status = e.target.value;


    try {
        await API.put("/tasks/" + task._id, { status });
        onTaskUpdated();
    } catch (error) {
        alert(error.response?.data?.message || "Could not update task");
    }
};

const deleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;

    try {
        await API.delete("/tasks/" + task._id);
        onTaskDeleted();
    } catch (error) {
        alert(error.response?.data?.message || "Could not delete task");
    }
};

return (
    <article className="task-card">
        <h3>{task.title}</h3>
        <p>{task.description || "No description provided."}</p>

        <div className="task-card-footer">
            <select value={task.status} onChange={updateStatus}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Completed</option>
            </select>

            <button className="delete-task" onClick={deleteTask}>
                Delete
            </button>
        </div>
    </article>
);


}

export default Taskcard;
