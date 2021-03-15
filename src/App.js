import React, { useEffect, useReducer, useRef } from "react";
import "./styles.css";

const DynamicInline = ({ text, update }) => {
  const txtinp = useRef(text);
  useEffect(() => txtinp.current.focus(), []);
  return (
    <form onSubmit={(e) => e.preventDefault() || update(txtinp.current.value)}>
      <input type="text" defaultValue={text} ref={txtinp} />
    </form>
  );
};

const EditableSpan = ({ tag, text, set }) => {
  const [editting, toggleEdit] = useReducer(
    (state, override) => override ?? !state
  );
  const hUpdate = (v) => {
    toggleEdit(false);
    set([tag, v]);
  };

  if (editting) {
    return <DynamicInline text={text} update={hUpdate} />;
  } else {
    return React.createElement(tag, { onClick: toggleEdit }, text);
  }
};

export default function App() {
  const [texts, setTexts] = useReducer(
    (state, [k, v]) => {
      console.log("setTexts", k, v);

      return { ...state, ...{ [k]: v } };
    },
    {
      0: ["h1", "Hello CodeSandbox"],
      1: ["h2", "Start editing to see some magic happen!"],
      2: ["p", "Lorum Ipsum"]
    }
  );

  return (
    <div className="App">
      {Object.entries(texts).map(([k, v]) => (
        <EditableSpan
          key={k}
          tag={v[0]}
          text={v[1]}
          set={(nv) => setTexts([k, nv])}
        />
      ))}
    </div>
  );
}
