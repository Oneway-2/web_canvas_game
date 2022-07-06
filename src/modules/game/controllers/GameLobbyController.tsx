import * as React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { GameLobbyView } from "../views";
import { gameRoomType } from "../types";
import { socket } from "../../../utils";
import { addGameType } from "../../../types/game";
import { setSocketServer, useSession } from "../../../hooks";
import { storeDatabase, realtimeDatabase } from "../../../../firebase";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { write } from "fs";

export const GameLobbyController: React.FunctionComponent = ({
	gameRoomModel
}: any) => {
	const session = useSession();
	const router = useRouter();
	const [gameRooms, setGameRooms] = React.useState<gameRoomType[] | any[]>(
		[]
	);
	const [roomNumber, setRoomNumber] = React.useState<number>(0);
	const storeDatabaseRef = collection(storeDatabase, "users");

	function writeUserData(
		userId: string,
		name: string,
		email: string,
		imageURL: string
	) {
		const db = getDatabase();
		set(ref(db, "users/" + userId), {
			username: name,
			email: email,
			picture: imageURL
		});
	}

	const addRoom = async () => {
		const data = {
			title: session?.user?.name,
			currentUser: 1,
			masterUserId: session?.user?.id
		};
		setSocketServer("addGameRoom", data);

		// 방 번호 출력 테스트
		console.log("방 번호는 : ", roomNumber);

		// // fireStore에 입력하는 테스트
		// try {
		// 	const docRef = await addDoc(storeDatabaseRef, {
		// 		mush: false,
		// 		name: "Lovelace"
		// 	});
		// 	console.log("Document written with ID: ", docRef.id);
		// } catch (e) {
		// 	console.error("Error adding document: ", e);
		// }

		// // fireStore에서 불러오는 테스트
		// const querySnapshot = await getDocs(storeDatabaseRef);
		// querySnapshot.forEach((doc) => {
		// 	console.log(`${doc.id} => ${doc.data()}`);
		// });

		// realtime Database에 입력하는 테스트
		writeUserData("kiri0224", "hankil", "nuclear0789", "123098");
		writeUserData("kiri0224", "mush", "hackboom", "98983434");
		console.log("realtime db에 입력완료");

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
