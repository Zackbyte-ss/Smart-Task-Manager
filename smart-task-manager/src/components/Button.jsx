// src/components/Button.jsx
const Button = ({ onClick, children, variant = "primary", disabled = false }) => {
    // Different button styles based on variant prop
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        danger: "bg-red-500 hover:bg-red-600 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        outline: "border border-indigo-300 text-indigo-700 hover:bg-indigo-50"
    };
    
    return (
        <button 
            onClick={onClick} 
            disabled={disabled}
            className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {children}
        </button>
    );
};