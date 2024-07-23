import dinos from "./dino.json" with { type: "json" };

class Human {
	/**
	 * @description Represents a human
	 * @constructor
	 * @param {string} name Name of the human
	 * @param {number} feet Feet of the human
	 * @param {number} inches Inches of the human
	 * @param {number} weight Weight of the human
	 * @param {string} diet Diet of the human
	 */
	constructor(name, feet, inches, weight, diet) {
		this.name = name;
		this.feet = feet;
		this.inches = inches;
		this.weight = weight;
		this.diet = diet;
	}
}

class Dinosaur {
	/**
	 * @description Represents a dinosaur
	 * @constructor
	 * @param {string} species Species of the dinosaur
	 * @param {number} weight Weight of the dinosaur
	 * @param {number} height Height of the dinosaur
	 * @param {string} diet Diet of the dinosaur
	 * @param {string} where Location of the dinosaur
	 * @param {string} when Time when the dinosaur existed
	 * @param {string} fact Fact about the dinosaur
	 */
	constructor({species, weight, height, diet, where, when, fact}) {
		this.species = species;
		this.weight = weight;
		this.height = height;
		this.diet = diet;
		this.where = where;
		this.when = when;
		this.fact = fact;
	}
}

const human = new Human();
let isDataValid = true;

/**
 * @description Prevents user inputs manually in number type fields
 */
(() => {
	const feet = document.getElementById("feet");
	const inches = document.getElementById("inches");
	const weight = document.getElementById("weight");

	feet.addEventListener("keydown", function (event) {
		event.preventDefault();
	});
	inches.addEventListener("keydown", function (event) {
		event.preventDefault();
	});
	weight.addEventListener("keydown", function (event) {
		event.preventDefault();
	});
})();

/**
 * @description Get human data from form
 */
const getHumanData = () => {
	const form = document.getElementById("dino-compare");
	const formData = new FormData(form);

	for (const data of formData.entries()) {
		if (data[1]) {
			human[data[0]] = data[1];
			isDataValid = true;
		} else {
			isDataValid = false;
			return;
		}
	}
};

/**
 * @description Compares human's weight and dino's weight
 * @param {Dinosaur} dinosaur The dinosaur to compare
 * @returns {string} Fact after comparing human's weight and dino's weight
 */
const compareDinoByWeight = (dinosaur) => {
	const dinoWeight = dinosaur.weight;
	const humanWeight = human.weight;

	if (dinoWeight > humanWeight) {
		return `${dinosaur.species} is ${(dinoWeight / humanWeight).toFixed(
			2
		)} times fatter than human.`;
	}

	return `${dinosaur.species} is ${(humanWeight / dinoWeight).toFixed(
		2
	)} times lighter than human.`;
};

/**
 * @description Compares human's height and dino's height
 * @param {Dinosaur} dinosaur The dinosaur to compare
 * @returns {string} Fact after comparing human's height and dino's height
 */
const compareDinoByHeight = (dinosaur) => {
	const dinoHeight = dinosaur.height;
	const humanHeight = human.feet * 12 + human.inches;

	if (dinoHeight > humanHeight) {
		return `${dinosaur.species} is ${(dinoHeight / humanHeight).toFixed(
			2
		)} times taller than human.`;
	}

	return `${dinosaur.species} is ${(humanHeight / dinoHeight).toFixed(
		2
	)} times shorter than human.`;
};

/**
 * @description Compares human's diet and dino's diet
 * @param {Dinosaur} dinosaur The dinosaur to compare
 * @returns {string} Fact after comparing human's diet and dino's diet
 */
const compareDinoByDiet = (dinosaur) => {
	const dinoDiet = dinosaur.diet;
	const humanDiet = human.diet;

	if (dinoDiet !== humanDiet) {
		return `${dinosaur.species} is ${dinoDiet} while human is ${humanDiet}.`;
	}

	return `${dinosaur.species} and human are both ${dinoDiet}.`;
};

/**
 * @description Generates a random integer number in range
 * @param {number} max Max limit of the range
 * @param {number} min Min limit of the range
 * @returns A random integer number
 */
const generateRandomIntInRange = (max, min) => {
	return Math.floor(Math.random() * (max - min) + 1) + min;
};

/**
 * @description Generates tiles for each dino in array
 * @returns Tiles with each title will contain the species, an image, and a fact
 */
const generateTiles = () => {
	const tiles = [];

	for (let index = 0; index < 9; index++) {
		switch (index) {
			case 4:
				tiles.push(human);
				break;
			default: {
				let tempIndex = index;

				if (index > 4) {
					tempIndex = index - 1;
				}

				const dinosaur = new Dinosaur(dinos.Dinos[tempIndex]);

				if (dinosaur.species !== "Pigeon") {
					const randomFactCategory = generateRandomIntInRange(4, 1);

					switch (randomFactCategory) {
						case 1:
							dinosaur.fact = compareDinoByWeight(dinosaur);
							break;
						case 2:
							dinosaur.fact = compareDinoByHeight(dinosaur);
							break;
						case 3:
							dinosaur.fact = compareDinoByDiet(dinosaur);
							break;
					}
				}

				tiles.push(dinosaur);
			}
		}
	}

	return tiles;
};

/**
 * @description Adds tiles to DOM
 */
const renderTiles = () => {
	const tiles = generateTiles();

	const grid = document.getElementById("grid");

	tiles.forEach((tile) => {
		const element = document.createElement("div");

		element.className = "grid-item";
		element.innerHTML = `
		<h3>${tile.species ? tile.species : tile.name}</h3>
		<img alt="${tile.species ? "Dinosaur" : "Human"}'s silhouette" src="images/${
			tile.species ? tile.species.toLowerCase() : "human"
		}.png"/>
		${tile.species ? `<p>${tile.fact}</p>` : ""}
		`;
		grid.appendChild(element);
	});
};

/**
 * @description Removes form from screen
 */
const removeForm = () => {
	const form = document.getElementById("dino-compare");

	document.body.removeChild(form);
};

/**
 * @description Hides form and displays tiles when user clicks button
 */
(() => {
	const compareButton = document.getElementById("btn");

	compareButton.addEventListener("click", function (event) {
		event.preventDefault();
		getHumanData();

		if (isDataValid) {
			removeForm();
			renderTiles();
		} else {
			alert("Please input all required fields");
		}
	});
})();
