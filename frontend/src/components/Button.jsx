export const Button = ({ onClick, text,variant }) => {
    return (
        <div>
            <button
                className={`${variant === "large" ? 'w-full':""} bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium`}
                onClick={onClick}>
                {text}
            </button>
        </div>
    );
};
