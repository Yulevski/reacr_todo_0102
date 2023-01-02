import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";

//3つの機能のエリアがあるので3つのdiv要素から始める。
//状態が変化するものはStateで定義
export const App = () => {
  const [todoText, setTodoText] = useState(""); //入力値もstate化
  const [incompleteTodos, setIncompleteTodos] = useState(["AAAA", "BBBB"]);
  const [completeTodos, setCompleteTodos] = useState(["CCCC"]);
  //onchangeでtodoの状態が変わるとvalueも変わるように設定
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  //buttonに機能割り当て
  const onClickAdd = () => {
    if (todoText === "") return; //空の時は何もしない
    //incompletetodosの次に値追加　state状態変更
    const newTodos = [...incompleteTodos, todoText];
    //更新する関数へnewtodosを入れる　addされた情報を追加
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  //indexを引数にとる関数
  const onClickDelete = (index) => {
    //Incompletetodos配列を取得
    const newTodos = [...incompleteTodos];
    //newtodosのindex番目を1つ削除
    newTodos.splice(index, 1);
    //setIncompeteTodosをnewtodosで更新
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    //Incompletetodos配列を取得
    const newIncompleteTodos = [...incompleteTodos];
    //newtodosのindex番目を1つ削除
    newIncompleteTodos.splice(index, 1);
    //newincompletetodosの配列を新しく生成
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //state更新の為
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const onClickBack = (index) => {
    //現在のcompletetodos配列を取得
    const newcompleteTodos = [...completeTodos];
    //newtodosのindex番目を1つ削除
    newcompleteTodos.splice(index, 1);
    //newincompletetodosの配列を新しく生成
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    //state更新の為 新しい配列を引数として渡す
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newcompleteTodos);
  };

  return (
    <>
      {/* コンポーネント使用  */}
      {/* propsとして渡す用意 */}
      <InputTodo
        todoText={todoText} //state
        onChange={onChangeTodoText} //function
        onClick={onClickAdd} //function
      />
      <div className="incomplete-area">
        <p className="title">Incomplete-todo</p>
        <ul>
          {/* incompleteTodosで状態が変化するごとにrendering */}
          {incompleteTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickComplete(index)}>Complete</button>
                <button onClick={() => onClickDelete(index)}>Delete</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">Complete-todo</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>Return</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
