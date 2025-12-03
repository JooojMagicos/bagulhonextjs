import Link from "next/link";
import tecnologias from "@/app/data/tecnologias.json";
import "@/styles/tecnologias.css";
import ContadorPersonalizado from "@/Components/contadorPersonalizado";

export default function TecnologiasPage() {
  return (
    <div className="tecnologias-container">
      {tecnologias.map((tec, index) => (
        <div key={index} className="tecnologia-card">
          <img src={`/img/${tec.image}`} alt={tec.title} />
          <h3>{tec.title}</h3>
          <p>{tec.description.substring(0, 60)}...</p>

          {/* Contador de likes */}
          <ContadorPersonalizado title={tec.title} />

          <Link href={`/tecnologias/${index}`} className="ver-detalhes">
            Ver detalhes
          </Link>
        </div>
      ))}
    </div>
  );
}
