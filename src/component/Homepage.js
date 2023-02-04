import recordMyLogo from '../images/recordMyLogo.png';

function Homepage() {

  return (
    <div>
      <img src={recordMyLogo} />
      <div>
        Welcome to RecordMy.<br/>
        Here is a place that allows you to record your GAME/NOVEL/MOVIE SERIES progress.
      </div>
    </div>
  );
}

export default Homepage;
