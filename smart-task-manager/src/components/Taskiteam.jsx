// src/components/TaskForm.jsx
const TaskForm = ({ onAddTask, editingTask, onCancelEdit }) => {
    // State management for form inputs 
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});
    
    // useEffect to populate form when editing 
    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || "");
            setPriority(editingTask.priority);
            setCategory(editingTask.category || "");
        } else {
            setTitle("");
            setDescription("");
            setPriority("medium");
            setCategory("");
        }
    }, [editingTask]);
    
    // Validation function 
    const validateForm = () => {
        const newErrors = {};
        if (!title.trim()) {
            newErrors.title = "Task title cannot be empty";
        }
        if (title.length > 80) {
            newErrors.title = "Title must be less than 80 characters";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;  // Stop if validation fails
        
        onAddTask({
            title: title.trim(),
            description: description.trim(),
            priority,
            category: category.trim(),
        });
        
        // Reset form after submission
        if (!editingTask) {
            setTitle("");
            setDescription("");
            setPriority("medium");
            setCategory("");
        }
    };
    
    return (
        <Card>
            <h3>{editingTask ? "Edit Task" : "Create New Task"}</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task Title *</label>
                    <input 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={errors.title ? 'border-pink-500' : ''}
                    />
                    {errors.title && <p className="text-red-500">{errors.title}</p>}
                </div>
                <div>
                    <label>Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <Button type="submit">{editingTask ? "Update" : "Add Task"}</Button>
            </form>
        </Card>
    );
};