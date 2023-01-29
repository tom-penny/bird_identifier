import "../App.css";


const CapturedCard = ({ bird }) => {
  return (
    <div className="captured-card">
      <section className="card-info">
        <img
          src={bird.birdImage}
          alt="bird silhoute"
          width="200"
          height="200"
        ></img>
        <p className="captured-card-birdname">{bird.birdName}</p>

      </section>
    </div>
  );
};

export default CapturedCard;
