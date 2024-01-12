// list taken from https://github.com/nico3333fr/van11y-accessible-modal-tooltip-aria/blob/1a83366c65358222483be849fbb768c31cefaf4d/src/van11y-accessible-modal-tooltip-aria.es6.js#L47
export const FOCUSABLE_ELEMENTS =
	"a[href], area[href], input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

// code adapted from https://gist.github.com/JulienPradet/20dbb7ca06cbd9e2ec499bb2206aab55#file-trapfocus-ts-L1-L44
function trapFocusListener(trapFocusElement: HTMLElement) {
	return function (event: KeyboardEvent) {
		if (event.target === window) {
			return;
		}

		const eventTarget = event.target as unknown as Element;

		if (!trapFocusElement.contains(eventTarget)) {
			return;
		}

		const focusable: NodeListOf<HTMLElement> = trapFocusElement.querySelectorAll(FOCUSABLE_ELEMENTS);
		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		function isNext(event: KeyboardEvent) {
			return event.code === 'Tab' && !event.shiftKey;
		}

		function isPrevious(event: KeyboardEvent) {
			return event.code === 'Tab' && event.shiftKey;
		}

		if (isNext(event) && event.target === last) {
			event.preventDefault();
			first.focus();
		} else if (isPrevious(event) && event.target === first) {
			event.preventDefault();
			last.focus();
		}
	};
}

export const trapFocus = (node: HTMLElement) => {
	const first: HTMLElement | null = node.querySelector(FOCUSABLE_ELEMENTS);
	if (first) first.focus();

	const listener = trapFocusListener(node);
	document.addEventListener('keydown', listener);
	return {
		destroy() {
			document.removeEventListener('keydown', listener);
		}
	};
};

export type Trap = ReturnType<typeof trapFocus>;
