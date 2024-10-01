import './App.css';
import React, {useEffect, useState } from "react";
import SingleCard from './components/SingleCard';

const cardImages=[
  {"src":"https://media.istockphoto.com/id/1550114537/photo/south-downs-landscape.jpg?s=2048x2048&w=is&k=20&c=UXuI67BPIPkEGiujZEkpIR-YfXRQVm_BKUe7F04r9xg=", matched: false},
  {"src":"https://media.istockphoto.com/id/2167505378/photo/tre-cime-di-lavaredo-area-in-the-dolomites-italy.jpg?s=2048x2048&w=is&k=20&c=1KSDXq-EgrPYlbBqcQvtryZ9-p9RNvRmSebt0EAnvsI=", matched: false},
  {"src":"https://media.istockphoto.com/id/178765752/photo/rural-scenery-and-dramatic-sunset-light.jpg?s=612x612&w=0&k=20&c=RR-5DmDIHBBL-iWnUf1w_gnOD6-FSOzBM_c7J7CQ4kw=", matched: false},
  {"src":"https://media.istockphoto.com/id/172466153/photo/sunset-landscape.jpg?s=2048x2048&w=is&k=20&c=GHakEgWRNynbRcd3z-z6F48-8IqCY1EqIBRA0tNLyj4=", matched: false},
  {"src":"https://media.istockphoto.com/id/489933512/photo/sunflower-evening.jpg?s=2048x2048&w=is&k=20&c=miwhBuKAxLcqiLI1l7iJHSdXlfOc7gOyLs7B9ST7RvY=", matched: false},
  {"src":"https://media.istockphoto.com/id/475822656/photo/sunset.jpg?s=2048x2048&w=is&k=20&c=npHyPtCCkBgnt8xO6NVQ33wegbaUk7yHPfpT_FZrGLU=", matched: false}
]

function App() {
  const[cards,setCards] = useState([])
  const[turns,setTurns] = useState(0)
  const[choiceOne, setChoiceOne] = useState(null)
  const[choiceTwo, setChoiceTwo] = useState(null)
  const[disabled, setDisabled] = useState(false)
 
  
    //shuffle cards
    const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)  
      .map((card) => ({ ...card, id: Math.random()}))
      
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }
      // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
    // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)

      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true}
            } else{
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      } 
    }
  },[choiceOne, choiceTwo])

  console.log(cards)

     //reset choices & increase turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  
  // start a new game automatically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card =>(
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice} 
          flipped={card === choiceOne || card === choiceTwo || card.matched} 
          disabled={disabled}
          />
         ))}
      </div>
      <p>Turns: {turns} </p>
    </div>
  );
}

export default App
