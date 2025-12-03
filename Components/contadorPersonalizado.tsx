"use client";

import { useState, useEffect } from "react";

interface ContadorPersonalizadoProps {
  title: string; // identificador único
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const storageKey = `likes_${title}`;
  const [likes, setLikes] = useState(0);

  // Carregar likes do localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setLikes(parseInt(saved, 10));
  }, [storageKey]);

  // Guardar sempre que likes mudar
  useEffect(() => {
    localStorage.setItem(storageKey, String(likes));
  }, [likes, storageKey]);

  return (
    <button
      onClick={() => setLikes(likes + 1)}
      style={{
        padding: "8px 12px",
        marginTop: "10px",
        cursor: "pointer",
        borderRadius: "6px",
        background: "#0070f3",
        color: "white",
        border: "none",
        fontWeight: "bold",
      }}
    >
      👍 {likes}
    </button>
  );
}
