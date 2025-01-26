import UnoCard from "./UnoCard.component";

customElements.define('uno-card', UnoCard);

declare global {
	interface HTMLElementTagNameMap {
		'uno-card': UnoCard;
	}
}

export { UnoCard };
