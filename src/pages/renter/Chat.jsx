import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, User, MessageSquare } from "lucide-react";

export default function Chat() {
  // Dummy chat contacts
  const contacts = [
    { id: 1, name: "Ali Khan", lastMsg: "Thanks for renting!" },
    { id: 2, name: "Sara Malik", lastMsg: "Payment received ✅" },
    { id: 3, name: "Zain Ahmed", lastMsg: "Car ready for pickup" },
  ];

  const [activeChat, setActiveChat] = useState(contacts[0]);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I’m interested in renting your car.", sender: "user" },
    { id: 2, text: "Sure! When do you need it?", sender: "owner" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsg = { id: Date.now(), text: newMessage, sender: "user" };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-[#eefaf7] to-[#f9f5f3] flex p-4 md:p-10">
      {/* Sidebar — Contact List */}
      <div className="w-1/4 bg-white shadow-sm rounded-xl border border-gray-100 p-4 flex flex-col">
        <h2 className="text-lg font-bold text-[#299F93] mb-4 flex items-center gap-2">
          <MessageSquare size={18} /> Chats
        </h2>

        <div className="flex flex-col gap-2 overflow-y-auto">
          {contacts.map((c) => (
            <motion.div
              key={c.id}
              onClick={() => setActiveChat(c)}
              whileHover={{ scale: 1.02 }}
              className={`p-3 rounded-lg cursor-pointer transition ${
                activeChat.id === c.id
                  ? "bg-[#E8F5F3] text-[#299F93]"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="font-semibold">{c.name}</div>
              <p className="text-xs text-gray-500 truncate">{c.lastMsg}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 bg-white shadow-sm rounded-xl border border-gray-100 ml-4 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center gap-3">
          <User size={24} className="text-[#299F93]" />
          <h3 className="font-semibold text-gray-800">{activeChat.name}</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[70%] p-3 rounded-lg text-sm ${
                msg.sender === "user"
                  ? "bg-[#299F93] text-white ml-auto"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 border-t flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded-md px-4 py-2 outline-none text-gray-700"
          />
          <button
            onClick={handleSend}
            className="bg-[#299F93] hover:bg-[#227c70] text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
          >
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </section>
  );
}
