import { useState, useCallback } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charactersAllowed, setCharAllowed] = useState(false); // Fixed typo here
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numberAllowed) str += '0123456789';
    if (charactersAllowed) str += "!@#$%^&*()_+[]{}|;:',.<>?/`~";

    for (let i =1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char); // Append characters to password
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed]);

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert('Password copied to clipboard!');
  };

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text" 
            value={password} 
            className='outline-none w-full py-1 px-3' 
            placeholder='Generated Password' 
            readOnly 
          />
        </div>
        <button 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' 
          onClick={passwordGenerator} // Added the onClick event to generate password
        >
          Generate Password
        </button>
        <button 
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ml-2' 
          onClick={copyToClipboard} // Added onClick event to copy the password
        >
          Copy
        </button>
        <div className='flex text-sm gap-x-2 mt-4'>
          <div className='flex items-center gap-x-1'>
            <label>Length: {length}</label>
            <input 
              type="range" 
              min={6} 
              max={100} 
              value={length} 
              onChange={(e) => setLength(Number(e.target.value))} // Handle slider change
              className='cursor-pointer' 
            />
    
          </div>
          <div className='flex items-center gap-x-1'>
          <label>Length: {length}</label>
            <input 
              type="checkbox" 
               defaultChecked={numberAllowed}
               id="numberInput"
              onChange={() =>{ setNumber((prev)=>!prev)}} // Handle slider change
              className='cursor-pointer' 
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
               defaultChecked={charactersAllowed}
               id="characterInput"
              onChange={() =>{ setCharAllowed((prev)=>!prev)}} // Handle slider change
              className='cursor-pointer' 
            />
            <label htmlFor='characterInput'>characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
