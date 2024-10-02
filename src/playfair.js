import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import procedureImage from './images/procedure.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png';
import playfairtheory from './images/playfair_theory.png';
import playfairprocedure from './images/playfair_procedure.png';

// Test part logic
const Playfair = () => {
  const [currentSection, setCurrentSection] = useState('aim');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
    setShowResults(false); // Reset quiz results when changing sections
  };

  const handleAnswerChange = (questionId, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionId]: answer });
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(question => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary advantage of the Playfair Cipher over simple substitution ciphers?",
      options: [
        { id: 'a', text: 'It uses a larger key space' },
        { id: 'b', text: 'It uses digraphs instead of single letters' },
        { id: 'c', text: 'It is resistant to frequency analysis' },
        { id: 'd', text: 'It is easier to implement' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 2,
      question: "How does the Playfair Cipher handle repeated letters in the plaintext?",
      options: [
        { id: 'a', text: 'It replaces each repeated letter with a unique/special symbol' },
        { id: 'b', text: 'It combines repeated letters into a single digraph' },
        { id: 'c', text: 'It separates repeated letters with a filler character'},
        { id: 'd', text: 'It encrypts each repeated letter individually' },
      ],
      correctAnswer: 'c'
    },
    {
      id: 3,
      question: "In the Playfair Cipher, which characters are typically represented by the same cell in the encryption matrix?",
      options: [
        { id: 'a', text: 'I and J' },
        { id: 'b', text: 'U and V' },
        { id: 'c', text: 'X and Y' },
        { id: 'd', text: 'E and F' },
      ],
      correctAnswer: 'a'
    }
  ];

  const [key, setKey] = useState('');
  const [plainText, setPlainText] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const generateKeySquare = (keyword) => {
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // Ignoring 'J'
    const key = keyword.toUpperCase().replace(/J/g, "I");
    const keySet = new Set(key);
    const remainingChars = alphabet.split("").filter(char => !keySet.has(char));
    return key + remainingChars.join("");
  };

  const getDigraphs = (text) => {
    const digraphs = [];
    let i = 0;
    while (i < text.length) {
      let first = text[i];
      let second = i + 1 < text.length ? text[i + 1] : 'X'; // Pad with 'X' if odd length
      if (first === second) {
        second = 'X';
        i--;
      }
      digraphs.push([first, second]);
      i += 2;
    }
    return digraphs;
  };

  const encryptText = () => {
    const cleanedKey = key.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const cleanedText = plainText.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const keySquare = generateKeySquare(cleanedKey);
    const digraphs = getDigraphs(cleanedText);
    let encryptedText = "";
    for (const [first, second] of digraphs) {
      const [row1, col1] = getCharPosition(keySquare, first);
      const [row2, col2] = getCharPosition(keySquare, second);
      let encryptedPair;
      if (row1 === row2) {
        encryptedPair = keySquare[row1 * 5 + (col1 + 1) % 5] + keySquare[row2 * 5 + (col2 + 1) % 5];
      } else if (col1 === col2) {
        encryptedPair = keySquare[((row1 + 1) % 5) * 5 + col1] + keySquare[((row2 + 1) % 5) * 5 + col2];
      } else {
        encryptedPair = keySquare[row1 * 5 + col2] + keySquare[row2 * 5 + col1];
      }
      encryptedText += encryptedPair;
    }
    setCipherText(encryptedText);
  };

  const decryptText = () => {
    const cleanedKey = key.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const cleanedText = cipherText.replace(/[^a-zA-Z]/g, "").toUpperCase();
    const keySquare = generateKeySquare(cleanedKey);
    const digraphs = getDigraphs(cleanedText);
    let decryptedText = "";
    for (const [first, second] of digraphs) {
      const [row1, col1] = getCharPosition(keySquare, first);
      const [row2, col2] = getCharPosition(keySquare, second);
      let decryptedPair;
      if (row1 === row2) {
        decryptedPair = keySquare[row1 * 5 + (col1 - 1 + 5) % 5] + keySquare[row2 * 5 + (col2 - 1 + 5) % 5];
      } else if (col1 === col2) {
        decryptedPair = keySquare[((row1 - 1 + 5) % 5) * 5 + col1] + keySquare[((row2 - 1 + 5) % 5) * 5 + col2];
      } else {
        decryptedPair = keySquare[row1 * 5 + col2] + keySquare[row2 * 5 + col1];
      }
      decryptedText += decryptedPair;
    }
    setDecryptedText(decryptedText);
  };
  
  

  const getCharPosition = (keySquare, char) => {
    const index = keySquare.indexOf(char);
    const row = Math.floor(index / 5);
    const col = index % 5;
    return [row, col];
  };

  
  // Main body
  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>Playfair Cipher Virtual Lab</b>
        </div>

        <div id="nav-placeholder">
          <ul>
            <li><Link to="#aim" onClick={() => handleSectionChange('aim')}><img src={aimImage} alt="Aim" height="70px" width="80px"/>Aim</Link></li>
            <li><Link to="#theory" onClick={() => handleSectionChange('theory')}><img src={theoryImage} alt="Theory" height="70px" width="70px"/>Theory</Link></li>
            <li><Link to="#procedure" onClick={() => handleSectionChange('procedure')}><img src={procedureImage} alt="Procedure" height="70px" width="70px"/>Procedure</Link></li>
            <li><Link to="#simulation" onClick={() => handleSectionChange('simulation')}><img src={simulationImage} alt="Simulation" height="70px" width="70px"/>Simulation</Link></li>
            <li><Link to="#test" onClick={() => handleSectionChange('test')}><img src={testImage} alt="Test" height="70px" width="70px"/>Test</Link></li>
            <li><Link to="#references" onClick={() => handleSectionChange('references')}><img src={referencesImage} alt="References" height="70px" width="70px"/>References</Link></li>
          </ul>
        </div>

        <div id="vlab-content">
          <div id="aim" style={{ display: currentSection === 'aim' ? 'block' : 'none' }}>
            <h3>Aim:</h3>
            <p>The aim of this virtual lab is to introduce the Playfair Cipher and demonstrate its encryption and decryption processes.</p>
            <h3>Broad Goal of the experiment:</h3>
            <p>The broad goal of this experiment is to provide students with hands-on experience in understanding and implementing the Playfair Cipher. By the end of this lab, students should be able to:</p>
            <ul>
              <li>Understand the principles behind the Playfair Cipher.</li>
              <li>Generate a Playfair key using a given keyword or phrase.</li>
              <li>Encrypt plaintext using the Playfair Cipher.</li>
              <li>Decrypt ciphertext using the Playfair Cipher.</li>
              <li>Analyze the strengths and weaknesses of the Playfair Cipher.</li>
            </ul>
          </div>

          <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
  <h3>Theory:</h3>
  <p>The Playfair Cipher is a classical symmetric encryption technique that was widely used in the early 20th century. It employs a 5x5 grid of letters to encrypt plaintext. Unlike traditional ciphers that operate on single letters, the Playfair Cipher encrypts pairs of letters, also known as digraphs.</p>
  <p>The Playfair Cipher was the first practical digraph 'Substitution Cipher'. It was invented in 1854 by Charles Wheatstone but gained prominence after Lord Playfair promoted its use.</p>
  <p><b>The key components of the Playfair Cipher include:</b></p>
  <ul>
    <li><b>Keyphrase generation:</b> The encryption key is generated from a given keyword or phrase. This keyphrase determines the arrangement of letters in the Playfair grid.</li>
    <li><b>Matrix construction:</b> Using the keyphrase, a 5x5 grid (matrix) of letters is constructed. This grid forms the basis for encryption and decryption.</li>
    <li><b>Encryption process:</b> To encrypt plaintext, the message is broken into into pairs of two letters (digraphs). Each digraph is then encrypted using the rules defined by the Playfair grid. Common rules include letter substitution and movement within the grid.</li>
    <li><b>Decryption process:</b> Decryption is the reverse of encryption. Ciphertext digraphs are decrypted back into plaintext using the same Playfair grid and rules.</li>
  </ul>
  <img src={playfairtheory} alt="Playfair Theory" />
  <p>Understanding these key components is essential for implementing and using the Playfair Cipher effectively.</p>
</div>

<div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
  <h3>Procedure:</h3>
  <p>To implement the Playfair Cipher algorithm, follow these steps:</p>
  <ol>
    <li>Remove any punctuations or spaces from the plaintext and pair the remaining letters in digraphs (e.g., 'hello' becomes 'he ll o').</li>
    <li>Remove duplicate letters in each pair by adding a bogus letter 'x' and carry forwarding pairs (e.g., 'he ll o' becomes 'he lx lo').</li>
    <li>Arrange the plaintext pairs into a 5x5 matrix, filling it horizontally.</li>
    <li>Construct a key matrix by arranging the keyphrase into a 5x5 matrix and filling the remaining cells with the alphabet in order.</li>
    <br></br>
    <img src={playfairprocedure} alt="Playfair Procedure" />
    <br></br>
    <li>Encrypt the plaintext by splitting it into pairs of two letters (digraphs) and applying the following encryption rules:</li>
      <ul>
        <li>If both letters are in the same column, replace them with the letters below each one.</li>
        <li>If both letters are in the same row, replace them with the letters to the right of each one.</li>
        <li>If the letters are in different rows and columns, form a rectangle with the two letters and replace them with the intersection of letters of the rectangle.</li>
        <li>Arrange the resulting letters of each pair in a matrix.</li>
        <li>Read the matrix horizontally to obtain the Encrypted CipherText.</li>
      </ul>
     <br></br> 
    <li>Do similar Opposite Steps for Decryption and Arrange CipherText into (5X5) matrix</li>
    <li>To decrypt the ciphertext, split it into digraphs and apply the following decryption rules:</li>
      <ul>
        <li>If both letters are in the same column, replace them with the letters above each one.</li>
        <li>If both letters are in the same row, replace them with the letters to the left of each one.</li>
        <li>If the letters are in different rows and columns, form a rectangle with the two letters and replace them with the intersection of letters of the rectangle.</li>
        <li>Arrange the resulting letters of each pair in a matrix.</li>
        <li>Read the matrix horizontally to obtain the Decrypted PlainText.</li>
      </ul>
  </ol>
</div>



<div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
  <h3>Simulation:</h3>
  <p>In this simulation, you will interactively encrypt and decrypt messages using the Playfair Cipher algorithm. Follow the instructions provided to perform the encryption and decryption steps.</p>
  <div style={{ marginBottom: '10px' }}>
    <label htmlFor="key" style={{ marginRight: '10px' }}>Enter Key:</label>
    <input 
      type="text" 
      id="key" 
      value={key} 
      onChange={(e) => setKey(e.target.value)} 
      placeholder="Enter key"
      style={{ marginRight: '10px' }}
    />
  </div>
  <div style={{ marginBottom: '10px' }}>
    <label htmlFor="plaintext" style={{ marginRight: '10px' }}>Enter Plain Text:</label>
    <input 
      type="text" 
      id="plaintext" 
      value={plainText} 
      onChange={(e) => setPlainText(e.target.value)} 
      placeholder="Enter plain text"
      style={{ marginRight: '10px' }}
    />
  </div>
  <div style={{ marginBottom: '10px' }}>
    <button onClick={encryptText} style={{ marginRight: '10px', padding: '5px 10px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Encrypt</button>
    <button onClick={decryptText} style={{ padding: '5px 10px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Decrypt</button>
  </div>
  {cipherText && (
    <div style={{ marginBottom: '10px' }}>
      <label htmlFor="ciphertext" style={{ marginRight: '10px' }}>Cipher Text:</label>
      <input 
        type="text" 
        id="ciphertext" 
        value={cipherText} 
        readOnly
        style={{ marginRight: '10px' }}
      />
    </div>
  )}
  {decryptedText && (
    <div>
      <label htmlFor="decryptedtext" style={{ marginRight: '10px' }}>Decrypted Text:</label>
      <input 
        type="text" 
        id="decryptedtext" 
        value={decryptedText} 
        readOnly
        style={{ marginRight: '10px' }}
      />
    </div>
  )}
  <br></br><br></br><br></br><br></br>
</div>


        <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
          <p>Test your understanding of the Playfair Cipher algorithm by answering the following multiple-choice questions:</p>
          <ol>
            {quizQuestions.map((question) => (
              <li key={question.id}>
                {question.question}
                <div>
                  {question.options.map((option) => (
                    <div key={option.id}>
                      <input
                        type="radio"
                        id={option.id}
                        name={`question_${question.id}`}
                        value={option.id}
                        onChange={() => handleAnswerChange(question.id, option.id)}
                      />
                      <label htmlFor={option.id}>{option.id}. {option.text}</label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button style={{ backgroundColor: 'blue', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '18px' }} onClick={handleSubmitQuiz}>Submit Test</button>
        </div>

        {showResults && (
          <div>
            <h3>Results:</h3>
            <p>Score: {calculateScore()} / {quizQuestions.length}</p>
            <ol>
              {quizQuestions.map((question) => (
                <li key={question.id} style={{ color: quizAnswers[question.id] === question.correctAnswer ? 'lightgreen' : 'red' }}>
                  {question.question} - {quizAnswers[question.id] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>

      <div id="references" style={{ display: currentSection === 'references' ? 'block' : 'none' }}>
        <h3>References:</h3>
        <h4>Book Referred</h4>
        <ul>
          <li>"Cryptography and Network Security: Principles and Practice" by William Stallings</li>
          <li>"Applied Cryptography" by Bruce Schneier</li>
          <li>"Playfair Cipher" A book chapter published in 1997 by MIT Press Direct</li>
        </ul>
        <h4>Website Referred</h4>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Playfair_cipher">https://en.wikipedia.org/wiki/Playfair_cipher</a></li>
          <li><a href="https://youtu.be/UURjVI5cw4g?si=xDYFV5fiOUAr5X12">https://youtu.be/UURjVI5cw4g?si=xDYFV5fiOUAr5X12</a></li>
          <li><a href="https://www.geeksforgeeks.org/playfair-cipher-with-examples/">https://www.geeksforgeeks.org/playfair-cipher-with-examples/</a></li>
        </ul>
      </div>
    </div>

    <footer className="footer">
      <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
    </footer>
  </div>
);
}

export default Playfair;