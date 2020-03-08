import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [img0, img1, img2, img3, img4, img5, img6],
	};

	constructor(props) {
		super(props);
		this.state = {
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord(),
		};
		this.handleGuess = this.handleGuess.bind(this);
		this.restart = this.restart.bind(this);
	}

	restart() {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord(),
		});
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return (
			this.state.answer
				//split every letter in the word
				.split("")
				//and map each letter to a new array. So will either show underscore or guessed letter
				.map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"))
		);
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(event) {
		//letter saved as value of button pressed
		let ltr = event.target.value;
		this.setState(st => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
			<button
				key={letter}
				value={letter}
				onClick={this.handleGuess}
				//disable button if guessed set contains that letter
				disabled={this.state.guessed.has(letter)}
				className='btn'
			>
				{letter}
			</button>
		));
	}

	/** render: render game */
	render() {
		const gameOver = this.state.nWrong >= this.props.maxWrong;
		const isWinner = this.guessedWord().join("") === this.state.answer;
		const altText = `${this.state.nWrong} out of ${this.props.maxWrong} incorrect guesses made`;
		let gameState = this.generateButtons();
		if (isWinner) gameState = "You Win";
		if (gameOver) gameState = "You loose";

		return (
			<div className='Hangman'>
				<h1> Hangman </h1>
				<img
					src={this.props.images[this.state.nWrong]}
					alt={altText}
					className='Hangman-image'
				/>
				<h2>
					Wrong:
					<span className='badge danger'>
						{this.state.nWrong} /{this.props.maxWrong}
					</span>
				</h2>
				<p className='Hangman-word'>
					{!gameOver ? this.guessedWord() : this.state.answer}
				</p>
				<p className='Hangman-btns'>{gameState}</p>
				<button onClick={this.restart} className='btn-secondary'>
					Restart
				</button>
			</div>
		);
	}
}

export default Hangman;
