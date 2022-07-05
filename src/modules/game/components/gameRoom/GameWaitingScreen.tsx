import React from "react";
import { GameWaitingContainer } from "../../styles";
import { userType } from "../../types";
type Props = {
	nextStep: () => void;
	setMaxGame: React.Dispatch<React.SetStateAction<number>>;
	shakeUserList: () => void;
	currentUser: userType[];
};

export const GameWaitingScreen: React.FunctionComponent<Props> = ({
	nextStep,
	setMaxGame,
	shakeUserList,
	currentUser
}) => (
	<GameWaitingContainer>
		<section className="setting-section">
			<button className="game-start_button" onClick={() => nextStep()}>
				게임시작
			</button>
			<section className="number-input-shake-button-section">
				<div className="game-times-div">게임 횟수:</div>
				<form
					className="set-max-game_form"
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						id="max-game"
						type="number"
						// placeholder="게임횟수"
						onChange={(e) => setMaxGame(parseInt(e.target.value))}
					/>
				</form>
				<button
					className="shake-button"
					onClick={() => shakeUserList()}
				>
					Shake
				</button>
			</section>
		</section>
		<section className="user-section">
			<ul>
				{currentUser.map(
					({ userId, name }: userType, userIndex: number) => (
						<li key={`user-${userIndex}`}>{name}</li>
					)
				)}
			</ul>
		</section>
	</GameWaitingContainer>
);
