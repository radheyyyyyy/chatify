export const Input = ({ type, placeholder, reference }) => {
    return (
        <div className="w-[100%]">
            <input
                type={type}
                placeholder={placeholder}
                className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                ref={reference}
            />
        </div>
    );
};
