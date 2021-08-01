import React, { useState, useEffect } from 'react';
import './Form.css';


const Form = ({player, playerSet}) => {
  // const [name, setName] = useState('')

  // const submit = () => {
  //   if (name) {
  //     playerSet(name)
  //   }
  // }
  //
  // useEffect(() => {
  //   playerSet(name)
  // }, [name])

  return (

      <input
        type="text"
        name="PlayerName"
        onChange={(event) => playerSet(event.target.value)}
        value={player}
        placeholder="Enter Player Name"
      />
    // <button onClick={submit} />Submit Name</button>

  )
}

export default Form;
