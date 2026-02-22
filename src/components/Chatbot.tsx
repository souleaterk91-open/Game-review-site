"use client";

import { useState } from "react";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chatbot-window fade-in glass-panel">
                    <div className="chatbot-header">
                        <h4>Vault AI</h4>
                        <button
                            className="chatbot-close"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Chat"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="chatbot-messages">
                        <div className="chat-message ai">
                            Hello. Welcome to the Vault. How can I assist you with your gaming journey today?
                        </div>
                        <div className="chat-message user">
                            Can you summarize the story of Elden Ring?
                        </div>
                        <div className="chat-message ai">
                            Elden Ring takes place in the Lands Between, a realm ruled by demigods...
                        </div>
                        <div className="chat-message ai" style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', maxWidth: '120px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', fontSize: '11px', letterSpacing: '0.05em' }}>ANALYZING</span>
                            <span className="typing-cursor"></span>
                        </div>
                    </div>
                    <div className="chatbot-input">
                        <input type="text" placeholder="Accessing Vault intelligence..." disabled />
                    </div>
                </div>
            )}

            <button
                className={`chatbot-fab ${isOpen ? "active" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Chat"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
                    <path d="m21 2-9.6 9.6" />
                    <circle cx="7.5" cy="15.5" r="5.5" />
                </svg>
            </button>
        </div>
    );
}
