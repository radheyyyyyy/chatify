export const Input = ({ type, placeholder,reference }) => {
    return (
        <div>
            <input type={type} placeholder={placeholder} className="p-1 mb-4 border-gray-200 border-2 rounded-md" ref={reference}/>
        </div>
    );
};
