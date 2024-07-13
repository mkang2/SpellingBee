import React, { useState, useEffect } from "react";

// Helper function to generate all permutations of a given string with repeated letters
const getPermutations = (letters) => {
  let results = [];

  const helper = (path, options) => {
    if (path.length > 0) {
      results.push(path);
    }
    for (let i = 0; i < options.length; i++) {
      helper(
        path + options[i],
        options.slice(0, i).concat(options.slice(i + 1))
      );
    }
  };

  helper("", letters.split(""));
  return Array.from(new Set(results)); // Remove duplicates
};

function HomePage() {
  const [letters, setLetters] = useState("");
  const [error, setError] = useState("");
  const [validWords, setValidWords] = useState([]);
  const [generatedWords, setGeneratedWords] = useState([]);

  useEffect(() => {
    // Load valid words from the text file
    fetch("/validWords2.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text.split("\n").map((word) => word.trim());
        setValidWords(words);
      });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= 7) {
      setLetters(value);
      setError(""); // Clear error message on change
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (letters.length === 7) {
      const permutations = getPermutations(letters);
      const validGeneratedWords = permutations.filter((word) =>
        validWords.includes(word)
      );
      setGeneratedWords(validGeneratedWords);
      console.log("Submitted letters:", letters);
    } else {
      setError("Please enter exactly 7 letters.");
    }
  };

  return (
    <div className="w-full h-screen bg-yellow-400 flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-black text-2xl font-bold mb-4">
          Spelling Bee Solver
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="letters"
            >
              Enter 7 Letters
            </label>
            <input
              type="text"
              id="letters"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={letters}
              onChange={handleChange}
              maxLength="7"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <h2 className="text-black text-xl font-bold mb-2">
            Generated Words:
          </h2>
          <ul className="list-disc list-inside">
            {generatedWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
