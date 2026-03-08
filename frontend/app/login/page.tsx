'use client'

import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/sandbox-bg.jpg"
                    alt="Sandbox background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Dark overlay to ensure text readability */}
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
            </div>

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">

                {/* Left Side: Branding & Typography */}
                <div className="flex-1 text-white md:pr-12 mt-12 md:mt-0 text-center md:text-left drop-shadow-md">
                    <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                        {/* Box/Sandbox icon approximation */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h2 className="text-2xl font-bold tracking-widest uppercase">Sandbox</h2>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black uppercase leading-[1.1] mb-6 tracking-tight">
                        Build<br />Your Ideas
                    </h1>

                    <p className="text-xl md:text-2xl font-semibold mb-3 tracking-wide">
                        Where Your Greatest Projects<br className="hidden md:block" /> Become Reality.
                    </p>

                    <p className="text-base text-gray-200/90 font-light max-w-md mx-auto md:mx-0 leading-relaxed">
                        Skibidi boom boom yes yes.
                    </p>
                </div>

                {/* Right Side: Glassmorphism Login Form */}
                <div className="w-full max-w-md backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 p-8 md:p-10 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                    <form className="space-y-5 flex flex-col" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3.5 rounded-xl bg-white/90 focus:bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-400 shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••••"
                                className="w-full px-4 py-3.5 rounded-xl bg-white/90 focus:bg-white text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-400 shadow-inner tracking-widest"
                            />
                        </div>

                        <div className="flex justify-end w-full">
                            <Link href="#" className="text-sm text-gray-200 hover:text-white transition-colors duration-200">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"
                        >
                            SIGN IN
                        </button>
                    </form>

                    <div className="relative flex py-6 items-center">
                        <div className="flex-grow border-t border-white/20"></div>
                        <span className="flex-shrink-0 mx-4 text-white/70 text-sm">or</span>
                        <div className="flex-grow border-t border-white/20"></div>
                    </div>

                    <button
                        onClick={() => signIn('google', { redirectTo: '/' })}
                        className="w-full flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-3 rounded-xl transition-all duration-300 active:scale-[0.98]"
                    >
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>

                    <p className="text-center mt-8 text-sm text-gray-200">
                        Are you new? <Link href="#" className="font-medium text-white hover:underline underline-offset-4 decoration-white/50">Create an Account</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}
