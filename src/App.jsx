import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
    const [length, setLength] = useState(8);
    const [isNumberAllowed, setIsNumberAllowed] = useState(false);
    const [isSpecialCharacterAllowed, setIsSpecialCharacterAllowed] =
        useState(false);
    const [password, setPassword] = useState("");
    const passRef = useRef(null);

    const generatePassword = useCallback(() => {
        let pass = "";
        let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (isNumberAllowed) {
            str += "0123456789";
        }
        if (isSpecialCharacterAllowed) {
            str += "!@#$%^&*()-_=+[]{}|;:<,>.?/";
        }
        for (let i = 0; i < length; i++) {
            let charIndex = Math.floor(Math.random() * str.length);
            pass += str.charAt(charIndex);
        }
        setPassword(pass);
    }, [length, isNumberAllowed, isSpecialCharacterAllowed]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(password).catch((err) => {
                console.error("Failed to copy: ", err);
                fallbackCopyTextToClipboard(password);
            });
        } else {
            fallbackCopyTextToClipboard(password);
        }
    };

    const fallbackCopyTextToClipboard = (text) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand("copy");
            const msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    };

    return (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
            <div className="w-full max-w-7xl mx-auto rounded-lg border-8 border-white p-5 md:p-8 backdrop-blur-md bg-white/30">
                <div className="text-center text-3xl md:text-4xl lg:text-5xl shadow-lg rounded-lg p-5 bg-gray-950 text-white w-full">
                    Password Generator
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center shadow-lg rounded-lg p-5 bg-gray-750 text-black mt-5 w-full">
                    <div className="flex flex-col md:flex-row md:items-center gap-x-2 w-full p-2">
                        <input
                            type="range"
                            className="border border-slate-200 rounded-lg cursor-pointer outline-none bg-transparent w-full md:w-auto"
                            min="6"
                            max="100"
                            value={length}
                            onChange={(e) => setLength(e.target.value)}
                        />
                        <div className="flex items-center gap-x-2 mt-2 md:mt-0">
                            <label className="text-xl md:text-2xl lg:text-3xl text-slate-200">
                                Length:
                            </label>
                            <span className="text-xl md:text-2xl lg:text-3xl text-slate-200">
                                {length}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-x-2 w-full p-2">
                        <input
                            className="border border-slate-200 rounded-lg cursor-pointer outline-none bg-transparent form-check-input custom-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                                setIsNumberAllowed(e.target.checked)
                            }
                        />
                        <label className="text-xl md:text-2xl lg:text-3xl text-slate-200 form-check-label mt-2 md:mt-0">
                            Numbers
                        </label>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-x-2 w-full p-2">
                        <input
                            className="border border-slate-200 rounded-lg cursor-pointer outline-none bg-transparent form-check-input custom-checkbox"
                            type="checkbox"
                            onChange={(e) =>
                                setIsSpecialCharacterAllowed(e.target.checked)
                            }
                        />
                        <label className="text-xl md:text-2xl lg:text-3xl text-slate-200 form-check-label mt-2 md:mt-0">
                            Special Characters
                        </label>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center shadow-lg rounded-lg p-5 bg-gray-700 text-white mt-5 w-full">
                    <input
                        type="text"
                        value={password}
                        className="text-white text-xl md:text-2xl lg:text-3xl bg-gray-500 border border-slate-200 rounded-lg py-3 px-5 outline-none w-full"
                        ref={passRef}
                        readOnly
                    />
                    <button
                        className="btn btn-primary bg-gray-950 rounded-lg text-xl md:text-2xl lg:text-3xl cursor-pointer mt-4 md:mt-0 md:ml-4 p-3 w-full md:w-auto"
                        onClick={() => {
                            copyToClipboard();
                            passRef.current.select();
                        }}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
