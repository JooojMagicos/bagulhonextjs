import React from "react";
import ContadorPersonalizado from "@/Components/contadorPersonalizado";

interface Tecnologia {
  title: string;
  image: string;
  description: string;
  rating: number;
}

interface TecnologiaDetailsCardProps {
  tecnologia: Tecnologia;
}

export default function TecnologiaDetailsCard({ tecnologia }: TecnologiaDetailsCardProps) {
  return (
    <div className="card-tecnologia">
      <img src={`/img/${tecnologia.image}`} alt={tecnologia.title} />
      <h2>{tecnologia.title}</h2>
      <p>{tecnologia.description}</p>
      <p className="rating">{"⭐".repeat(tecnologia.rating)}</p>

      <ContadorPersonalizado title={tecnologia.title} />
    </div>
  );
}
