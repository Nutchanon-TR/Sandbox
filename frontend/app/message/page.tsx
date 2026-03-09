'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Avatar, Badge, Typography, Input, Button, Space } from 'antd';
import axios from 'axios';
import Image from 'next/image';
import { TITLE } from "@/constants/Title";
import { useChangeTitle } from "@/utils/breadCrumbUtil";

const { Text } = Typography;

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

    const ROOM_ID = 1;
    const CURRENT_USER_ID = 1;

    useChangeTitle(TITLE.MESSAGE, "MESSAGE");

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

    const handleSendMessage = async () => {
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
        // ปรับ Container หลักให้เลื่อน (Scroll) ได้
        <div>
            
            {/* Header: ใช้ sticky top-0 */}
            <div className="sticky top-6 z-20 flex items-center justify-between p-4 bg-white dark:bg-neutral-800 shadow-sm">
                <Space size="middle">
                    <Badge dot color="green" offset={[-5, 35]}>
                        <Avatar src="/ai_avatar.png" size={42} className="bg-indigo-50 border border-indigo-100" />
                    </Badge>
                    <div className="flex flex-col">
                        <Text strong className="text-lg text-gray-800 dark:text-gray-100 leading-none">
                            AI Assistant
                        </Text>
                        <Text type="success" className="text-xs font-medium mt-1">
                            Active now
                        </Text>
                    </div>
                </Space>
                <Space size="small">
                    <Button type="text" icon={<Phone className="w-5 h-5 text-gray-500" />} />
                    <Button type="text" icon={<Video className="w-5 h-5 text-gray-500" />} />
                    <Button type="text" icon={<MoreVertical className="w-5 h-5 text-gray-500" />} />
                </Space>
            </div>

            {/* Chat Area: ไม่ต้องเซ็ต overflow แล้ว ให้มันดันพื้นที่ไปเรื่อยๆ */}
            <div className="flex-1 p-4 space-y-4 relative flex flex-col h-[calc(100vh-64px)] overflow-y-auto bg-gray-50 dark:bg-neutral-900 font-sans">
                {messages.length === 0 && !isLoading && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-20">
                        <Image src="/ai_avatar.png" alt="AI Avatar" width={80} height={80} className="mb-4 opacity-50" />
                        <p>Say hello to start the conversation!</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className="flex max-w-[70%] gap-2 items-end">
                            {msg.role === 'assistant' && (
                                <Avatar src="/ai_avatar.png" size={32} className="flex-shrink-0 bg-indigo-50 border border-indigo-100" />
                            )}

                            <div
                                className={`p-3 rounded-2xl shadow-sm ${
                                    msg.role === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded-bl-none border border-gray-100 dark:border-neutral-700'
                                }`}
                            >
                                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                    {msg.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex items-end gap-2 max-w-[70%]">
                            <Avatar src="/ai_avatar.png" size={32} className="bg-indigo-50 border border-indigo-100" />
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

            {/* Input Area: ใช้ sticky bottom-0 */}
            <div className="sticky bottom-6 z-20 p-4 bg-white dark:bg-neutral-800 border-t border-gray-100 dark:border-neutral-700">
                <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
                    <Input
                        size="large"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onPressEnter={handleSendMessage}
                        placeholder="Type a message..."
                        disabled={isLoading}
                        className="rounded-full bg-gray-100 dark:bg-neutral-900 border-transparent hover:border-transparent focus:bg-white px-5"
                    />
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<Send className="w-4 h-4" />}
                        onClick={handleSendMessage}
                        disabled={!inputText.trim() || isLoading}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
                    />
                </div>
            </div>
        </div>
    );
}