import React from "react";
import './App.scss';
import Input from "../components/Input";
import useMessaging from "../hooks/useMessaging";
import { generateName } from "../util/name-util";

const name = generateName();

function App() {
  const [messages, addMessage] = useMessaging(name);

  if(!messages) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {
        messages.map(message => <div>{`${message.from}: ${message.contents}`}</div>)
      }
      <Input placeholder={"Message"} onEnter={addMessage}/>
    </div>
  );
}

export default App;