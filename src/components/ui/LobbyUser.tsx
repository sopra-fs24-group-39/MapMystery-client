import PropTypes from "prop-types";

const LobbyUser= (props) => {
  return(
    <div className={"flex flex-row"}>
      <p>{props.name}</p>
      <p>Games played: <span>{props.gamesPlayed}</span></p>
      <p>Games won: <span>{props.gamesWon}</span></p>
    </div>
  );
}

LobbyUser.propTypes = {
  name: PropTypes.string,
  gamesPlayed: PropTypes.string,
  gamesWon: PropTypes.string,
};

export default LobbyUser;