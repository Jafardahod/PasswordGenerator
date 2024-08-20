import { useCallback, useState } from "react";

function App() {
  let [lenght, setlenght] = useState(8);
  let [include_num, setinclude_nums] = useState(false);
  let [include_char, setinclude_char] = useState(false);
  let [password, setpassword] = useState("");

  let alphabetArray = [];

  for (let i = 0; i < 26; i++) {
    let upperCaseLetter = String.fromCharCode(65 + i); // A is 65 in ASCII
    let lowerCaseLetter = String.fromCharCode(97 + i); // a is 97 in ASCII

    alphabetArray.push(upperCaseLetter, lowerCaseLetter);
  }

  let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let uni_char = ["?", "#", "$", "@"];



  //Using use Callback for memoization of passgenerator function
  // let passwordrender = useCallback(
  //   () => passgenerator(lenght, include_num, include_char),
  //   [lenght, include_char, include_num, setpassword]
  // );


  //password generator function which take the pass length, include num boolean and include char boolean
  function passgenerator(passlength, includenum, includechar) {
    //if both are true
    if (includenum && includechar) {
      //combine all the 3 arrays with spread operator
      let newarr = [...nums, ...alphabetArray, ...uni_char];
      let pass = "";

      //looping till the length
      for (let i = 0; i < passlength; i++) {
        //randomly select a character from the array and add to the pass
        let random = Math.floor(Math.random() * newarr.length);
        pass = pass + newarr[random];
      }
      setpassword(pass);
      console.log(pass.length)
    } else if (includenum && !includechar) {//if includechar is false
      let newarr = [...nums, ...alphabetArray];
      let pass = "";

      for (let i = 0; i < passlength; i++) {
        let random = Math.floor(Math.random() * newarr.length);
        pass = pass + newarr[random];
      }
      setpassword(pass);
      console.log(pass.length)
    } else if (!includenum && includechar) {//if includenum is false
      let newarr = [...alphabetArray, ...uni_char];
      let pass = "";

      for (let i = 0; i < passlength; i++) {
        let random = Math.floor(Math.random() * newarr.length);
        pass = pass + newarr[random];
      }
      setpassword(pass);
      console.log(pass.length)
    } else {//if both are false
      let pass = "";

      for (let i = 0; i < passlength; i++) {
        let random = Math.floor(Math.random() * alphabetArray.length);
        pass = pass + alphabetArray[random];
      }
      setpassword(pass);
      console.log(pass.length)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-3 py-1 my-8 bg-gray-500">
      <h1 className="text-white text-center mt-3 mb-3 ">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-10 mx-3 mt-5">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-4 px-5 "
          placeholder="password"
          readOnly
        />
        <button className="bg-red-500 px-5">Copy</button>
      </div>
      <div className="flex text-sm gap-x-2 justify-center">
        <div className="flex text-center gap-x-1">
          <input
            type="range"
            min={6}
            max={12}
            value={lenght || 'XXXXXXX'}
            onChange={(e) => setlenght(e.target.value)}
            className="cursor-pointer"
          />
          <label>Length: {lenght}</label>
          <input
            type="checkbox"
            defaultChecked={include_num}
            onChange={() => setinclude_nums((e) => !e)}
          />
          <label>Number</label>
          <input
            type="checkbox"
            defaultChecked={include_char}
            onChange={() => setinclude_char((e) => !e)}
          />
          <label>Characters</label>
        </div>
        <button onClick={() => passgenerator(lenght, include_num, include_char)}>Click Me</button>
      </div>
    </div>
  );
}

export default App;
