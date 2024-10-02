import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import procedureImage from './images/procedure.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png';

const HillCipher = () => {
  const [currentSection, setCurrentSection] = useState('aim');
  const [plaintext, setPlaintext] = useState('');
  const [key, setKey] = useState('');
  const [ciphertext, setCiphertext] = useState('');

  const encrypt = () => {
    let keyMatrix = getKeyMatrix();
    let plainMatrix = getPlainTextMatrix();
    let cipherMatrix = multiplyMatrices(keyMatrix, plainMatrix);
    let encryptedText = matrixToText(cipherMatrix);
    setCiphertext(encryptedText);
  };

  const getKeyMatrix = () => {
    const size = Math.ceil(Math.sqrt(key.length));
    let keyMatrix = [];
    let index = 0;
    for (let i = 0; i < size; i++) {
      let row = [];
      for (let j = 0; j < size; j++) {
        if (index < key.length) {
          row.push(key.charCodeAt(index++) - 65);
        } else {
          row.push(0);
        }
      }
      keyMatrix.push(row);
    }
    return keyMatrix;
  };

  const getPlainTextMatrix = () => {
    let textMatrix = [];
    for (let i = 0; i < plaintext.length; i++) {
      textMatrix.push([plaintext.charCodeAt(i) - 65]);
    }
    return textMatrix;
  };

  const multiplyMatrices = (keyMatrix, plainMatrix) => {
    let result = [];
    for (let i = 0; i < keyMatrix.length; i++) {
      let row = [];
      for (let j = 0; j < plainMatrix[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < keyMatrix[0].length; k++) {
          sum += keyMatrix[i][k] * plainMatrix[k][j];
        }
        row.push(sum % 26);
      }
      result.push(row);
    }
    return result;
  };

  const matrixToText = (matrix) => {
    let text = '';
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        text += String.fromCharCode(matrix[i][j] + 65);
      }
    }
    return text;
  };


  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>Hill Cipher Virtual Lab​</b>
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

        <div id="aim" style={{ display: currentSection === 'aim' ? 'block' : 'none' }}>
          <h3>Aim:</h3>
          <p> Implementing the Hill Cipher to achieve secure encryption and decryption of messages using matrix operations.</p>
          <h3>Goal</h3>
          <p>To demonstrate the effectiveness of matrix-based cryptography in providing confidentiality and resistance against traditional cryptographic attacks.</p>
        </div>

        <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
        <p>The Hill Cipher is a polygraphic substitution cipher based on linear algebra, invented by Lester S. Hill in 1929. It operates on blocks of plaintext characters and uses a matrix multiplication modulo the size of the alphabet to perform encryption and decryption.</p>
  <p><b>Key components of the Hill Cipher:</b></p>
  <ul>
    <li><b>Key Matrix:</b> The key of the Hill Cipher is a square matrix chosen to be invertible modulo the size of the alphabet.</li>
    <li><b>Matrix Multiplication:</b> To encrypt a block of plaintext characters, it is multiplied by the key matrix modulo the alphabet size.</li>
    <li><b>Modular Arithmetic:</b> The result of the matrix multiplication is taken modulo the size of the alphabet to ensure the ciphertext remains within the valid range of characters.</li>
    <li><b>Inverse Matrix:</b> Decryption involves multiplying the ciphertext block by the inverse of the key matrix modulo the alphabet size.</li>
  </ul>
          
        </div>

        <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
          <h3>Procedure:</h3>
          <p>To implement the Hill Cipher algorithm, follow these steps:</p>
  <ol>
    <li>Choose a key matrix that is invertible (mod 26) and its determinant is relatively prime to 26.</li>
    <li>Convert the plaintext into numerical values according to a chosen mapping (e.g., A=0, B=1, ..., Z=25).</li>
    <li>Split the numerical values of the plaintext into blocks of size equal to the dimension of the key matrix.</li>
    <li>For each block, multiply it by the key matrix modulo 26 to obtain the ciphertext block.</li>
    <li>Convert the numerical values of the ciphertext block back into characters using the reverse mapping.</li>
    <li>To decrypt the ciphertext, apply the inverse of the key matrix modulo 26 to each block of ciphertext.</li>
    <li>Repeat the steps above to obtain the original plaintext.</li>
  </ol>

        </div>

        <div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
          <h3>Simulation:</h3>
          <div>
      <h2>Hill Cipher Encryption</h2>
      <div>
        <label>Plaintext:</label>
        <input
          type="text"
          value={plaintext}
          onChange={(e) => setPlaintext(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
        />
      </div>
      <div>
        <label>Key:</label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
        />
      </div>
      <button onClick={encrypt}>Encrypt</button>
      <div>
        <label>Ciphertext:</label>
        <input type="text" value={ciphertext} readOnly />
      </div>
    </div>
  

        </div>

        <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
          <h3>Test:</h3>
        </div>

        <div id="references" style={{ display: currentSection === 'references' ? 'block' : 'none' }}>
          <h3>References:</h3>
          <h4>Books Referred</h4>
  <ul>
    <li>"Introduction to Cryptography: Principles and Applications" by Hans Delfs and Helmut Knebl</li>
    <li>"Cryptography and Network Security: Principles and Practice" by William Stallings</li>
    <li>"Understanding Cryptography: A Textbook for Students and Practitioners" by Christof Paar and Jan Pelzl</li>
  </ul>
  <h4>Websites Referred</h4>
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/Hill_cipher">https://en.wikipedia.org/wiki/Hill_cipher</a></li>
    <li><a href="https://www.geeksforgeeks.org/hill-cipher/">https://www.geeksforgeeks.org/hill-cipher/</a></li>
    <li><a href="https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt/v/hill-cipher">https://www.khanacademy.org/computing/computer-science/cryptography/modern-crypt/v/hill-cipher</a></li>
  </ul>
        </div>

      </div>
      <footer className="footer">
        <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
      </footer>
    </div>
  );
}

export default HillCipher;
