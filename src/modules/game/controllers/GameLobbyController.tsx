import * as React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { GameLobbyView } from "../views";
import { gameRoomType } from "../types";
import { socket } from "../../../utils";
import { addGameType } from "../../../types/game";
import { setSocketServer, useSession } from "../../../hooks";
import { app, database } from "../../../../firebase";

export const GameLobbyController: React.FunctionComponent = ({
	gameRoomModel
}: any) => {
	const session = useSession();
	const router = useRouter();
	const [gameRooms, setGameRooms] = React.useState<gameRoomType[] | any[]>(
		[]
	);
	const [roomNumber, setRoomNumber] = React.useState<number>(0);

	const addRoom = () => {
		const data = {
			title: session?.user?.name,
			currentUser: 1,
			masterUserId: session?.user?.id
		};
		setSocketServer("addGameRoom", data);

		console.log("addRoom 클릭 ", roomNumber);
		const roomInfo = {
			owner: "hi" + roomNumber,
			capacity: roomNumber
		};

		setRoomNumber(roomNumber + 1);
	};

	React.useEffect(() => {
		socket.on(
			"addGameRoom",
			({ title, currentUser, masterUserId }: addGameType) => {
				setGameRooms([
					...gameRooms,
					{
						title,
						currentUser,
						masterUserId
					}
				]);
			}
		);
	}, [gameRooms]);

	return (
		<GameLobbyView
			gameRooms={gameRooms}
			addRoom={addRoom}
			session={session}
			router={router}
			signOut={signOut}
		/>
	);
};

type stateType = {
	title: string;
	currentUser: number;
	masterUserId: null | string | number;
};
