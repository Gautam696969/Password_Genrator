import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState( 8 )
  const [numberAllow, setnumberAllowed] = useState( false )
  const [charAllowed, setCharAllowed] = useState( false )
  const [Password, setPassword] = useState( "" )

  //usereF

  const passwordRef = useRef( null );

  const passwordGenrator = useCallback( () => {

    let pass = ''
    let str = "ABCDefghIjKLMnopQrstUvWxyz"
    if ( numberAllow ) str += "0123456789"
    if ( charAllowed ) str += "!@#$%^&*()[]{}`"
    for ( let i = 1; i <= length; i++ ) {
      let char = Math.floor( Math.random() * str.length )
      pass += str.charAt( char )
    }

    setPassword( pass )

  }, [length, numberAllow, charAllowed, setPassword,] )
  const copypasswordtoClip = useCallback(() => {
  if (passwordRef.current) {
    passwordRef.current.select(); // Selects the input text
    passwordRef.current.setSelectionRange(0, length ); // Ensures full text is selected
    window.navigator.clipboard.writeText(Password); // Copies to clipboard
  }
}, [Password]);

  useEffect( () => {
    passwordGenrator()
  }, [length, numberAllow, charAllowed] )
  return (
    <>
      <div className="w-full max-w-md mx-auto my-8 px-4">
        <div className="shadow-md rounded-lg bg-gray-700 p-4 text-orange-500">
          <h3 className='text-white text-center'>Password generator</h3>
          <div className="flex items-center mb-4 shadow rounded-lg overflow-hidden">
            <input
              type="text"
              value={Password}
              readOnly
              className="w-[500px] py-2 px-4 outline-none bg-gray-800 text-white placeholder-orange-300 rounded-md"
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              onClick={copypasswordtoClip}
              className='outline-none bg-blue-700 text-white px-3  shrink-0 text-4xl '>
              copy
            </button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
                min={6}
                max={100}
                value={length}
                className='cursor-pointer'
                onChange={( e ) => { setlength( e.target.value ) }}
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                defaultChecked={numberAllow}
                id="numberInput"
                onChange={() => {
                  setnumberAllowed( ( prev ) => !prev );
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
                defaultChecked={charAllowed}
                id='charInput'
                onChange={() => {
                  setCharAllowed( ( prev ) => !prev )
                }}
              />
              <label htmlFor="numberinput">Charactors</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
