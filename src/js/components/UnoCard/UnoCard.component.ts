import _ from 'lodash';

import card from '../../../img/card.png'

import blue from '../../../img/back/blue.png'
import angel from '../../../img/back/angel.png'
import yellow from '../../../img/back/yellow.png'
import green from '../../../img/back/green.png'
import red from '../../../img/back/red.png'
import deamon from '../../../img/back/deamon.png'

import deny from '../../../img/front/deny.png'
import zero from '../../../img/front/0.png'
import one from '../../../img/front/1.png'
import three from '../../../img/front/3.png'
import two from '../../../img/front/2.png'
import four from '../../../img/front/4.png'

import css from 'bundle-text:./UnoCard.style.css';

type FrontKeys = 'zero' | 'one' | 'two' | 'three' | 'four' | 'deny';
type BackKeys = 'red' | 'green' | 'blue' | 'yellow' | 'angel' | 'deamon';

class UnoCard extends HTMLElement {



	private static backChoices = new Map<BackKeys, string>([
		['red', red],
		['green', green],
		['blue', blue],
		['yellow', yellow],
		['angel', angel],
		['deamon', deamon]
	]);

	private static frontChoices = new Map<FrontKeys, string>([
		['zero', zero],
		['one', one],
		['two', two],
		['three', three],
		['four', four],
		['deny', deny]
	]);

	private cardEl: HTMLImageElement;
	private cardFrontEl: HTMLImageElement;
	private cardBackEl: HTMLImageElement;

	public frontValue: FrontKeys | null = null;
	public backValue: BackKeys | null = null;

	public constructor() {
		super();
		this.attachShadow({ mode: 'open' });

		this.cardEl = document.createElement('img');
		this.cardFrontEl = document.createElement('img');
		this.cardBackEl = document.createElement('img');

		this.cardEl.id = 'card';
		this.cardFrontEl.id = 'card-front';
		this.cardBackEl.id = 'card-back';

		const style = new CSSStyleSheet();
		style.replaceSync(css);
		this.shadowRoot!.adoptedStyleSheets = [style];

		this.updateRandomValue();
	}

	public connectedCallback() {

		this.cardEl.src = card;

		const container = document.createElement('div');
		container.id = 'container';
		container.appendChild(this.cardEl);
		container.appendChild(this.cardFrontEl);
		container.appendChild(this.cardBackEl);
		this.shadowRoot?.appendChild(container);
	}


	public updateRandomValue() {

		this.frontValue = _.sample([...UnoCard.frontChoices.keys()])!;
		this.backValue = _.sample([...UnoCard.backChoices.keys()])!;

		this.cardBackEl.src = UnoCard.backChoices.get(this.backValue)!;
		this.cardFrontEl.src = UnoCard.frontChoices.get(this.frontValue)!;
	}
}

export default UnoCard;