import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateHabit = ({ userID, currentToken, setHabitID, myStorage }) => {
  const [habitTitle, setHabitTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(habitTitle)
    const response = await fetch(`http://localhost:5000/habit/createhabit/${userID}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${currentToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({ title: habitTitle }),
    })
    const resp = await response.json();

    console.log(resp)

    if(resp.habit._id) {
      setHabitID(resp.habit._id);
      myStorage.setItem("habitID", resp.habit._id);
      navigate("/");
    }
    else {
      window.alert("Error while creating habit. Please try again later");
    }
  }

  const handleInputs = (e) => {
    setHabitTitle(e.target.value);
  }

  return (
    <div className='flex items-center justify-center p-5'>
      <div className="flex flex-col bg-gray-200 border-2 border-black rounded-md p-10">
        <h2 className='text-2xl font-bold'>Create Habit</h2>
        <form className='flex flex-col mt-5' onSubmit={handleSubmit}>
          <label className='pb-1' htmlFor='habitTitle'>Habit Title</label>
          <input 
            className='border-2 border-black rounded-md bg-white p-3' 
            value={habitTitle} 
            name='habitTitle' 
            type="text" 
            placeholder='Enter the habit name' 
            onChange={handleInputs}
          />
          <button 
            className='flex justify-center border-2 border-black rounded-md bg-white p-3 mt-5 text-purple-500 cursor-pointer' 
            type='submit'
          >
            Create Habit
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateHabit