import React, { useState } from 'react'

const UpdateHabit = ({ setShowUpdateHabit, currentToken, habitID }) => {
    const [title, setTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/habit/updatehabit/${habitID}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${currentToken}`, "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });
        const resp = await response.json();
        window.location.reload(false);
    }

    const handleInputs = (e) => {
        setTitle(e.target.value);
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 backdrop-blur-sm">
            <div className='opacity-100 flex items-center justify-center w-auto p-5 border-2 border-black bg-gray-200 rounded-md absolute top-0 bottom-0 right-0 left-0 w-[500px] h-[200px] m-auto'>
                <div className="cross flex flex-row ustify-between">
                    <span></span>
                    <span className="cursor-pointer absolute top-1 right-1" onClick={() => setShowUpdateHabit(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>

                    </span>
                </div>
                <div className="caution flex flex-col">
                    <span>Note: This will remove all information of your current habit including marked dates</span>
                    <form className='flex flex-col m-2 max-w-3xl' onSubmit={handleSubmit}>
                        <input onChange={handleInputs} className="border-black border-2 m-2" type="text" placeholder='Enter new habit' />
                        <input className='border-black border-2 m-2' type="text" placeholder='Please type "CONFIRM" to edit habit' pattern='CONFIRM' title='Please enter "CONFIRM"' required />
                        <button type="submit" className='bg-gray-800 text-white rounded-md w-full sm:w-auto'>Update Habit</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UpdateHabit