
type FieldDisplayProps = {
    label: string;
    value?: string | null;
    highlight?: boolean; // เผื่อใช้ realtime highlight
};

export default function FieldDisplay({
    label,
    value,
    highlight = false,
}: FieldDisplayProps) {
    return (
        <div className="space-y-1">
            <p className="text-xs text-gray-500">{label}</p>

            <div
                className={`
          text-[16px] text-gray-900 rounded-md px-3 py-2 min-h-[36px]
          ${highlight ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}
        `}
            >
                {value && value.trim() !== "" ? value : "-"}
            </div>
        </div>
    );
}
