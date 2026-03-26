// src/App.jsx
const App = () => {
    // State Management (Criterion 2)
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");      // all, active, completed
    const [searchTerm, setSearchTerm] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // ========== CRUD OPERATIONS (Criterion 11) ==========
    
    // CREATE operation
    const addTask = (taskData) => {
        const newTask = {
            id: Date.now(),                    // Unique ID using timestamp
            ...taskData,
            completed: false,
            createdAt: Date.now(),
        };
        setTasks(prev => [newTask, ...prev]);  // Add to beginning of array
    };
    
    // UPDATE operation (edit existing task)
    const updateTask = (taskData) => {
        setTasks(prev => prev.map(task => 
            task.id === editingTask.id 
                ? { ...task, ...taskData, updatedAt: Date.now() }
                : task
        ));
        setEditingTask(null);
    };
    
    // UPDATE operation (toggle completion)
    const toggleComplete = (taskId) => {
        setTasks(prev => prev.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };
    
    // DELETE operation
    const deleteTask = (taskId) => {
        setTasks(prev => prev.filter(task => task.id !== taskId));
    };
    
    // DELETE all completed tasks
    const clearCompleted = () => {
        setTasks(prev => prev.filter(task => !task.completed));
    };
    
    // ========== LOCALSTORAGE + USEEFFECT (Criterion 6 & 7) ==========
    
    // Load data from localStorage on component mount
    useEffect(() => {
        const storedTasks = localStorage.getItem("smartTasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
        setIsLoading(false);
    }, []);  // Empty dependency array = runs once on mount
    
    // Save data to localStorage whenever tasks change
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem("smartTasks", JSON.stringify(tasks));
        }
    }, [tasks, isLoading]);  // Runs when tasks or isLoading changes
    
    // ========== FILTERING & SEARCH 
    
    const filteredTasks = tasks.filter(task => {
        // Filter by status
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    }).filter(task => {
        // Filter by search term
        const searchLower = searchTerm.toLowerCase();
        return task.title.toLowerCase().includes(searchLower) || 
               (task.category && task.category.toLowerCase().includes(searchLower));
    });
    
    // Conditional rendering for empty state 
    const renderTaskList = () => {
        if (filteredTasks.length === 0) {
            return (
                <div className="text-center py-12">
                    <p>No tasks found. Create one above!</p>
                </div>
            );
        }
        
        return filteredTasks.map(task => (
            <TaskItem 
                key={task.id}           // Unique key 
                task={task}
                onToggle={toggleComplete}
                onDelete={deleteTask}
                onEdit={setEditingTask}
            />
        ));
    };
    
    // Loading state 
    if (isLoading) {
        return <div className="loader"></div>;
    }
    
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <h1 className="text-4xl font-bold">Smart Task Manager</h1>
            
            {/* Task Form - Props passing (Criterion 4) */}
            <TaskForm 
                onAddTask={editingTask ? updateTask : addTask}
                editingTask={editingTask}
                onCancelEdit={() => setEditingTask(null)}
            />
            
            {/* Filter Controls */}
            <div className="flex gap-2">
                <Button onClick={() => setFilter("all")}>All</Button>
                <Button onClick={() => setFilter("active")}>Active</Button>
                <Button onClick={() => setFilter("completed")}>Completed</Button>
                
                {/* Search Input - onChange handler */}
                <input 
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <Button onClick={clearCompleted}>Clear Completed</Button>
            </div>
            
            {/* Task List */}
            <Card>
                {renderTaskList()}
            </Card>
        </div>
    );
};