"use client";
import "@excalidraw/excalidraw/index.css";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react"

const Excalidraw = dynamic(
    async () => (await import("@excalidraw/excalidraw")).Excalidraw,
    {
        ssr: false,
    }
);
export default function Workspace() {
    const [mount, setmount] = useState(false);
    const [message, setmessage] = useState('');
    const excalidrawRef = useRef<any>(null);

    useEffect(() => {
        setmount(true)
        const handlePaste = async (event: ClipboardEvent) => {
            const items = event.clipboardData?.items;

            if (!items) return;

            for (const item of items) {
                if (item.type.startsWith("image")) {
                    const file = item.getAsFile();

                    if (!file) return;

                    const reader = new FileReader();

                    reader.onload = async () => {
                        const imageUrl = reader.result as string;

                        setmessage("Image pasted successfully!");

                        const api = excalidrawRef.current;

                        if (!api) return;

                        const img = document.createElement("img");

                        img.src = imageUrl;
                        img.onload = async () => {
                            const blob = await fetch(imageUrl).then((r) => r.blob());

                            const file = new File([blob], "pasted-image.png", {
                                type: "image/png",
                            });

                            await api.addFiles([file]);
                        };

                    };
                    reader.readAsDataURL(file);
                }
            }
        };

        window.addEventListener("paste", handlePaste);

        return () => {
            window.removeEventListener("paste", handlePaste);
        };
    }, [])
    if (!mount) return null;

    return (
        <div className="w-full mt-5">
            {message && (
                <div className="bg-green-100 text-green-700 p-2 rounded mb-3">
                    {message}
                </div>
            )}
            <button
                onClick={async () => {
                    const api = excalidrawRef.current;

                    if (!api) return;

                    const elements = api.getSceneElements();

                    console.log(elements);
                }}
                className="mb-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Export
            </button>
            <div className="w-full h-[600px] border rounded-xl overflow-hidden bg-white mt-4">
                <Excalidraw  excalidrawAPI={(api) => {
                    excalidrawRef.current = api;
                }} />

            </div>
        </div>

    )
}