"use client"
import React, {useState} from 'react'
import {io} from "socket.io-client";

const socket = io("http://localhost:9000");

const Home = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    React.useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages([...messages, data])
        });
    }, [messages]);

    const SendMessage = () => {
        socket.emit("send_message", {
            message: message,
            id: socket.id,
        });
        setMessage('');
    }

    console.log(messages)

    return <section className="flex flex-col items-center justify-center w-screen min-h-screen">
        <div className="flex flex-col flex-grow w-full overflow-hidden">
            <div className="flex flex-col gap-4 flex-grow h-0 p-4 overflow-auto">
                {
                    messages?.map((item, index) => {
                        return item.id !== socket.id ? <div className="flex flex-col gap-1 w-fit" key={index}>
                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg text-sm">
                                {item.message}
                            </div>
                            <span className="text-xs text-gray-500 leading-none">
                                {item.id}
                            </span>
                        </div> : <div className="flex w-full justify-end" key={index}>
                            <div className='flex flex-col gap-1'>
                                <p className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg text-sm">
                                    {item.message}
                                </p>
                                <span className="text-xs text-gray-500 leading-none">
                                    {item.id}
                                </span>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="bg-gray-300 p-2 flex gap-4">
                <input className="flex items-center focus:outline-none h-10 w-full rounded px-3 text-sm" type="text"
                       placeholder="Type your message…" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <button className='px-4 py-2 bg-blue-600 rounded-sm text-white' onClick={() => SendMessage()}>Send
                </button>
            </div>
        </div>
    </section>
}

export default Home