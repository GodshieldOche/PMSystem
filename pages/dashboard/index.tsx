export default function Dashboard(props: any) {
  console.log(props);
  return (
    <div>
      <div className="stats">
        <div className="stats-cards">
          <p>Team</p>
          <h3>5</h3>
        </div>

        <div className="stats-cards">
          <p>Projects</p>
          <h3>5</h3>
        </div>

        <div className="stats-cards">
          <p>Open Projects</p>
          <h3>5</h3>
        </div>

        <div className="stats-cards">
          <p>Open Issues</p>
          <h3>5</h3>
        </div>

        <div className="stats-cards">
          <p>Completed Issues</p>
          <h3>5</h3>
        </div>
      </div>
    </div>
  );
}
