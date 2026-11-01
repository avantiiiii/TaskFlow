import { useEffect, useState } from "react";
import API from "../services/api";
import Taskcard from "./Taskcard";

function Taskboard({ onStatsUpdate }) {
const [tasks, setTasks] = useState([]);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");


const fetchTasks = async () => {
    try {
        const response = await API.get("/tasks");
        setTasks(response.data.tasks || []);
        const fetchedTasks = response.data.tasks || [];
setTasks(fetchedTasks);

onStatsUpdate?.({
    total: fetchedTasks.length,
    inProgress: fetchedTasks.filter(
        (task) => task.status === "in-progress"
    ).length,
    completed: fetchedTasks.filter(
        (task) => task.status === "done"
    ).length
});
        setError("");
    } catch (err) {
        setError(err.response?.data?.message || "Could not load tasks.");
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchTasks();
}, []);

const createTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
        await API.post("/tasks", {
            title: title.trim(),
            description: description.trim()
        });

        setTitle("");
        setDescription("");
        await fetchTasks();
    } catch (err) {
        setError(err.response?.data?.message || "Could not create task.");
    }
};

const columns = [
    { key: "todo", label: "To Do" },
    { key: "in-progress", label: "In Progress" },
    { key: "done", label: "Completed" }
];

const totalTasks = tasks.length;
const inProgressTasks = tasks.filter(
    (task) => task.status === "in-progress"
).length;
const completedTasks = tasks.filter(
    (task) => task.status === "done"
).length;

return (
    <div className="taskboard">
        <form className="task-form" onSubmit={createTask}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                required
            />

            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
            />

            <button type="submit">+ Add Task</button>
        </form>

        {error && <p className="task-error">{error}</p>}

        {loading ? (
            <p>Loading tasks...</p>
        ) : (
            <div className="kanban-grid">
                {columns.map((column) => {
                    const columnTasks = tasks.filter(
                        (task) => task.status === column.key
                    );

                    return (
                        <section className="kanban-column" key={column.key}>
                            <div className="kanban-heading">
                                <h3>{column.label}</h3>
                                <span>{columnTasks.length}</span>
                            </div>

                            {columnTasks.length === 0 ? (
                                <p className="column-empty">No tasks yet</p>
                            ) : (
                                columnTasks.map((task) => (
                                    <Taskcard
                                        key={task._id}
                                        task={task}
                                        onTaskUpdated={fetchTasks}
                                        onTaskDeleted={fetchTasks}
                                    />
                                ))
                            )}
                        </section>
                    );
                })}
            </div>
        )}
    </div>
);


}

export default Taskboard;
