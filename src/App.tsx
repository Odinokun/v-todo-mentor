import { useState } from "react";
import { TaskType, Todolist } from "./Todolist";
import "./App.css";

export type FilterType = "all" | "active" | "completed";

function App() {
  const title: string = "What to learn?";
  const [state, setState] = useState<TaskType[]>([
    { id: crypto.randomUUID(), title: "HTML&CSS", isDone: true },
    { id: crypto.randomUUID(), title: "JS", isDone: true },
    { id: crypto.randomUUID(), title: "React", isDone: false },
    { id: crypto.randomUUID(), title: "GraphQL", isDone: false },
    { id: crypto.randomUUID(), title: "Rest API", isDone: false },
    { id: crypto.randomUUID(), title: "Graph API", isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterType>("all");

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: crypto.randomUUID(),
      title,
      isDone: false,
    };
    setState([newTask, ...state]);
  };

  const removeTask = (id: string) => setState(state.filter((t) => t.id !== id));

  const tasksFilter = (state: TaskType[], filter: FilterType): TaskType[] => {
    switch (filter) {
      case "active":
        return state.filter((t) => !t.isDone);
      case "completed":
        return state.filter((t) => t.isDone);
      default:
        return state;
    }
  };
  const filteredTasks = tasksFilter(state, filter);

  return (
    <div className="App">
      <Todolist
        title={title}
        tasks={filteredTasks}
        addTask={addTask}
        removeTask={removeTask}
        setFilter={setFilter}
      />
    </div>
  );
}

export default App;
