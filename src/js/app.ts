import _ from 'lodash';
import confetti from 'canvas-confetti'
import { UnoCard } from './components/UnoCard';
import { waitNextFrame } from './utils'

import * as victorySound from '../sound/victory/*.mp3'
import * as failSound from '../sound/fail/*.mp3'


const rollContainer = document.querySelector('#roll-container')!;


async function roll() {

	rollContainer.innerHTML = '';
	rollContainer.scrollTop = 0;	

	for (let i = 0; i < 30; i++) {
		rollContainer.append(new UnoCard());
	}

	const lastCard = rollContainer.lastElementChild as UnoCard;

	let max = rollContainer.scrollHeight - rollContainer.clientHeight;

	let scrollSpeed = 75;
	while (rollContainer.scrollTop < max) {
		rollContainer.scrollTop += scrollSpeed * ((1 - (rollContainer.scrollTop / rollContainer.scrollHeight)) + 0.05);
		await waitNextFrame();

	}

	if (lastCard.backValue === 'angel' && lastCard.frontValue === 'zero') {
		confetti({
			particleCount: 300,
			spread: 90,
			origin: { y: 0.9 }
		});
		new Audio(_.sample(victorySound)!).play();
	}


	if (lastCard.backValue === 'deamon' && lastCard.frontValue === 'four') {
		new Audio(_.sample(failSound)!).play();

	}


}


document.addEventListener('click', () => {
	roll();
});
