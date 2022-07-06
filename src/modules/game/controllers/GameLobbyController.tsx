import * as React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

import { GameLobbyView } from "../views";
import { gameRoomType, newGameRoomType } from "../types";
import { socket } from "../../../utils";
import { addGameType } from "../../../types/game";
import { setSocketServer, useSession } from "../../../hooks";

import { storeDatabase, realtimeDatabase } from "../../../../firebase";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import {
	getDatabase,
	onValue,
	ref,
	set,
	push,
	remove,
	child
} from "firebase/database";

import { write } from "fs";

export const GameLobbyController: React.FunctionComponent = ({
	gameRoomModel
}: any) => {
	const session = useSession();
	const router = useRouter();
	// const [roomNumber, setRoomNumber] = React.useState<number>(0);
	const [gameRooms, setGameRooms] = React.useState<gameRoomType[] | any[]>(
		[]
	);
	const [newGameRooms, setNewGameRooms] = React.useState<
		newGameRoomType[] | any[]
	>([]);
	const storeDatabaseRef = collection(storeDatabase, "users");

	// function writeUserData(
	// 	userId: string,
	// 	name: string,
	// 	email: string,
	// 	imageURL: string
	// ) {
	// 	set(ref(realtimeDatabase, "users/" + userId), {
	// 		username: name,
	// 		email: email,
	// 		picture: imageURL
	// 	});
	// }

	const sessionName = session?.user?.name;
	const sessionId = session?.user?.id;

	const addRoom = async () => {
		// // Socket을 이용한 방생성
		// const data = {
		// 	title: sessionName,
		// 	currentUser: 1,
		// 	masterUserId: sessionId
		// };
		// setSocketServer("addGameRoom", data);

		await set(ref(realtimeDatabase, "rooms/" + sessionId), {
			ownerName: sessionName,
			ownerId: sessionId,
			currentUser: 1
		})
			.then(() => {
				console.log(sessionName + "님의 방생성 완료");
				// setRoomNumber(roomNumber + 1);
			})
			.catch((error) => {
				console.log("에러 발생 : ", error);
			});

		const readRef = ref(realtimeDatabase, "rooms");
		await onValue(readRef, (s) => {
			const data = s.val();
			console.log("불러온 데이터는", data);
			console.log("newGameRooms는? ", newGameRooms);
			// console.log(data[Object.keys(data)[0]].id);
			// console.log(data[Object.keys(data)[1]]);
		});

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

		// // realtime Database에 입력하는 테스트
		// set(ref(realtimeDatabase, "users/"), {
		// 	username: "이게 이름일까?",
		// 	email: "이게 이메일이다",
		// 	roomNumber: roomNumber
		// });
		// console.log("realtime db에 입력완료");

		// // realtime Database에서 불러오는 테스트
		// const readRef = ref(realtimeDatabase, "users/" + "email");
		// onValue(readRef, (snapShot) => {
		// 	const data = snapShot.val();
		// 	console.log("읽어들인거 : ", data);
		// 	console.log("무야호");
		// });

		// // realtime Database 삭제 테스트
		// const deleteRef = ref(realtimeDatabase, "users/");
		// remove(deleteRef);

		// const deleteRef = ref(realtimeDatabase, "users/" + "email");
		// remove(deleteRef);
	};

	// React.useEffect(() => {
	// 	console.log("useEffect : gameRooms:", gameRooms);
	// 	socket.on(
	// 		"addGameRoom",
	// 		({ title, currentUser, masterUserId }: addGameType) => {
	// 			setGameRooms([
	// 				...gameRooms,
	// 				{
	// 					title,
	// 					currentUser,
	// 					masterUserId
	// 				}
	// 			]);
	// 		}
	// 	);
	// }, [gameRooms]);

	React.useEffect(() => {
		async function asdf() {
			const readRef = ref(realtimeDatabase, "rooms/");
			let data;
			await onValue(readRef, (snapShot) => {
				data = snapShot.val();
				setNewGameRooms(data);
			});
			console.log("useeffect 현재 담긴 data는", data);
			asdf();
		}
	}, []);

	return (
		<GameLobbyView
			gameRooms={gameRooms}
			newGameRooms={newGameRooms}
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
