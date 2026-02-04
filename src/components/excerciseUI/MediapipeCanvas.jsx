import { useRef, useEffect } from "react";

export default function MediapipeCanvas({ onResults }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // ตัวอย่างการวาด placeholder
        const drawPlaceholder = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(255,165,0,0.2)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "orange";
            ctx.font = "12px Arial";
            ctx.fillText("Mediapipe", 5, 15);
        };

        drawPlaceholder();
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={120}      // ขนาด canvas
            height={160}     // ขนาด portrait
            className="absolute top-1/2 right-4 z-30 -translate-y-1/2  rounded-xl border border-orange-400/30 shadow-lg"
        />
    );
}
