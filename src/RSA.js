import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import procedureImage from './images/procedure.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png';



// Test part logic
const RSA = () => {
  const [currentSection, setCurrentSection] = useState('theory');
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
      question: "Which of the following is true about RSA?",
      options: [
        { id: 'a', text: 'It is a symmetric encryption algorithm' },
        { id: 'b', text: 'It is based on the difficulty of factoring large prime numbers' },
        { id: 'c', text: 'It requires a shared secret key for encryption and decryption' },
        { id: 'd', text: 'It uses substitution technique for encryption' }
      ],
      correctAnswer: 'b'
    },
    {
      id: 2,
      question: "What is the minimum number of keys required for RSA encryption?",
      options: [
        { id: 'a', text: '1' },
        { id: 'b', text: '2' },
        { id: 'c', text: '3' },
        { id: 'd', text: '4' },
      ],
      correctAnswer: 'b'
    },
    {
      id: 3,
      question: "Which mathematical operation is used in RSA for encryption?",
      options: [
        { id: 'a', text: 'Addition' },
        { id: 'b', text: 'Multiplication' },
        { id: 'c', text: 'Exponentiation' },
        { id: 'd', text: 'Division' },
      ],
      correctAnswer: 'c'
    }
  ];

  // Main body
  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>RSA Algorithm Virtual Lab</b>
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
          <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
            <h3>Theory:</h3>
            <p>RSA (Rivest-Shamir-Adleman) is a widely used asymmetric encryption algorithm based on the difficulty of factoring large prime numbers.</p>
            <p><b>Key components of RSA:</b></p>
            <ul>
              <li><b>Key generation:</b> RSA involves the generation of a public key and a private key. The public key is shared openly, while the private key is kept secret.</li>
              <li><b>Encryption:</b> To encrypt a message, the sender uses the recipient's public key.</li>
              <li><b>Decryption:</b> Only the recipient possessing the corresponding private key can decrypt the message.</li>
            </ul>
            <p>Understanding these components is crucial for implementing and using RSA effectively.</p>
          </div>

          <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
            <h3>Procedure:</h3>
            <p>To use RSA for encryption and decryption, follow these steps:</p>
            <ol>
              <li>Generate a public-private key pair.</li>
              <li>Share the public key openly, while keeping the private key secret.</li>
              <li>To encrypt a message, use the recipient's public key</li>
              <li>To decrypt the encrypted message, use the corresponding private key.</li>
              <li>Ensure secure key management and transmission to maintain the security of the communication.</li>
            </ol>
          </div>

          <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
            <p>Test your understanding of RSA by answering the following multiple-choice questions:</p>
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
              <

h3>Results:</h3>
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
          <h4>Books:</h4>
          <ul>
            <li>"Cryptography and Network Security: Principles and Practice" by William Stallings</li>
            <li>"Applied Cryptography" by Bruce Schneier</li>
          </ul>
          <h4>Websites:</h4>
          <ul>
            <li><a href="https://en.wikipedia.org/wiki/RSA_(cryptosystem)">https://en.wikipedia.org/wiki/RSA_(cryptosystem)</a></li>
            <li><a href="https://www.youtube.com/watch?v=wXB-V_Keiu8">https://www.youtube.com/watch?v=wXB-V_Keiu8</a></li>
          </ul>
        </div>
      </div>

      <footer className="footer">
        <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
      </footer>
    </div>
  );
}

export default RSA;