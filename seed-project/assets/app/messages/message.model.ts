export class Message {
	constructor(
		private _content: string,
		private _username: string,
		private _messageId?: string,
		private _userId?: string) { }

		get content(): string {
			return this._content;
		}

		set content(content: string) {
			this._content = content;
		}

		get username(): string {
			return this._username;
		}

		get messageId(): string {
			return this._messageId;
		}

		get userId(): string {
			return this._userId;
		}

		/**
		 * To JSON object
		 */
		toObject() {
			return {
				'content': this.content,
				'username': this.username,
				'messageId': this.messageId,
				'userId': this.userId
			}
		}

}
