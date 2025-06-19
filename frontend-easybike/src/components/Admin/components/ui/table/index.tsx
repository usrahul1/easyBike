import type { ReactNode, FC } from "react";

// Common Props Interface
interface TableComponentProps {
	children: ReactNode;
	className?: string;
}

// Table Component
const Table: FC<TableComponentProps> = ({ children, className = "" }) => {
	return <table className={`min-w-full ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: FC<TableComponentProps> = ({ children, className = "" }) => {
	return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody: FC<TableComponentProps> = ({ children, className = "" }) => {
	return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: FC<TableComponentProps> = ({ children, className = "" }) => {
	return <tr className={className}>{children}</tr>;
};

// TableCell Props Interface
interface TableCellProps extends TableComponentProps {
	isHeader?: boolean;
}

// TableCell Component
const TableCell: FC<TableCellProps> = ({
	children,
	isHeader = false,
	className = "",
}) => {
	const CellTag = isHeader ? "th" : "td";
	return <CellTag className={className}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
