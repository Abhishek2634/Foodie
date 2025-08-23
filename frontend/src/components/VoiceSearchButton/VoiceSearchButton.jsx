import React, { useState } from "react";
import { useSpeechRecognition } from "../../../utility/useSpeechRecognition";

const VoiceSearchButton = () => {
  const [transcript, setTranscript] = useState("");

  const { startListening, stopListening, listening } = useSpeechRecognition({
    lang: "en-US",
    continuous: false,
    interimResults: false,
    onResult: (result) => setTranscript(result),
  });

  return (
    <div className="p-4 text-center">
      <button
        onMouseDown={startListening}
        onMouseUp={stopListening}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {listening ? "Listening..." : "Hold to Speak"}
      </button>

      {transcript && (
        <p className="mt-3 text-gray-700">
          <strong>You said:</strong> {transcript}
        </p>
      )}
    </div>
  );
};

export default VoiceSearchButton;
