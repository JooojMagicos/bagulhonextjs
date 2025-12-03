"use client";

import { useState } from "react";

const categorias = [
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "DevOps",
  "IA",
];

export default function InputPage() {
  const [texto, setTexto] = useState("");
  const [categoria, setCategoria] = useState(categorias[0]);

  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState<{ id: number; nome: string }[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTexto, setEditTexto] = useState("");

  const adicionarTarefa = () => {
    if (!tarefa.trim()) return;

    setTarefas((t) => [...t, { id: Date.now(), nome: tarefa }]);
    setTarefa("");
  };

  const apagarTarefa = (id: number) => {
    setTarefas((t) => t.filter((i) => i.id !== id));
  };

  const iniciarEdicao = (id: number, nome: string) => {
    setEditId(id);
    setEditTexto(nome);
  };

  const guardarEdicao = () => {
    setTarefas((t) =>
      t.map((i) => (i.id === editId ? { ...i, nome: editTexto } : i))
    );
    setEditId(null);
    setEditTexto("");
  };

  const cancelarEdicao = () => {
    setEditId(null);
    setEditTexto("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h1>Página Input</h1>

      {/* INPUT DE TEXTO */}
      <div>
        <h2>Texto</h2>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite algo..."
          style={{ padding: "8px", width: "100%" }}
        />
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>{texto}</p>
      </div>

      <hr />

      {/* SELETOR */}
      <div>
        <h2>Categoria</h2>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          style={{ padding: "8px", width: "100%" }}
        >
          {categorias.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <p style={{ marginTop: "10px" }}>
          Categoria selecionada: <strong>{categoria}</strong>
        </p>
      </div>

      <hr />

      {/* LISTA DE TAREFAS */}
      <div>
        <h2>Tarefas</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={tarefa}
            onChange={(e) => setTarefa(e.target.value)}
            placeholder="Nova tarefa..."
            style={{ padding: "8px", flex: 1 }}
          />
          <button onClick={adicionarTarefa}>Adicionar</button>
        </div>

        <ul style={{ marginTop: "20px" }}>
          {tarefas.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              {editId === t.id ? (
                <>
                  <input
                    type="text"
                    value={editTexto}
                    onChange={(e) => setEditTexto(e.target.value)}
                    style={{ flex: 1, marginRight: "10px" }}
                  />
                  <button onClick={guardarEdicao}>Guardar</button>
                  <button onClick={cancelarEdicao}>Cancelar</button>
                </>
              ) : (
                <>
                  <span>{t.nome}</span>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => iniciarEdicao(t.id, t.nome)}>
                      Editar
                    </button>
                    <button onClick={() => apagarTarefa(t.id)}>Apagar</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
