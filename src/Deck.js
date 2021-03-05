import React, { Component } from 'react'
import Card from './Card';
import axios from 'axios';

import './Deck.css'

const BASE_API_URL = "https://deckofcardsapi.com/api/deck";

export default class Deck extends Component {
    constructor(props){
        super(props);
        this.state={deck:null, drawn:[]}
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount(){
        let deck = await axios.get(`${BASE_API_URL}/new/shuffle/`);
        this.setState({deck: deck.data})
    }
    async getCard(){
        let id = this.state.deck.deck_id;
        try{
            let cardUrl = `${BASE_API_URL}/${id}/draw/`;
            let cardRes = await axios.get(cardUrl);
            if(!cardRes.data.success){
                throw new Error("No card remaining!")
            }
            let card = cardRes.data.cards[0];
        this.setState(st=>({
            drawn: [
                ...st.drawn, 
                {
                    id: card.code,
                    image: card.image,
                    name: `${card.value} of ${card.suit}`
                }
            ]
        }))
        }catch(err){
            alert(err);
        }
           
    }
    render() {
        const cards= this.state.drawn.map(c=> (
            <Card key={c.id} name={c.name} image={c.image}/>
        ))
        return (
            <div>
                <h1>DECKS</h1>
                <button onClick={this.getCard}>Get Card!</button> 
                <div className="Deck-cardarea">
                {cards}
                </div>
            </div>
        )
    }
}
