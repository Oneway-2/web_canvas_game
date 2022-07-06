export type gameRoomType = {
	id?: string;
	roomTitle: string;
	maxUser: number;
	currentUser: number;
	masterUserId: number | string;
};

export type newGameRoomType = {
	ownerId: number | string;
	roomNumber: number;
	currentUser: number;
};

export type chatType = {
	message: string;
	name: string;
};

export type keyWordType = {
	index: string;
	keyword: string;
};
export type userType = {
	userId: string;
	name: string;
};
