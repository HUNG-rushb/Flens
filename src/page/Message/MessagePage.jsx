import React, { useState, useEffect, useRef } from "react";
import "./Message.css";

function AutoResizableTextarea() {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    autoResizeTextarea();
  }, [text]);

  const handleInput = (event) => {
    setText(event.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setText((prevText) => prevText + "\n");
      e.preventDefault();
      console.log('s')
    }
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  return (
    <textarea
      ref={textareaRef}
      className="auto-resizable-textarea"
      placeholder="Type something and press Enter..."
      value={text}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
    />
  );
}

export default AutoResizableTextarea;
