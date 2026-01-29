type ModalBodyProps = {
  children: React.ReactNode;
  className?: string;
};

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return <div className={`p-6 overflow-y-auto ${className}`}>{children}</div>;
}
