"use client"


import { useState } from 'react';
import Workspace from './workspace';


export default function Qcart() {
    const [open, setopen] = useState(false)

    return (
        <div className='border rounded-1 p-3 shadow-md bg-white'>
            <h2 className='text-xl font-bold mb-3'>
                Q1. Solve: 25 * 12 =?
            </h2>
            <button onClick={() => setopen(!open)}
                className='bg-black text-white px-4 py-2 rounded-lg'>
                {open ? "Close" : "Solve"}
            </button>

             <div
        className={`
            overflow-hidden
            transition-all
            duration-500
            ease-in-out
            ${open ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"}
        `}
    >
        <Workspace />
    </div>
        
       
            
        </div>
    )
}