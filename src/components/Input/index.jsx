import React, { useState } from "react";

const Input = (props) => {
    const { placeholder, onEnter } = props;
    const [text, setText] = useState("");

    const onKeyUp = (e) => {
        if (e.keyCode === 13) {
            onEnter(text);
            setText("");
        }
    }

    return (
        <input
            value={text}
            onInput={(e) => setText(e.target.value)}
            onKeyUp={onKeyUp} placeholder={placeholder}
        />
    );
}

export default Input;