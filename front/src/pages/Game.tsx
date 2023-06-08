// import React from 'react'
import NavBar from '../components/NavBar.tsx';
import '../style/components/net.css'
import '../style/components/buttons.css'
import '../style/pages/Game.css'

function Game() {
    return (
      <>
        <NavBar />
        <div className="h-screen flex flex-col items-center game-page">
          <h1 style={{ marginTop: '5%' }}>PONG</h1>
          <div className="flex flex-col items-center"  >
            <div className="net w-100px mb-4"style={{ marginTop: '25%' }}></div>
           </div>
          <div className="flex justify-center" style={{ marginTop: '15%' }}>
            <button className="searchgame-button mr-2"style={{ marginRight: '40%' }}>Search Game</button>
            <button className="searchgame-button m1-2"style={{ marginLeft: '40%' }}>Invite Friends</button>
          </div>
        </div>
      </>
    );
  }
  
  export default Game;
  