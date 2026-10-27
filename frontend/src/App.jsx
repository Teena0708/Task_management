import {useEffect,useState } from "react";

function App(){
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const API_URL = "http://localhost:5050/api/task";
    const limit = 10;

    const getTasks = async (page = currentPage) =>{
        try {
            const response = await fetch(
                `${API_URL}?page=${page}&limit=${limit}`
            );

            if (!response.ok){
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();

            setTasks(data.tasks);
            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setPrevPage(data.prevPage);
            setNextPage(data.nextPage);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        getTasks(1);
    }, []);

    const addTask = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            const response=await fetch(API_URL,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({title})
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            setTitle("");
            getTasks(currentPage);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    const deleteTask=async (id)=>{
        try {
            const response=await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error("Failed to delete task");
            }
            getTasks(currentPage);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div>
            <h1>Task Management App</h1>
            <form onSubmit={addTask}>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            {tasks.length===0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <span>{task.title}</span>
                            <button onClick={() => deleteTask(task._id)}> Delete </button>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <button onClick={() => getTasks(prevPage)} disabled={prevPage===null}> Previous </button>
                <span>
                    {" "}Page {currentPage} of {totalPages}{" "}
                </span>
                <button onClick={() => getTasks(nextPage)} disabled={nextPage === null}> Next </button>
            </div>
        </div>
    );
}

export default App;