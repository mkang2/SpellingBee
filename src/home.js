import React, { useState, useEffect } from "react";

// Helper function to check if a word can be formed from the given letters
const canFormWord = (word, letters) => {
  for (const letter of word) {
    if (!letters.includes(letter)) {
      return false;
    }
  }
  return true;
};

function HomePage() {
  const [letters, setLetters] = useState("");
  const [error, setError] = useState("");
  const [validWords, setValidWords] = useState([]);
  const [generatedWords, setGeneratedWords] = useState([]);

  useEffect(() => {
    // Load valid words from the text file
    fetch("/validWords.txt")
      .then((response) => response.text())
      .then((text) => {
        const words = text.split("\n").map((word) => word.trim().toLowerCase());
        setValidWords(words);
      });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^[a-zA-Z]*$/.test(value) && value.length <= 7) {
      setLetters(value.toLowerCase());
      setError("");
    } else {
      setError("Please enter only letters.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (letters.length === 7) {
      const firstLetter = letters[0];
      const validGeneratedWords = validWords.filter(
        (word) => word.includes(firstLetter) && canFormWord(word, letters)
      );
      setGeneratedWords(validGeneratedWords);
      console.log("Submitted letters:", letters);
    } else {
      setError("Please enter exactly 7 letters.");
    }
  };

  return (
    <div className="w-full h-screen bg-[#f3db24] flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-black text-2xl font-bold mb-4">
          NYT Spelling Bee Solver
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-semibold mb-2"
              htmlFor="letters"
            >
              Note: not all generated words are necessarily valid, still working
              on word list
              <br></br>
              <br></br>
              Enter the 7 letters with the first letter as the required center
              letter
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
          <div className="max-h-60 overflow-y-auto">
            <ul className="list-disc list-inside">
              {generatedWords.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
