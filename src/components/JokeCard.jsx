export default function JokeCard({ joke }) {
  return (
    <div className="bgglass">
      <div className="card">

        <p className="setup">{joke.setup}</p>

        <div className="line"></div>

        <p className="punchline">{joke.punchline}</p>

      </div>
    </div>
  );
}