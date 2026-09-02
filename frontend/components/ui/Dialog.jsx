import { Fragment } from "react";
import { Dialog as HeadlessDialog, DialogPanel } from "@headlessui/react";

export function Dialog({ open = false, onOpenChange = () => {}, children }) {
  // Ensure open is a boolean and onOpenChange is a function
  const isOpen = Boolean(open);
  const handleClose = () => {
    if (typeof onOpenChange === "function") {
      onOpenChange(false);
    }
  };

  return (
    <HeadlessDialog
      as="div"
      className="relative z-50"
      open={isOpen} // Ensures it's a boolean
      onClose={handleClose} // Ensures function execution
    >
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md" />

      {/* Modal container (Use external animations here) */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className="bg-white rounded-2xl shadow-2xl max-w-sm w-full opacity-100 scale-100 transition-all duration-300"
        >
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}

// ✅ Fully customizable DialogContent
export function DialogContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
