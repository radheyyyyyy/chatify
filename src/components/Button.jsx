export const Button = ({ onClick, text }) => {
    return (
        <div>
            <button
                className="px-6 py-2 hover:bg-blue-300 text-white rounded-lg bg-blue-500 "
                onClick={onClick}>
                {text}
            </button>
        </div>
    );
};
