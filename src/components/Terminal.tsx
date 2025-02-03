import React, { useState, useEffect } from "react";

const Terminal: React.FC = () => {
  const [output, setOutput] = useState<string[]>([]); // Store lines of text
  const [currentLine, setCurrentLine] = useState<string>(""); // Current line being typed
  const [showCursor, setShowCursor] = useState<boolean>(true); // Blinking cursor state

  const messages: string[] = [
    "> Initializing Blay AI Core... ",
    "> Synaptic algorithms: ONLINE ",
    "> Chaos-to-Order protocols: ACTIVE ",
    "> Cognitive wit level: MAXIMIZED ",
    "> Charm factor: INFINITE ",
    "> Connection to Bitlayer network: SECURE ",
    "Blay is ready to roll.",
    "Think smart. Work smart. Play smart.",
    "Welcome to Bitlayer, where Blay turns problems into possibilities.",
    "Ready for your clever solutions?",
  ];

  useEffect(() => {
    const typeMessages = async () => {
      for (let i = 0; i < messages.length; i++) {
        const str: string = await typeLine(messages[i]);
        setOutput((prev) => (prev.includes(str) ? prev : [...prev, str])); // Add completed line to output
        setCurrentLine("");
      }
    };

    typeMessages();
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 200); // Cursor blink interval

    return () => clearInterval(cursorInterval);
  }, []);

  const typeLine = (text: string): Promise<string> => {
    return new Promise((resolve) => {
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setCurrentLine(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typingInterval);
          resolve(text);
        }
      }, 50); // Typing speed
    });
  };

  return (
    <div
      style={{
        color: "#e36f19",
        padding: "20px",
        fontSize: "14px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {output.map((line, idx) => (
        <div key={idx} style={{ marginBottom: 4, height: "1.2em" }}>
          {line}
          <span
            style={{
              display: "inline-block",
              height: "1em",
              visibility:
                messages.length - 1 === idx && showCursor
                  ? "visible"
                  : "hidden",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                backgroundColor: "#e36f19",
                height: "1em",
              }}
            ></span>
          </span>
        </div>
      ))}
      <div style={{ display: "flex" }}>
        {currentLine}
        {currentLine && showCursor && (
          <span
            style={{
              display: "inline-block",
              width: "6px",
              backgroundColor: "lime",
              height: "1em",
            }}
          ></span>
        )}{" "}
        {/* Simulate cursor */}
      </div>
    </div>
  );
};

export default Terminal;
