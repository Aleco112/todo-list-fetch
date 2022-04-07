import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component
const Home = () => {
	const [listname, setListName] = useState("");
	const [todolist, setTodoList] = useState([]);
	useEffect(() => {
		var requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/Aleco112",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => setTodoList(result))
			.catch((error) => console.log("error", error));
	}, []);
	console.log(todolist);

	return (
		<>
			<div className="input-group">
				<input
					type="text"
					className="form-control"
					placeholder="Todo-list"
					onChange={(event) => {
						setListName(event.target.value);
					}}
					value={listname}
					onKeyUp={(e) => {
						if (e.key == "Enter" && listname !== "") {
							setTodoList([...todolist, listname]);
							setListName("");
						}
					}}
				/>
				<button
					onClick={() => {
						//check is input is empty
						if (listname !== "") {
							setTodoList([...todolist, listname]);
							setListName("");
						}
					}}
					className="btn btn-outline-secondary"
					type="button">
					Add task
				</button>
			</div>
			<ul>
				{todolist.map((item, index) => {
					return (
						<li key={index}>
							{item.label}
							<button
								onClick={() =>
									setTodoList(
										todolist.filter((item, i) => {
											return index !== i;
										})
									)
								}>
								X
							</button>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default Home;
