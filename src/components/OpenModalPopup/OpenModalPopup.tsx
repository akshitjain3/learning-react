import { JSX } from "react";
import "./open-modal.css";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";

interface OpenModalPopupProps {
  header?: JSX.Element | string;
  body: JSX.Element | string;
  footer?: JSX.Element | string;
  onClose: () => void;
}

export default function OpenModalPopup({
  header,
  body,
  footer,
  onClose,
}: OpenModalPopupProps) {
  return (
    <motion.div
      className="openmodalWrapper"
      onClick={onClose}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <div className="openmodalContent" onClick={(e) => e.stopPropagation()}>
        <IoMdClose className="openmodalClose" onClick={onClose} />
        {header && <div className="openmodalHeader">{header}</div>}
        <div className="openmodalBody">{body}</div>
        {footer && <div className="openmodalFooter">{footer}</div>}
      </div>
    </motion.div>
  );
}
