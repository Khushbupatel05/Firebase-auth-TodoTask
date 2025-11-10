import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo,  deleteTodo,  fetchTodo,  updateTodo,} from "../newfeature/todos/todoSlice.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { Plus, Trash2, Edit3, CheckCircle2 } from "lucide-react";

const Todos = () => {
  const [input, setInput] = useState({ task: "", priority: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("all");

  const dispatch = useDispatch();
  const user = useSelector((store) => store.todos.currentUser);
  const todos = useSelector((store) => store.todos.list);

  useEffect(() => {
    if (user?.id) dispatch(fetchTodo(user.id));
  }, [user]);

  useEffect(() => {
    if (updateId) {
      const getTodo = async () => {
        const todo = await getDoc(doc(db, `${user.id}`, updateId));
        setInput(todo.data());
        setIsEdit(true);
        setShowForm(true);
      };
      getTodo();
    }
  }, [updateId]);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.task.trim() || !input.priority) {
      toast.error("Enter all details correctly!");
      return;
    }

    const isDuplicate = todos.some(
      (todo) => todo.task.toLowerCase() === input.task.trim().toLowerCase()
    );

    if (isDuplicate && !isEdit) {
      toast.error("This task already exists!");
      setInput({ task: "", priority: "" });
      return;
    }

    try {
      if (!isEdit) {
        dispatch(addTodo({ uid: user.id, data: input }));
        toast.success("Task added successfully!");
      } else {
        dispatch(updateTodo({ uid: user.id, updateId, data: input }));
        toast.success("Task updated successfully!");
      }

      dispatch(fetchTodo(user.id));
      setInput({ task: "", priority: "" });
      setIsEdit(false);
      setUpdateId(null);
      setShowForm(false);
    } catch (error) {
      toast.error("Error while adding task: " + error.message);
    }
  };

  const handleStatusChange = (task) => {
    if (task.status !== "completed") {
      dispatch(
        updateTodo({
          uid: user.id,
          updateId: task.id,
          data: { ...task, status: "completed" },
        })
      );
      toast.success("Task marked as completed!");
    } else {
      toast.info("Task already completed!");
    }

    setTimeout(() => {
      dispatch(fetchTodo(user.id));
    }, 500);
  };

  const filteredTodos = todos.filter((task) => filter === "all"  ? true  : filter === "pending"
      ? task.status !== "completed"
      : task.status === "completed"
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-200  flex flex-col items-center py-12 px-6">
     
      <h1 className="text-4xl md:text-5xl font-extrabold text-[#04265d] mb-10 text-center">
         My Daily Tasks
      </h1>

      
      <div className="flex gap-4 mb-8 bg-white/70 backdrop-blur-md px-6 py-3 rounded-full shadow-md">
        {["all", "pending", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-5 py-2 rounded-full text-sm md:text-base font-semibold transition-all ${
              filter === tab
                ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

     
      <button onClick={() => { setShowForm(true);  setIsEdit(false); setInput({ task: "", priority: "" }); }}
        className="mb-10 px-8 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300 flex items-center gap-2">
        <Plus size={20} /> Add Task
      </button>

  
      <div className="w-full max-w-4xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTodos.length === 0 ? (
          <p className="text-gray-500 text-center col-span-3 py-10 bg-white/70 rounded-2xl shadow-inner">
             No tasks yet — start organizing your thoughts!
          </p>
        ) : (
          filteredTodos.map((task) => (
            <div  key={task.id}  className={`p-6 rounded-3xl shadow-md bg-white hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                task.status === "completed" ? "opacity-75" : ""  }`}
            >
              <div>
                <h3
                  className={`text-lg font-semibold ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : "text-gray-800"
                  }`}
                >
                  {task.task}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    task.priority === "high"
                      ? "text-red-500"
                      : task.priority === "medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {task.priority} priority
                </p>
              </div>

              <div className="flex justify-between items-center mt-5">
                <button
                  onClick={() => handleStatusChange(task)}
                  disabled={task.status === "completed"}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                  }`}
                >
                  {task.status === "completed" ? "Done" : "Mark Done"}
                </button>

                <div className="flex gap-3">
                  {task.status !== "completed" && (
                    <button
                      onClick={() => setUpdateId(task.id)}
                      title="Edit Task"
                      className="text-blue-600 hover:scale-110 transition-transform"
                    >
                      <Edit3 size={18} />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      dispatch(
                        deleteTodo({ uid: user.id, deleteId: task.id })
                      );
                      dispatch(fetchTodo(user.id));
                    }}
                    title="Delete Task"
                    className="text-red-600 hover:scale-110 transition-transform"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-100"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isEdit ? "Edit Task" : "Add New Task"}
            </h3>
            <input
              type="text"
              id="task"
              onChange={handleChange}
              value={input.task}
              placeholder="Enter your task..."
              className="w-full mb-4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select
              id="priority"
              onChange={handleChange}
              value={input.priority}
              className="w-full mb-6 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Priority</option>
              <option value="high">🔥 High</option>
              <option value="medium">⚡ Medium</option>
              <option value="low">🌿 Low</option>
            </select>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all"
              >
                {isEdit ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Todos;
