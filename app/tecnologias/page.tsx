import tecnologias from '@/app/data/tecnologias.json';

export default function Page() {

  const Tecnologias = JSON.parse(JSON.stringify(tecnologias));

  return (
    <div>
      <h1>Tecnologias</h1>
      <ul>
        {tecnologias.map((tec, i) => (
          <li key={i}>
            <h2>{tec.title}</h2>
            <img src={`/img/${tec.image}`} alt={tec.title} width={80} />
            <p>{tec.description}</p>
            <strong>Rating: {tec.rating}⭐</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
