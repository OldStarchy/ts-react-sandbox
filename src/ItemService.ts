import wait from './util/wait';

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const randomString = () => {
	const length = 4 + Math.random() * 5;

	const chars = [];
	for (let i = 0; i < length; i++) {
		chars.push(letters[Math.floor(Math.random() * letters.length)]);
	}

	return chars.join('');
};

/**
 * This simulates an ajax api
 */
export default class ItemService {
	private readonly items: { label: string; checked: boolean }[];

	constructor() {
		// Randomly generate some items
		const itemCount = 30;
		const items = [];
		for (let i = 0; i < itemCount; i++) {
			items.push({
				label: randomString(),
				checked: false,
			});
		}

		this.items = items;
	}

	getItemsByPage(page: number, pageSize: number) {
		return wait(1000).then(() => {
			return {
				page: page,
				pageCount: Math.ceil(this.items.length / pageSize),
				items: this.items
					.slice((page - 1) * pageSize, page * pageSize)
					.map(item => ({ ...item })),
				uncheckedItems: this._getUncheckedItemCount(),
			};
		});
	}

	getItemCount() {
		return wait(1000).then(() => this.items.length);
	}

	toggleItem(label: string) {
		return wait(1000).then(() => {
			let success = false;
			let checked = false;

			this.items.forEach(item => {
				if (item.label === label) {
					item.checked = !item.checked;
					checked = item.checked;
					success = true;
				}
			});

			return { success, checked };
		});
	}

	private _getUncheckedItemCount() {
		return this.items.filter(item => !item.checked).length;
	}
	getUncheckedItemCount() {
		return wait(1000).then(() => {
			return this._getUncheckedItemCount();
		});
	}
}
