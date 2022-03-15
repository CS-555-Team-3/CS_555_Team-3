

const Hint = ({hint}) => {
    //TODO: Add tests

    const playHint = () => {
      try { hint.play(); }
      catch (e) {console.log('Hint: error in playing the tune passed in ', e)}
    }

    return (
        <button className='hint' onClick={playHint}> Hint </button>
    );
}

export default Hint