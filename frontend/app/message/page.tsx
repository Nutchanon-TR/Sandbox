'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, MoreVertical, Phone, Video } from 'lucide-react';
import axios from 'axios';
import Image from 'next/image';

const API_BASE_URL = 'http://localhost:8080/v1/api/chat';

interface Message {
    id?: number;
    roomId?: number;
    senderId?: number;
    content: string;
    createdAt?: string;
    role?: 'user' | 'assistant';
}

export default function MessagePage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Based on the SQL script provided (Alice)
    const ROOM_ID = 1;
    const CURRENT_USER_ID = 1;

    useEffect(() => {
        fetchHistory();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/history/${ROOM_ID}`);
            const history = response.data.map((msg: any) => ({
                ...msg,
                role: msg.senderId === CURRENT_USER_ID ? 'user' : 'assistant',
            }));
            setMessages(history);
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim() || isLoading) return;

        const newMsg: Message = {
            content: inputText,
            role: 'user',
            senderId: CURRENT_USER_ID,
            roomId: ROOM_ID,
        };

        setMessages((prev) => [...prev, newMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await axios.post(API_BASE_URL, {
                roomId: ROOM_ID,
                senderId: CURRENT_USER_ID,
                message: newMsg.content,
            });

            const aiMsg: Message = {
                content: response.data.reply,
                role: 'assistant',
            };
            setMessages((prev) => [...prev, aiMsg]);
        } catch (error) {
            console.error('Failed to send message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 dark:bg-neutral-900 font-sans">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white dark:bg-neutral-800 shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden">
                            <Image src="/ai_avatar.png" alt="AI Avatar" width={40} height={40} className="object-cover" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-neutral-800"></div>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">AI Assistant</h2>
                        <p className="text-xs text-green-500 font-medium">Active now</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-gray-500 hover:text-gray-700 dark:text-gray-400">
                    <Phone className="w-5 h-5 cursor-pointer" />
                    <Video className="w-5 h-5 cursor-pointer" />
                    <MoreVertical className="w-5 h-5 cursor-pointer" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && !isLoading && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400">
                        <Image src="/ai_avatar.png" alt="AI Avatar" width={80} height={80} className="mb-4 opacity-50" />
                        <p>Say hello to start the conversation!</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                            }`}
                    >
                        <div className="flex max-w-[70%] gap-2 items-end">
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex-shrink-0 flex items-center justify-center overflow-hidden mb-1">
                                    <Image src="/ai_avatar.png" alt="AI Avatar" width={32} height={32} className="object-cover" />
                                </div>
                            )}

                            <div
                                className={`p-3 rounded-2xl shadow-sm ${msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-neutral-700'
                                    }`}
                            >
                                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{msg.content}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-end gap-2 max-w-[70%]">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center overflow-hidden mb-1">
                                <Image src="/ai_avatar.png" alt="AI" width={32} height={32} className="object-cover" />
                            </div>
                            <div className="bg-white dark:bg-neutral-800 p-4 rounded-2xl rounded-bl-none border border-gray-100 dark:border-neutral-700 shadow-sm flex gap-1 items-center">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700">
                <form
                    onSubmit={handleSendMessage}
                    className="flex items-center gap-2 max-w-4xl mx-auto w-full"
                >
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-100 dark:bg-neutral-900 border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white rounded-full px-5 py-3 outline-none transition-all duration-200"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim() || isLoading}
                        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
