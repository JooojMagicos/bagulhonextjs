import MagiaDoJSX from "@/components/MagiaDoJSX/MagiaDoJSX"
import Link from 'next/link'
export function Header()
{
  return(
    <header className="flex flex-col items-center">
        
        <nav className="flex gap-4">
          <Link href="/">Intro</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/caracteristicas">caracteristica</Link>
          <Link href="/tecnologias">Tecnologias</Link>
          <Link href="/projetos">Projetos</Link>
          <Link href="/contador">Contador</Link>
          <Link href="/input">Input</Link>
          <Link href="/produtos">produtos</Link>

        </nav>
    </header>
  )
}
export default function page()
{
  return(
    <>
    <Header/>
    <div>
      <h2>Interfaces Modernos</h2>
      <p> Bem vindo à minha app em React e Next.js</p>
      <MagiaDoJSX></MagiaDoJSX>
    </div>
    </>
  );
}