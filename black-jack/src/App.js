import "./App.css";
import axios from "axios";
import React, { useEffect } from "react";

// dealer has to stay at a hard 17 at that point stop and Player wins if theyre higher value

const api = "https://deckofcardsapi.com/api";

function App() {
  const [deckId, setDeckId] = React.useState();
  const [playerDeck, setPlayerDeck] = React.useState([]);
  const [playerValue, setPlayerValue] = React.useState(0);
  const [dealerDeck, setDealerDeck] = React.useState([]);
  const [dealerValue, setDealerValue] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);
  const [winner, setWinner] = React.useState();

  //setting deckId, playerDeck and dealerDeck to local states
  useEffect(() => {
    let deck_id = localStorage.getItem("deck_id");
    let player_deck = JSON.parse(localStorage.getItem("player_deck"));
    let dealer_deck = JSON.parse(localStorage.getItem("dealer_deck"));
    if (deck_id) {
      setDeckId(deck_id);
    }
    if (player_deck) {
      setPlayerDeck(player_deck);
    }
    if (dealer_deck) {
      setDealerDeck(dealer_deck);
    }
  }, []);

  //retrieving deckId, playerDeck and dealerDeck from async storage
  useEffect(() => {
    localStorage.setItem("deck_id", deckId);
    localStorage.setItem("player_deck", JSON.stringify(playerDeck));
    localStorage.setItem("dealer_deck", JSON.stringify(dealerDeck));
  }, [deckId, playerDeck, dealerDeck]);

  //counter for player deck value after each hit.
  const playerDeckValue = async () => {
    let cardSum = 0;
    playerDeck.forEach((card) => {
      let val = getCardVal(card);
      cardSum = cardSum + val;
    });
    console.log("Player Deck Value: ", cardSum);
    return cardSum;
  };

   //counter for dealer deck value after each hit.
  const dealerDeckValue = async () => {
    let cardSum = 0;
    dealerDeck.forEach((card) => {
      let val = getCardVal(card);
      cardSum = cardSum + val;
    });
    console.log("Dealer Deck Val: ", cardSum);
    return cardSum;
  };

  React.useEffect(() => {
    const gameResult = async () => {
      const playerDeckVal = await playerDeckValue();
      setPlayerValue(playerDeckVal);
      const dealerDeckVal = await dealerDeckValue();
      setDealerValue(dealerDeckVal);
      if (dealerDeckVal <= 21 && playerDeckVal > 21) {
        console.log("Dealer Wins");
        setGameOver(true);
        setWinner("Dealer");
      }
      if (playerDeckVal <= 21 && dealerDeckVal > 21) {
        console.log("Player Wins");
        setGameOver(true);
        setWinner("Player");
      }
      if (playerDeckVal === 21 && dealerDeckVal === 21) {
        console.log("Push");
        setGameOver(true);
      }
    };
    gameResult();
  });

  //start a new game
  const dealGame = async () => {
    let shuffleResponse = await axios.get(
      `${api}/deck/new/shuffle/?deck_count=6`
    );
    let deck_id = await shuffleResponse.data.deck_id;
    setDeckId(deck_id);
    let player_deck = [];
    let dealer_deck = [];
    let drawn_cards = await axios.get(`${api}/deck/${deck_id}/draw/?count=4`);
    player_deck.push(drawn_cards.data.cards[0]);
    player_deck.push(drawn_cards.data.cards[1]);
    dealer_deck.push(drawn_cards.data.cards[2]);
    dealer_deck.push(drawn_cards.data.cards[3]);
    setDealerDeck(dealer_deck);
    setPlayerDeck(player_deck);
  };

  //revert back
  const resetGame = () => {
    localStorage.clear();
    setGameOver(false);
    setWinner("");
    setDealerDeck([]);
    setPlayerDeck([]);
    setDeckId();
  };

  //player hits
  const playerHit = async () => {
    if (playerDeck.length < 5) {
      const response = await axios.get(`${api}/deck/${deckId}/draw/?count=1`);
      const card_data = await response.data.cards[0];
      console.log(card_data);
      setPlayerDeck((playerDeck) => [...playerDeck, card_data]);
    } else {
      console.log(`Max deck length`);
    }
  };

  //player stands
  const playerStands = async () => {
    let cardsForDealer = playerDeck.length;
    console.log(cardsForDealer);
    const response = await axios.get(
      `${api}/deck/${deckId}/draw/?count=${cardsForDealer}`
    );
    for (let i = 0; i < cardsForDealer - 1; i++) {
      let dealer_card = await response.data.cards[i];
      setDealerDeck((dealerDeck) => [...dealerDeck, dealer_card]);
    }
  };

  //convert the card value from string to int.
  const getCardVal = (card) => {
    let card_val = card.value;
    console.log(card_val);
    if (card_val === "KING" || card_val === "QUEEN" || card_val === "JACK") {
      card_val = 10;
    } else if (card_val === "ACE") {
      card_val = 11;
    } else {
      card_val = parseInt(card_val);
    }
    return card_val;
  };

  const GameOver = ({ isGameOver }) => {
    if (isGameOver === true) {
      return (
        <div className="flex items-center justify-center">
          {winner === "Player" ? (
            <p className="text-5xl font-bold text-blue-400">{winner} wins</p>
          ) : (
            <p className="text-5xl font-bold text-red-400">{winner} wins</p>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const Dealer = () => {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-bold">Dealer: </h2>
        <div className="flex m-4">
          {dealerDeck.map((card) => {
            return (
              <div key={card.code}>
                <img src={card.image} alt={card.value} className="h-64 w-48" />
              </div>
            );
          })}
        </div>
        {dealerValue && <div className="flex m-4">{dealerValue}</div>}
      </div>
    );
  };

  const Player = () => {
    return (
      <div className="flex justify-center items-center">
        <h2 className="text-xl font-bold">Player: </h2>

        <div className="flex m-4">
          {playerDeck.map((card) => {
            return (
              <div key={card.code}>
                <img
                  src={card.image}
                  alt={card.value}
                  className="h-64 w-48 ml-4"
                />
              </div>
            );
          })}
        </div>

        {playerValue && <div className="flex m-4">{playerValue}</div>}
      </div>
    );
  };

  const Actions = () => {
    return (
    <div className="flex justify-center items-center">
    <button
      onClick={dealGame}
      className="border-2 px-3 py-1 text-md font-semibold rounded-lg border-gray-900"
    >
      Deal
    </button>
    <button
      onClick={playerHit}
      className="border-2 px-3 py-1 text-md font-semibold rounded-lg border-gray-900 ml-4"
    >
      Hit Me
    </button>
    <button
      onClick={playerStands}
      className="border-2 px-3 py-1 text-md font-semibold rounded-lg border-gray-900 ml-4"
    >
      Stand
    </button>
    <button
      onClick={resetGame}
      className="border-2 px-3 py-1 text-md font-semibold rounded-lg border-gray-900 ml-4"
    >
      Reset Game
    </button>
  </div>
    )
  }

  return (
    <div className="bg-green-600">
      <h1 className="text-3xl font-bold text-center mt-6">BlackJack</h1>
      <br />
      <Actions />
      <br />
      <br />
      <GameOver isGameOver={gameOver} className="mt-4" />
      <br />
      <br />
      <Dealer />
      <br />
      <Player />
      <br />
    </div>
  );
}

export default App;
