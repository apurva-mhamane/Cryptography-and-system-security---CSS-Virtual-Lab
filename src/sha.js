import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import procedureImage from './images/procedure.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png';
import sha1TheoryImage from './images/sha1_theory.png';
import sha256TheoryImage from './images/sha256_theory.png';
import sha512TheoryImage from './images/sha512_theory.png';
import { SHA1, SHA256, SHA512 } from 'crypto-js';

const SHA = () => {
  const [currentSection, setCurrentSection] = useState('aim');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA1');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
    setShowResults(false); 
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  const handleHashing = () => {
    let hashResult;
    switch (algorithm) {
      case 'SHA1':
        hashResult = SHA1(inputText).toString();
        break;
      case 'SHA256':
        hashResult = SHA256(inputText).toString();
        break;
      case 'SHA512':
        hashResult = SHA512(inputText).toString();
        break;
      default:
        hashResult = '';
    }
    setOutputText(hashResult);
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
      question: "What is the primary difference between SHA-1, SHA-256, and SHA-512?",
      options: [
        { id: 'a', text: ' Output size' },
        { id: 'b', text: 'Input size' },
        { id: 'c', text: 'Number of rounds in the compression function' },
        { id: 'd', text: 'Block size' }
      ],
      correctAnswer: 'a'
    },
    {
      id: 2,
      question: "Which of the following hashing algorithms has been deemed insecure and is not recommended for further use?",
      options: [
        { id: 'a', text: 'SHA-1' },
        { id: 'b', text: 'SHA-256' },
        { id: 'c', text: 'SHA-512'},
        { id: 'd', text: 'They are all considered secure' },
      ],
      correctAnswer: 'a'
    },
    {
      id: 3,
      question: "Which of the following is NOT a property of a good cryptographic hash function?",
      options: [
        { id: 'a', text: 'Pre-image resistance' },
        { id: 'b', text: 'Collision resistance' },
        { id: 'c', text: 'Deterministic output' },
        { id: 'd', text: 'Reversibility' },
      ],
      correctAnswer: 'd'
    }
  ];


  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>Secure Hashing Algorithm Virtual Lab</b>
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
            <p>The aim of this virtual lab is to introduce cryptographic hash functions, specifically SHA-1, SHA-256, and SHA-128.</p>
            <h3>Broad Goal of the experiment:</h3>
            <p>The broad goal of this experiment is to provide students with hands-on experience in understanding and implementing cryptographic hash functions. By the end of this lab, students should be able to:</p>
            <ul>
              <li>Understand the principles behind cryptographic hash functions.</li>
              <li>Generate hash values for given input data using the implemented algorithms.</li>
              <li>Analyze the strengths and weaknesses of each cryptographic hash function.</li>
              <li>Apply cryptographic hash functions to real-world scenarios and understand their importance in data integrity verification and digital signatures.</li>
            </ul>
          </div>

          <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
            <h3>Theory:</h3>
            <label htmlFor="theoryAlgorithm">Select Algorithm:</label>
            <select id="theoryAlgorithm" value={algorithm} onChange={handleAlgorithmChange}>
              <option value="SHA1">SHA-1</option>
              <option value="SHA256">SHA-256</option>
              <option value="SHA512">SHA-512</option>
            </select>
            <p>
  {algorithm === 'SHA1' && (
    <div>
      <p>
      SHA-1, or Secure Hash Algorithm 1, is a cryptographic hash function designed by the National Security Agency (NSA) and published by the National Institute of Standards and Technology (NIST) in 1995. It is one of the most widely used hash functions, although it's considered deprecated due to vulnerabilities found in it, particularly in collision attacks. However, understanding how it works is still valuable for historical and educational purposes.
      </p>
      <p>
      SHA-1 operates by taking an input message of any length and producing a fixed-size (160-bit) hash value, typically represented as a 40-digit hexadecimal number. The key properties of a cryptographic hash function, which SHA-1 aims to satisfy, include:
        <ol>
          <li>Deterministic: The same message always results in the same hash value.</li>
          <li>Fast Computation: It should be relatively fast to compute the hash value for any given input.</li>
          <li>Pre-image resistance: Given a hash value, it should be computationally infeasible to determine the original message.</li>
          <li>Collision resistance: It should be computationally infeasible to find two different messages that produce the same hash value.</li>
        </ol>
      </p>
      <p>
        Algorithm Steps:
        <ol>
          <li>Padding: The input message is padded so that its length is congruent to 448 modulo 512. Padding is done by appending a single '1' bit, followed by as many '0' bits as necessary, and finally appending the length of the original message as a 64-bit big-endian integer.</li>
          <li>Initialization: SHA-1 starts with an initial hash value (known as the "initialization vector" or "IV"). These values are fixed constants defined by the SHA-1 specification.</li>
          <li>Processing: The padded message is processed in 512-bit blocks. For each block, SHA-1 performs a series of bitwise logical operations (AND, OR, XOR), rotations, and additions using a set of constants and functions.</li>
          <li>Iterations: The processing of each block involves 80 iterations. In each iteration, a 32-bit word is produced from a combination of the current block, the previous hash value, and some predefined constants. This word is then mixed with the current hash value through a series of bitwise operations.</li>
          <li>Output: After processing all blocks, the final hash value is obtained. This value represents the cryptographic hash of the original input message.</li>
        </ol>
      </p>
    </div>
  )}

  {algorithm === 'SHA256' && (
    <div>
      <p>
      SHA-256, like other cryptographic hash functions, aims to take an input message of any length and produce a fixed-size (256-bit) hash value. It satisfies the key properties of a cryptographic hash function, including determinism, fast computation, pre-image resistance, and collision resistance. The 256-bit output size provides a significantly larger hash space compared to SHA-1, making it more resistant to brute-force and collision attacks.
      </p>
      <p>
        Algorithm Steps:
        <ol>
          <li>Padding: Similar to SHA-1, the input message is padded to ensure its length is a multiple of 512 bits. The padding includes appending a single '1' bit followed by '0' bits and a 64-bit representation of the original message length.</li>
          <li>Initialization: SHA-256 uses a set of initial hash values (known as the "initialization vector" or "IV") defined by the SHA-256 specification.</li>
          <li>Processing: The padded message is processed in 512-bit blocks. Each block undergoes a series of bitwise logical operations, rotations, and additions using a set of constants and functions unique to SHA-256.</li>
          <li>Iterations: The processing of each block involves 64 iterations. Each iteration produces a new 32-bit word from a combination of the current block, the previous hash value, and specific constants. These words are then mixed with the current hash value through a series of bitwise operations.</li>
          <li>Output: After processing all blocks, the final hash value is obtained. This 256-bit value represents the cryptographic hash of the original input message.</li>
        </ol>
      </p>
    </div>
  )}

  {algorithm === 'SHA512' && (
    <div>
      <p>
      SHA-512, like other cryptographic hash functions, aims to take an input message of any length and produce a fixed-size (512-bit) hash value. It satisfies the key properties of a cryptographic hash function, including determinism, fast computation, pre-image resistance, and collision resistance. The larger output size of 512 bits offers a significantly larger hash space compared to both SHA-1 and SHA-256, making it even more resistant to brute-force and collision attacks.
      </p>
      <p>
        Algorithm Steps:
        <ol>
          <li>Padding: Similar to SHA-256, the input message is padded to ensure its length is a multiple of 1024 bits. The padding includes appending a single '1' bit followed by '0' bits and a 128-bit representation of the original message length.</li>
          <li>Initialization: SHA-512 uses a set of initial hash values (known as the "initialization vector" or "IV") defined by the SHA-512 specification.</li>
          <li>Processing: The padded message is processed in 1024-bit blocks. Each block undergoes a series of bitwise logical operations, rotations, and additions using a set of constants and functions unique to SHA-512.</li>
          <li>Iterations: The processing of each block involves 80 iterations. Each iteration produces a new 64-bit word from a combination of the current block, the previous hash value, and specific constants. These words are then mixed with the current hash value through a series of bitwise operations.</li>
          <li>Output: After processing all blocks, the final hash value is obtained. This 512-bit value represents the cryptographic hash of the original input message.</li>
        </ol>
      </p>
    </div>
  )}
</p>
            {currentSection === 'theory' && (
              <>
                {algorithm === 'SHA1' && <img src={sha1TheoryImage} alt="SHA-1 Theory" />}
                {algorithm === 'SHA256' && <img src={sha256TheoryImage} alt="SHA-256 Theory" />}
                {algorithm === 'SHA512' && <img src={sha512TheoryImage} alt="SHA-512 Theory" />}
              </>
            )}
          </div>

          <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
            <h3>Procedure:</h3>
            <label htmlFor="procedureAlgorithm">Select Algorithm:</label>
            <select id="procedureAlgorithm" value={algorithm} onChange={handleAlgorithmChange}>
              <option value="SHA1">SHA-1</option>
              <option value="SHA256">SHA-256</option>
              <option value="SHA512">SHA-512</option>
            </select>
            {currentSection === 'procedure' && algorithm === 'SHA1' && (
              <ul>
                <li>Step 1: Input the message to be hashed.</li>
                <li>Step 2: Apply padding to the message if necessary.</li>
                <li>Step 3: Initialize the SHA-1 hash buffer.</li>
                <li>Step 4: Process the message in 512-bit blocks.</li>
                <li>Step 5: Output the hash value.</li>
              </ul>
            )}
            {currentSection === 'procedure' && algorithm === 'SHA256' && (
              <ul>
                <li>Step 1: Input the message to be hashed.</li>
                <li>Step 2: Apply padding to the message if necessary.</li>
                <li>Step 3: Initialize the SHA-256 hash buffer.</li>
                <li>Step 4: Process the message in 512-bit blocks.</li>
                <li>Step 5: Output the hash value.</li>
              </ul>
            )}
            {currentSection === 'procedure' && algorithm === 'SHA512' && (
              <ul>
                <li>Step 1: Input the message to be hashed.</li>
                <li>Step 2: Apply padding to the message if necessary.</li>
                <li>Step 3: Initialize the SHA-512 hash buffer.</li>
                <li>Step 4: Process the message in 1024-bit blocks.</li>
                <li>Step 5: Output the hash value.</li>
              </ul>
            )}
            <br></br><br></br><br></br><br></br>
          </div>

          <div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
            <h3>Simulation:</h3>
            <label htmlFor="inputText">Input Text/Number: </label>
            <textarea id="inputText" value={inputText} onChange={handleInputChange} />
            <br></br><br></br><br></br>
            <label htmlFor="algorithm">Select Algorithm: </label>
            <select id="algorithm" value={algorithm} onChange={handleAlgorithmChange}>
              <option value="SHA1">SHA-1</option>
              <option value="SHA256">SHA-256</option>
              <option value="SHA512">SHA-512</option>
            </select>
            <br></br>
            <button onClick={handleHashing}>Hash</button>
            <br></br><br></br>
            <label htmlFor="outputText">Output Hash: </label>
            <textarea id="outputText" value={outputText} readOnly />
            <br></br><br></br><br></br><br></br>
            </div>

          <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
          <p>Test your understanding of the Secure hashing algorithms by answering the following multiple-choice questions:</p>
          <ol>
            {quizQuestions.map((question) => (
              <li key={question.id} >
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
        <h4>Book Referred</h4>
        <ul>
          <li>"Cryptography and Network Security: Principles and Practice" by William Stallings</li>
          <li>"Applied Cryptography" by Bruce Schneier</li>
        </ul>
        <h4>Website Referred</h4>
        <ul>
          <li><a href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">https://en.wikipedia.org/wiki/Cryptographic_hash_function</a></li>
          <li><a href="https://brilliant.org/wiki/secure-hashing-algorithms/">https://brilliant.org/wiki/secure-hashing-algorithms/</a></li>
        </ul>
      </div>

        </div>
      </div>

      <footer className="footer">
        <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
      </footer>
    </div>
  );
}

export default SHA;