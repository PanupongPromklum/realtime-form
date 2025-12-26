type SectionTitleProps = {
    title: string;
    className?: string;
};

export default function SectionTitle({ title, className }: SectionTitleProps) {
    return (
        <div className={`flex items-center gap-3 ${className ?? ""}`}>
            <p className="text-gray-500 text-sm whitespace-nowrap">
                {title}
            </p>
            <div className="h-px bg-gray-200 w-full" />
        </div>
    );
}
