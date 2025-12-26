interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export default function Button({
    className = "",
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled}
            className={`
                px-4 py-2 rounded-lg font-medium transition
                bg-blue-600 text-white hover:bg-blue-700
                disabled:bg-gray-300 disabled:text-gray-500
                disabled:cursor-not-allowed disabled:hover:bg-gray-300
                ${className}
            `}
            {...props}
        />
    );
}
