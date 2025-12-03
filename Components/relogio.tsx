"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<string>("");

  useEffect(() => {
    const atualizar = () => {
      const agora = new Date();
      const formatado = agora.toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setHora(formatado);
    };

    atualizar(); // Atualiza imediatamente
    const timer = setInterval(atualizar, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <span style={{ fontFamily: "monospace", fontSize: "1rem" }}>
      {hora}
    </span>
  );
}
