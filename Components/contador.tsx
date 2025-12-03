"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState<number>(0);
  const [historico, setHistorico] = useState<number[]>([]);

  // Carregar do localStorage no mount
  useEffect(() => {
    const saved = localStorage.getItem("contador");
    const savedHist = localStorage.getItem("contador_historico");

    if (saved) {
      const n = parseInt(saved, 10);
      if (!isNaN(n)) setValor(n);
    }

    if (savedHist) {
      try {
        const arr = JSON.parse(savedHist) as number[];
        if (Array.isArray(arr)) {
          // remover duplicações consecutivas no histórico carregado (segurança)
          const cleaned = arr.filter((v, i) => i === 0 || v !== arr[i - 1]);
          setHistorico(cleaned);
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  // Guardar no localStorage (não altera estado)
  useEffect(() => {
    localStorage.setItem("contador", String(valor));
    localStorage.setItem("contador_historico", JSON.stringify(historico));
  }, [valor, historico]);

  // Função que adiciona ao histórico apenas se o novo valor for diferente do último
  const adicionarHistorico = (novo: number) => {
    setHistorico((antigo) => {
      const ultimo = antigo.length ? antigo[antigo.length - 1] : null;
      if (ultimo === novo) return antigo; // evita duplicação consecutiva
      return [...antigo, novo];
    });
  };

  const inc = () => {
    setValor((vAnterior) => {
      const novo = Math.min(10, vAnterior + 1);
      // adiciona ao histórico com base no novo valor
      // fazemos aqui e não em useEffect para garantir atomicidade lógica
      adicionarHistorico(novo);
      return novo;
    });
  };

  const dec = () => {
    setValor((vAnterior) => {
      const novo = Math.max(0, vAnterior - 1);
      adicionarHistorico(novo);
      return novo;
    });
  };

  const reset = () => {
    setValor((vAnterior) => {
      const novo = 0;
      adicionarHistorico(novo);
      return novo;
    });
  };

  const getColor = () => {
    if (valor <= 3) return "red";
    if (valor <= 7) return "orange"; // amarelo/laranja
    return "green";
  };

  return (
    <div>
      <h2>
        Valor atual:{" "}
        <span style={{ color: getColor(), fontWeight: "bold" }}>{valor}</span>
      </h2>

      <div style={{ display: "flex", gap: "10px", margin: "15px 0" }}>
        <button onClick={inc} aria-label="Incrementar">Incrementar</button>
        <button onClick={dec} aria-label="Decrementar">Decrementar</button>
        <button onClick={reset} aria-label="Reset">Reset</button>
      </div>

      <h3>Histórico:</h3>
      <ul>
        {historico.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
