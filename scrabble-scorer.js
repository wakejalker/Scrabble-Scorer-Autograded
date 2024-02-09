// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

// let wordInput;
// let scoreSelect;
// thought maybe declaring these out here would capture it and stop the type error. TypeError: Cannot read properties of undefined (reading 'toLowerCase') at Object.simpleScorer [as scorerFunction]

function initialPrompt() {
   let wordInput = input.question("Let's play some scrabble! Enter a word: ")
   return wordInput;
};

let simpleScorer = function (word) {
   word = word.toLowerCase();
   let simpleScore = word.length;
   return simpleScore;
};


let vowelBonusScorer = function (word) {
   word = word.toLowerCase();
   let vowels = ['a', 'e', 'i', 'o', 'u']; // sometimes y?
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score += 3;
      } else {
         score++;
      }
   }

   return score;
};

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]];
   }
   return score;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   console.log(
   `Please select a scoring algorithim: 

   0 - Simple: One point per character
   1 - Vowel Bonus: Vowels are worth 3 points
   2 - Scrabble: Uses scrabble point system`);

   scoreSelect = input.question(`Enter 0, 1, or 2: `)
   
   while (!(scoreSelect >= 0 && scoreSelect <= 2)) {
      scoreSelect = input.question(`Invalid input. Please enter 0 , 1, or 2: `)
   }

   console.log(`Score for ${word}: ${scoringAlgorithms[scoreSelect].scorerFunction(word)}.`)
   
   // return scoreSelect;
   // return scoringAlgorithms[scoreSelect].scorerFunction;
   return scoringAlgorithms[scoreSelect];

}

function transform(oldPointStructure) {
   let newPointStructure = {};
   
   for (let newPoints in oldPointStructure) {
      for (let letter in oldPointStructure[newPoints]) {
         newPointStructure[oldPointStructure[newPoints][letter].toLowerCase()] = Number(newPoints);
      }
   }
   return newPointStructure;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   // initialPrompt();
   // scorerPrompt();
   // when i try just these i get the type error, but why? 
   
   let word = initialPrompt();
   let selectedAlgorithm = scorerPrompt(word);
   // this worked after i changed scorerPompt a bit. 
  


}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
