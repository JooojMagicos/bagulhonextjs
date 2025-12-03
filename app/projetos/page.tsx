import Link from 'next/link'
import "@/styles/projetos.css";


export function Header() {
return (
    <header className="flex flex-col items-center">  
        <nav className="flex gap-4">
          <Link href="/">Intro</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/caracteristicas">caracteristica</Link>
          <Link href="/tecnologias">Tecnologias</Link>
          <Link href="/projetos">Projetos</Link>
        </nav>
    </header>
);
}

// Componente Projeto
export function Projeto({ nome="Minha Loja", url="jooojmagicos.github.io" }) {
return (
    <p className="my-2">
        Projeto <strong>{nome}</strong>: <a href={url} target="_blank">acessar aqui</a>.
    </p>
);
}

// Componente DescricaoProjetos
export function DescricaoProjetos() {
    return (
        <div>
            <h2 className="projetos-title">Meus Projetos</h2>

            <p className="projetos-text mb-4">
                Ao longo do tempo desenvolvi vários projetos. Você pode ver todos no meu GitHub Pages:
                <a href="https://seu-username.github.io" target="_blank" className="ml-1">
                    clicar aqui
                </a>.
            </p>

            <Projeto nome="Loja Online" url="https://example.com/loja" />
            <Projeto nome="Site com JS Interativo" url="https://example.com/js-interativo" />
            <Projeto nome="Outro Projeto" url="https://example.com/projeto-extra" />
        </div>
    );
}


export default function ProjetosPage() {
    return (
        <main className="projetos-container">
            <Header />
            <DescricaoProjetos />
        </main>
    );
}


