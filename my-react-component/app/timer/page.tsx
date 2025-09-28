"use client"

import React, { useState, useEffect, useRef } from 'react';

export default function TimerPage() {
    // State for the countdown timer (now in centiseconds - 1/100th of a second)
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // State for input form
    const [inputMinutes, setInputMinutes] = useState<string>('');
    const [inputSeconds, setInputSeconds] = useState<string>('');

    // Ref to store the interval ID
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Effect to handle the countdown (updates every 10ms for 2 decimal places)
    useEffect(() => {
        if (isRunning && !isPaused && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        setIsPaused(false);
                        // Timer finished - you can add notification here
                        alert('Time\'s up!');
                        return 0;
                    }
                    return prevTime - 1; // Decrease by 1 centisecond (0.01 seconds)
                });
            }, 10); // Update every 10ms for 2 decimal places
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        // Cleanup function
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isPaused, timeLeft]);

    // Function to format time display (MM:SS.CC) where CC is centiseconds
    const formatTime = (centiseconds: number): string => {
        const totalSeconds = centiseconds / 100; // Convert centiseconds to seconds
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        const remainingCentiseconds = centiseconds % 100;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${remainingCentiseconds.toString().padStart(2, '0')}`;
    };

    // Function to handle form submission
    const handleSetTimer = (e: React.FormEvent) => {
        e.preventDefault();

        const minutes = parseInt(inputMinutes) || 0;
        const seconds = parseInt(inputSeconds) || 0;
        const totalSeconds = minutes * 60 + seconds;
        const totalCentiseconds = totalSeconds * 100; // Convert to centiseconds

        if (totalCentiseconds > 0) {
            setTimeLeft(totalCentiseconds);
            setIsRunning(false);
            setIsPaused(false);
            // Clear any existing interval
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    };

    // Function to start the timer
    const handleStart = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
            setIsPaused(false);
        }
    };

    // Function to pause the timer
    const handlePause = () => {
        setIsPaused(true);
    };

    // Function to resume the timer
    const handleResume = () => {
        setIsPaused(false);
    };

    // Function to reset the timer
    const handleReset = () => {
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(0);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Countdown Timer</h1>

            {/* Input Form */}
            <form onSubmit={handleSetTimer} className="mb-6">
                <div className="flex gap-2 mb-4">
                    <div className="flex-1">
                        <label htmlFor="minutes" className="block text-sm font-medium text-gray-700 mb-1">
                            Minutes
                        </label>
                        <input
                            id="minutes"
                            type="number"
                            min="0"
                            max="59"
                            value={inputMinutes}
                            onChange={(e) => setInputMinutes(e.target.value)}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">
                            Seconds
                        </label>
                        <input
                            id="seconds"
                            type="number"
                            min="0"
                            max="59"
                            value={inputSeconds}
                            onChange={(e) => setInputSeconds(e.target.value)}
                            placeholder="0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Set Timer
                </button>
            </form>

            {/* Timer Display */}
            <div className="text-center mb-6">
                <div className="text-6xl font-mono font-bold text-gray-800 mb-4">
                    {formatTime(timeLeft)}
                </div>

                {/* Status indicator */}
                <div className="text-sm text-gray-600 mb-4">
                    {isRunning && !isPaused && 'Running...'}
                    {isPaused && 'Paused'}
                    {!isRunning && !isPaused && timeLeft === 0 && 'Set a time to start'}
                    {!isRunning && !isPaused && timeLeft > 0 && 'Ready to start'}
                </div>
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2 justify-center">
                {!isRunning || isPaused ? (
                    <button
                        onClick={isPaused ? handleResume : handleStart}
                        disabled={timeLeft === 0}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isPaused ? 'Resume' : 'Start'}
                    </button>
                ) : (
                    <button
                        onClick={handlePause}
                        className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        Pause
                    </button>
                )}

                <button
                    onClick={handleReset}
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}