import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css';
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png'
import procedureImage from './images/procedure.png'

const OneTimePad = () => {
  const [currentSection, setCurrentSection] = useState('aim');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');

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
  function generateRandomKey(length) {
    let key = '';
    for (let i = 0; i < length; i++) {
        // Generate a random ASCII character in the range [0, 255]
        const randomCharCode = Math.floor(Math.random() * 256);
        // Convert ASCII code to character
        key += String.fromCharCode(randomCharCode);
    }
    return key;
}

  // One-Time Pad encryption function
  const oneTimePadEncrypt = (plaintext, key) => {
    if (plaintext.length !== key.length) {
        throw new Error("Plaintext and key lengths must be equal");
    }
 
    return Array.from(plaintext, (char, index) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index));
    }).join('');
  };
 
  // One-Time Pad decryption function
  const oneTimePadDecrypt = (ciphertext, key) => {
    if (ciphertext.length !== key.length) {
        throw new Error("Ciphertext and key lengths must be equal");
    }
 
    return Array.from(ciphertext, (char, index) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index));
    }).join('');
  };

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary advantage of the One-Time Pad cipher?",
      options: [
        { id: 'a', text: 'Perfect secrecy' },
        { id: 'b', text: 'Ease of implementation' },
        { id: 'c', text: 'High speed' },
        { id: 'd', text: 'Low computational complexity' }
      ],
      correctAnswer: 'a'
    },
    {
      id: 2,
      question: "How many times can the key in One-Time Pad be used?",
      options: [
        { id: 'a', text: 'Once' },
        { id: 'b', text: 'Twice' },
        { id: 'c', text: 'Multiple times' },
        { id: 'd', text: 'Infinite times' }
      ],
      correctAnswer: 'a'
    },
    {
      id: 3,
      question: "Which of the following is a requirement for the security of One-Time Pad?",
      options: [
        { id: 'a', text: 'Key should be shorter than the plaintext' },
        { id: 'b', text: 'Key should be randomly generated' },
        { id: 'c', text: 'Key should be reused for efficiency' },
        { id: 'd', text: 'Key should be publicly shared' }
      ],
      correctAnswer: 'b'
    }
  ];

  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>One-Time Pad Virtual Lab</b>
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
            <p>The aim of this virtual lab is to introduce the One-Time Pad cipher and demonstrate its encryption and decryption processes.</p>
            <h3>Broad Goal of the experiment:</h3>
            <p>The broad goal of this experiment is to provide students with hands-on experience in understanding and implementing the One-Time Pad cipher. By the end of this lab, students should be able to:</p>
            <ul>
              <li>Understand the principles behind the One-Time Pad cipher.</li>
              <li>Generate and use a one-time pad for encryption and decryption.</li>
              <li>Analyze the security properties of the One-Time Pad cipher.</li>
            </ul>
          </div>

          <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
            <h3>Theory:</h3>
            <p>The One-Time Pad is a symmetric encryption technique that provides perfect secrecy when used correctly. It involves the use of a key that is as long as the plaintext and is completely random.</p>
            <p><b>Key points about the One-Time Pad:</b></p>
            <ul>
              <li><b>Perfect secrecy:</b> The One-Time Pad provides perfect secrecy because every possible plaintext is equally likely for every ciphertext.</li>
              <li><b>Key usage:</b> The key in the One-Time Pad must be used only once and must be truly random.</li>
              <li><b>Security:</b> If used properly, the One-Time Pad is unbreakable, but its security relies on the key being kept completely secret and never reused.</li>
           <br></br><br></br><br></br>
            </ul>
          </div>

          <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
            <h3>Procedure:</h3>
            <p>To implement the One-Time Pad algorithm, follow these steps:</p>
            <ol>
              <li>Generate a random key that is at least as long as the plaintext.</li>
              <li>Encrypt the plaintext by performing an XOR operation between each character of the plaintext and the corresponding character in the key.</li>
              <li>Decrypt the ciphertext by performing the same XOR operation between each character of the ciphertext and the corresponding character in the key.</li>
            </ol>
          </div>

          <div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
            <h3>Simulation:</h3>
            <p>In this simulation, you will interactively encrypt and decrypt messages using the One-Time Pad algorithm. Follow the instructions provided to perform the encryption and decryption steps.</p>
            <div>
              <br></br>
              <label>Plaintext:</label>
              <br></br>
              <input type="text" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} />
            </div>
            <div>
            <br></br>
              <button style={{ marginRight: '10px', padding: '5px 10px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} onClick={ () => setKey(generateRandomKey(plaintext.length))}>Generate Key</button>
              <button style={{ marginRight: '10px', padding: '5px 10px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} onClick={() => setCiphertext(oneTimePadEncrypt(plaintext, key))}>Encrypt</button>
              <button style={{ marginRight: '10px', padding: '5px 10px', fontSize: '16px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }} onClick={() => setPlaintext(oneTimePadDecrypt(ciphertext, key))}>Decrypt</button>
            </div>
            <div>
            <br></br>
              <label>Ciphertext:</label>
              <br></br>
              <input type="text" value={ciphertext} readOnly />
        
            </div>
            <br></br>
          </div>

          <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
            <p>Test your understanding of the One-Time Pad algorithm by answering the following multiple-choice questions:</p>
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

          <div id="references" style={{ display: currentSection === 'references' ? 'block' : 'none' }}>
            <h3>References:</h3>
            <h4>Books:</h4>
            <ul>
              <li>"Introduction to Modern Cryptography" by Jonathan Katz and Yehuda Lindell</li>
              <li>"Cryptography and Network Security: Principles and Practice" by William Stallings</li>
            </ul>
            <h4>Websites:</h4>
            <ul>
              <li><a href="https://en.wikipedia.org/wiki/One-time_pad">Wikipedia - One-time pad</a></li>
              <li><a href="https://crypto.stanford.edu/pbc/notes/crypto/otp.html">Stanford University - One-Time Pad</a></li>
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

export default OneTimePad;