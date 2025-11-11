"use client"

import React, { useState } from 'react';

export default function TemperaturePage() {
    // State for temperature values
    const [celsius, setCelsius] = useState<string>('');
    const [fahrenheit, setFahrenheit] = useState<string>('');
    const [kelvin, setKelvin] = useState<string>('');

    // Function to convert from Celsius
    const handleCelsiusChange = (value: string) => {
        setCelsius(value);
        
        if (value === '' || value === '-') {
            setFahrenheit('');
            setKelvin('');
            return;
        }

        const celsiusNum = parseFloat(value);
        if (!isNaN(celsiusNum)) {
            // Convert to Fahrenheit: F = C × 9/5 + 32
            const fahrenheitNum = (celsiusNum * 9/5) + 32;
            setFahrenheit(fahrenheitNum.toFixed(2));

            // Convert to Kelvin: K = C + 273.15
            const kelvinNum = celsiusNum + 273.15;
            setKelvin(kelvinNum.toFixed(2));
        }
    };

    // Function to convert from Fahrenheit
    const handleFahrenheitChange = (value: string) => {
        setFahrenheit(value);
        
        if (value === '' || value === '-') {
            setCelsius('');
            setKelvin('');
            return;
        }

        const fahrenheitNum = parseFloat(value);
        if (!isNaN(fahrenheitNum)) {
            // Convert to Celsius: C = (F - 32) × 5/9
            const celsiusNum = (fahrenheitNum - 32) * 5/9;
            setCelsius(celsiusNum.toFixed(2));

            // Convert to Kelvin: K = (F - 32) × 5/9 + 273.15
            const kelvinNum = celsiusNum + 273.15;
            setKelvin(kelvinNum.toFixed(2));
        }
    };

    // Function to convert from Kelvin
    const handleKelvinChange = (value: string) => {
        setKelvin(value);
        
        if (value === '' || value === '-') {
            setCelsius('');
            setFahrenheit('');
            return;
        }

        const kelvinNum = parseFloat(value);
        if (!isNaN(kelvinNum)) {
            // Convert to Celsius: C = K - 273.15
            const celsiusNum = kelvinNum - 273.15;
            setCelsius(celsiusNum.toFixed(2));

            // Convert to Fahrenheit: F = (K - 273.15) × 9/5 + 32
            const fahrenheitNum = (celsiusNum * 9/5) + 32;
            setFahrenheit(fahrenheitNum.toFixed(2));
        }
    };

    // Function to reset all fields
    const handleReset = () => {
        setCelsius('');
        setFahrenheit('');
        setKelvin('');
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Temperature Converter</h1>

            <div className="space-y-4">
                {/* Celsius Input */}
                <div>
                    <label htmlFor="celsius" className="block text-sm font-medium text-gray-700 mb-1">
                        Celsius (°C)
                    </label>
                    <input
                        id="celsius"
                        type="number"
                        step="any"
                        value={celsius}
                        onChange={(e) => handleCelsiusChange(e.target.value)}
                        placeholder="Enter temperature in Celsius"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Fahrenheit Input */}
                <div>
                    <label htmlFor="fahrenheit" className="block text-sm font-medium text-gray-700 mb-1">
                        Fahrenheit (°F)
                    </label>
                    <input
                        id="fahrenheit"
                        type="number"
                        step="any"
                        value={fahrenheit}
                        onChange={(e) => handleFahrenheitChange(e.target.value)}
                        placeholder="Enter temperature in Fahrenheit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Kelvin Input */}
                <div>
                    <label htmlFor="kelvin" className="block text-sm font-medium text-gray-700 mb-1">
                        Kelvin (K)
                    </label>
                    <input
                        id="kelvin"
                        type="number"
                        step="any"
                        value={kelvin}
                        onChange={(e) => handleKelvinChange(e.target.value)}
                        placeholder="Enter temperature in Kelvin"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Reset Button */}
                <button
                    onClick={handleReset}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                    Reset
                </button>
            </div>

            {/* Information Section */}
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
                <h2 className="text-sm font-semibold text-gray-700 mb-2">Quick Reference:</h2>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Water freezes: 0°C = 32°F = 273.15K</li>
                    <li>• Water boils: 100°C = 212°F = 373.15K</li>
                    <li>• Absolute zero: -273.15°C = -459.67°F = 0K</li>
                </ul>
            </div>
        </div>
    );
}

