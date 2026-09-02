export function Card({ children, className }) {
    return <div className={`rounded-lg shadow-md p-4 bg-gray-800 ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  