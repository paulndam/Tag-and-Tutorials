/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MainPage.css";
import "font-awesome/css/font-awesome.min.css";

const MainPage = (props) => {
	const [title, settitle] = useState("");
	const [author, setauthor] = useState("");

	const [allTutorials, setAllTutorials] = useState([]);
	const [name, setname] = useState("");
	const [slug, setslug] = useState("");

	const Create = (e) => {
		e.preventDefault();

		const newTutorial = { title, author };
		console.log(1, newTutorial);
		settitle("");
		setauthor("");

		axios
			.post("http://localhost:5000/api/Tutorial", newTutorial)
			.then((res) => {
				console.log(5, res.data);
			})
			.catch((error) => console.log(error));
	};

	const getAllTutorials = () => {
		axios
			.get("http://localhost:5000/api/getAllTuto")
			.then((res) => {
				console.log(res);
				setAllTutorials(res.data);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getAllTutorials();
	}, []);

	const addTags = (e, _id) => {
		e.preventDefault();

		setname("");
		setslug("");

		axios
			.put(`http://localhost:5000/api/addingTagToTutorial/${_id}`, {
				name: name,
				slug: slug,
			})
			.then((res) => {
				console.log(res);
				getAllTutorials();
			})
			.catch((error) => console.log(error));
	};

	const removeTag = (e, _id) => {
		console.log(`${_id}`);

		axios
			.delete(`http://localhost:5000/api/deleteAddedTag/${_id}`)
			.then((res) => {
				console.log(res);
				getAllTutorials();
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="container">
			<div className="navbar">
				<a href="#" className="Logo">
					Hello
				</a>
				<ul className="nav">
					<li>
						<a href="#home">Home</a>
					</li>
					<li>
						<a href="#cardia">Add Tag</a>
					</li>
					<li>
						<a href="#schedule">Add Tutorial</a>
					</li>
				</ul>
			</div>

			<div className="home-area" id="home" />

			<div className="schedule-area" id="schedule">
				<div className="text-part">
					<h1>Add a Tutorial</h1>
					<form onSubmit={Create}>
						<div className="inputBox">
							<input
								type="text"
								onChange={(e) => settitle(e.target.value)}
								value={title}
							/>
							<span>Title</span>
						</div>
						<div className="inputBox">
							<input
								type="text"
								onChange={(e) => setauthor(e.target.value)}
								value={author}
							/>
							<span>Author</span>
						</div>
						<div className="inputBox">
							<input type="submit" value="Add Tutorial" />
							<span></span>
						</div>
					</form>
				</div>

				<div>
					{allTutorials.map((tutorials) => (
						<div className="card" key={tutorials._id}>
							<div className="card-image">
								<img className="picturx" />
							</div>
							<div className="card-text">
								<span class="comment">The Memes</span>
								<p> Author :{tutorials.author} </p>
								<p> Title : {tutorials.title}</p>

								<h3>Tag this Tutorial</h3>

								<div>
									<form onSubmit={(e) => addTags(e, tutorials._id)}>
										<div className="inputBox">
											<input
												type="text"
												onChange={(e) => setname(e.target.value)}
											/>
											<span>Name</span>
										</div>
										<div className="inputBox">
											<input
												type="text"
												onChange={(e) => setslug(e.target.value)}
											/>
											<span>Slug</span>
										</div>
										<div className="inputBox">
											<input type="submit" value="Add a Tag" />
											<span></span>
										</div>
									</form>

									<div>
										{tutorials.tags.map((tag) => (
											<div key={tag._id}>
												<p>Name : {tag.name}</p>
												<p>Slug : {tag.slug}</p>

												<div className="delete">
													<input
														type="submit"
														value="Delete Tag"
														onClick={(e) => removeTag(e, tutorials._id)}
													/>
													<span></span>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
				<footer>
					<span>
						Created By <a href="#">Paul Ndam</a> |{" "}
						<span class="far fa-copyright"> 2020 All Rights Reserved.</span>{" "}
					</span>
				</footer>
			</div>
		</div>
	);
};

export default MainPage;
