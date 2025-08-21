import  { useState } from "react";
import InputField from "./components/inputfield";

function App() {
  const [value, setValue] = useState("");

  return (
    <div style={{ padding: "2rem" }}>
      <h1>InputField Demo</h1>

      <InputField
        label="Username"
        placeholder="Enter your username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="This will be your login ID"
        errormessage={value.length < 3 ? "At least 3 characters required" : ""}
        invalid={value.length < 3}
        variant="outlined"
        size="md"
      />

      <br />

      <InputField
        label="Password"
        placeholder="Enter your password"
        variant="filled"
        size="lg"
        errormessage="Password required"
        invalid={true}
      />
    </div>
  );
}

export default App;
