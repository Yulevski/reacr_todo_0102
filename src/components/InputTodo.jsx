import React from "react";

//propsを通して要素をもらう Appから
export const InputTodo = (props) => {
  const { todoText, onChange, onClick } = props;
  return (
    <div className="input-area">
      <input placeholder="input TODO" value={todoText} onChange={onChange} />
      <button onClick={onClick}>ADD</button>
    </div>
  );
};
