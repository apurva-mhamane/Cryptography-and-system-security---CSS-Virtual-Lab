import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import procedureImage from './images/procedure.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png';
import monopolyImage from './images/Mono_Poly_img.png';

const MonoalphabeticCipher = () => {
  const [currentSection, setCurrentSection] = useState('aim');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [inputText, setInputText] = useState('');
  const [monoalphabeticOutput, setMonoalphabeticOutput] = useState('');
  const [polyalphabeticOutput, setPolyalphabeticOutput] = useState('');
  const [decryptedOutput, setDecryptedOutput] = useState('');

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
    setShowResults(false);
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

  const encryptMonoalphabetic = (text) => {
    // Implementation of monoalphabetic encryption logic
    // Replace each letter with its corresponding letter from the key
    // For simplicity, let's assume a simple key mapping
    // For example, 'a' maps to 'q', 'b' maps to 'r', and so on
    const key = {
      a: 'q', b: 'r', c: 's', d: 't', e: 'u', f: 'v', g: 'w', h: 'x', i: 'y', j: 'z',
      k: 'a', l: 'b', m: 'c', n: 'd', o: 'e', p: 'f', q: 'g', r: 'h', s: 'i', t: 'j',
      u: 'k', v: 'l', w: 'm', x: 'n', y: 'o', z: 'p',
    };
    return text.split('').map(char => key[char] || char).join('');
  };

  const decryptMonoalphabetic = (text) => {
    // Reverse the key mapping used for encryption
    const key = {
      q: 'a', r: 'b', s: 'c', t: 'd', u: 'e', v: 'f', w: 'g', x: 'h', y: 'i', z: 'j',
      a: 'k', b: 'l', c: 'm', d: 'n', e: 'o', f: 'p', g: 'q', h: 'r', i: 's', j: 't',
      k: 'u', l: 'v', m: 'w', n: 'x', o: 'y', p: 'z',
    };
    return text.split('').map(char => key[char] || char).join('');
  };

  const encryptPolyalphabetic = (text) => {
    // Implementation of polyalphabetic encryption logic
    // Replace each letter using a different key based on its position
    // For simplicity, let's assume a basic rotation cipher with fixed key lengths
    const key1 = 'abcde'; // Example key 1
    const key2 = 'fghij'; // Example key 2
    let encryptedText = '';
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const key = i % 2 === 0 ? key1 : key2; // Alternating keys
      const index = (key.indexOf(char.toLowerCase()) + 1) % key.length; // Shift by one
      encryptedText += key[index] || char;
    }
    return encryptedText;
  };

  const handleEncrypt = () => {
    const monoalphabeticResult = encryptMonoalphabetic(inputText);
    const polyalphabeticResult = encryptPolyalphabetic(inputText);
    setMonoalphabeticOutput(monoalphabeticResult);
    setPolyalphabeticOutput(polyalphabeticResult);
  };

  const handleDecrypt = () => {
    const decryptedText = decryptMonoalphabetic(monoalphabeticOutput);
    setDecryptedOutput(decryptedText);
  };

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary advantage of the Monoalphabetic Cipher?",
      options: [
        { id: 'a', text: 'It uses a larger key space' },
        { id: 'b', text: 'It is resistant to frequency analysis' },
        { id: 'c', text: 'It substitutes each letter with a unique letter' },
        { id: 'd', text: 'It uses multiple substitution alphabets' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 2,
      question: "What is the primary advantage of the Polyalphabetic Cipher?",
      options: [
        { id: 'a', text: 'It uses a larger key space' },
        { id: 'b', text: 'It is resistant to frequency analysis' },
        { id: 'c', text: 'It substitutes each letter with a unique letter' },
        { id: 'd', text: 'It uses multiple substitution alphabets' }
      ],
      correctAnswer: 'a'
    },
    {
      "id": 3,
      "question": "What distinguishes polyalphabetic ciphers from monoalphabetic ciphers?",
      "options": [
      { "id": "a", "text": "Fixed substitution for each letter." },
      { "id": "b", "text": "Different key for each letter of plaintext." },
      { "id": "c", "text": "Multiple substitution alphabets." },
      { "id": "d", "text": "Unique letter substitution." }
      ],
      "correctAnswer": "c"
      }
  ];

  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>Monoalphabetic Cipher Virtual Lab</b>
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
            <p>The aim of this virtual lab is to introduce the Monoalphabetic Cipher and Polyalphabetic Cipher and demonstrate their encryption and decryption processes.</p>
            <h3>Broad Goal of the experiment:</h3>
            <p>The broad goal of this experiment is to provide students with hands-on experience in understanding and implementing both the Monoalphabetic Cipher and Polyalphabetic Cipher. By the end of this lab, students should be able to:</p>
            <ul>
              <li>Understand the principles behind both ciphers.</li>
              <li>Generate keys for both ciphers.</li>
              <li>Encrypt plaintext using both ciphers.</li>
              <li>Decrypt ciphertext using both ciphers.</li>
              <li>Analyze the strengths and weaknesses of both ciphers.</li>
            </ul>
          </div>

          <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
            <h3>Theory:</h3>
            <p> <b>Monoalphabetic Cipher:</b> In this cipher, each letter in the plaintext is consistently replaced with the same corresponding letter from the key throughout the entire message. For example, if 'A' is replaced with 'M' in the key, every occurrence of 'A' in the plaintext will be replaced with 'M' in the ciphertext. This makes monoalphabetic ciphers vulnerable to frequency analysis attacks since the frequency distribution of letters in the plaintext is preserved in the ciphertext.</p>
            <p> <b>Polyalphabetic Cipher:</b> The Polyalphabetic Cipher introduces the concept of using multiple alphabets or keys during the encryption process. This means that different letters in the plaintext might be encrypted using different alphabets, making frequency analysis more difficult. One of the most famous examples of a polyalphabetic cipher is the Vigenère cipher, where a keyword is repeated to create multiple alphabets, and each letter of the plaintext is encrypted using a different alphabet determined by the corresponding letter of the keyword.</p>
            <img src={monopolyImage} alt="Mono Poly" />
            <p>Understanding these components is crucial for implementing and using both the Monoalphabetic Cipher and Polyalphabetic Cipher effectively.</p> 
          </div>
          

          <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
            <h3>Procedure:</h3>
            <p>To implement the Monoalphabetic Cipher algorithm, follow these steps:</p>
            <ol>
              <li>Generate a key by mapping each letter of the alphabet to another unique letter.</li>
              <li>Encrypt the plaintext by substituting each letter with the corresponding letter from the key.</li>
              <li>Decrypt the ciphertext by substituting each letter with its corresponding letter from the inverse key.</li>
            </ol>

            <p>To implement the Polyalphabetic Cipher algorithm, follow these steps:</p>
            <ol>
              <li>Generate multiple keys, typically in the form of vigènere tables or squares.</li>
              <li>Encrypt the plaintext by using different keys for each letter based on its position.</li>
              <li>Decrypt the ciphertext using knowledge of the keys and the encryption algorithm.</li>
            </ol>
          </div>

          <div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
            <h3>Simulation:</h3>
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="inputText">Enter Text:</label>
              <input
                type="text"
                id="inputText"
                placeholder="Enter text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                style={{ marginLeft: '10px', padding: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <button onClick={handleEncrypt} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 20px', borderRadius: '5px', fontSize: '16px', marginRight: '10px' }}>Encrypt</button>
              <button onClick={handleDecrypt} style={{ backgroundColor: 'blue', color: 'white', padding: '8px 20px', borderRadius: '5px', fontSize: '16px' }}>Decrypt</button>
            </div>
            <div>
              <div style={{ marginBottom: '10px' }}>
                <h4 style={{ marginBottom: '5px' }}>Monoalphabetic Cipher Output:</h4>
                <p style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f5f5f5' }}>{monoalphabeticOutput}</p>
                <h4 style={{ marginBottom: '5px' }}>Decrypted Output:</h4>
                <p style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f5f5f5' }}>{decryptedOutput}</p>
              </div>
              <div>
                <h4 style={{ marginBottom: '5px' }}>Polyalphabetic Cipher Output:</h4>
                <p style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f5f5f5' }}>{polyalphabeticOutput}</p>
              </div>
            </div>
          </div>

          <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
            <p>Test your understanding of the Monoalphabetic and Polyalphabetic Cipher algorithms by answering the following multiple-choice questions:</p>
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
                    {question.question} - {quizAnswers[question.id] === question.correctAnswer ? 'Correct' : 'Incorrect'} - Correct Answer: {question.correctAnswer}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div id="references" style={{ display: currentSection === 'references' ? 'block' : 'none' }}>
            <h3>References:</h3>
            <h4>Books:</h4>
            <ul>
              <li>"Cryptography and Network Security: Principles and Practice" by William Stallings</li>
              <li>"Applied Cryptography" by Bruce Schneier</li>
            </ul>
            <h4>Websites:</h4>
            <ul>
              <li><a href="https://en.wikipedia.org/wiki/Substitution_cipher">Wikipedia - Substitution Cipher</a></li>
              <li><a href="https://www.geeksforgeeks.org/monoalphabetic-cipher/">GeeksforGeeks - Monoalphabetic Cipher</a></li>
            </ul>
            <br></br>
          </div>
        </div>
      </div>
      <footer className="footer">
      <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
    </footer>
    </div>
  );
}

export default MonoalphabeticCipher;