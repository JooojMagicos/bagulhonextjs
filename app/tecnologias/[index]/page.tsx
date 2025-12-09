import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";
import tecnologias from "@/app/data/tecnologias.json";
import Link from "next/link";
import "@/styles/tecnologias.css";

interface TecnologiaPageProps {
  params: { index: string };
}


export default function TecnologiaPage({ params }: TecnologiaPageProps) {
  const index = parseInt(params.index);
  const tecnologia = tecnologias[index];

  if (!tecnologia) return <p>Tecnologia não encontrada.</p>;

  return (
    <div className="tecnologia-details-container">
      <TecnologiaDetailsCard tecnologia={tecnologia} />
      <Link href="/tecnologias" className="voltar-btn">
        Voltar
      </Link>
    </div>
  );
}
