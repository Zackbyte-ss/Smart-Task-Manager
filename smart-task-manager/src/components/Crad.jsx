// src/components/Card.jsx
const Card = ({ children, className = "" }) => {
    return (
        <div className={`bg-yellow-150 rounded-2xl shadow-lg p-5 border border-gray-100 ${className}`}>
            {children}
        </div>
    );
};