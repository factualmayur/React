import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(1);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordRef = useRef(null);

  // Generates a password based on the allowed characters and length
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      string += "123456789";
    }

    if (charAllowed) {
      string += "~!@#$%^&*()";
    }

    for (let i = 0; i <length; i++) {
      const charIndex = Math.floor(Math.random() * string.length);
      pass += string.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Copies the generated password to the clipboard
  const CopyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  // Regenerate password whenever length, numberAllowed, or charAllowed changes
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
   <div className="container text-xl text-white">
      <h1 className="text-4xl font-semibold text-green-400">Password Generator</h1>

      <div className="flex mt-5">
        <input
          type="text"
          value={Password}
          readOnly
          placeholder="Password"
          className="w-full p-3 text-white bg-black h-90px rounded-s-3xl"
          ref={passwordRef}
        />
        
        <button
          className="pl-4 pr-4 font-bold bg-blue-500 rounded-e-3xl hover:bg-green-400"
          onClick={CopyPassToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="flex justify-center gap-10 p-5">
        <input
          type="range"
          min={1}
          max={20}
          value={length}
          className="cursor-pointer"
          onChange={(e) => setLength(e.target.value)}
        />
        <label> Length : {length}</label>
      </div>

      <div className="flex justify-center gap-3">
        <input
          type="checkbox"
          checked={numberAllowed}
          id="numberInput"
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label>Numbers</label>

        <input
          type="checkbox"
          checked={charAllowed}
          id="charInput"
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label>Characters</label>
      </div>
      </div>
    </>
  );
}

export default App;
