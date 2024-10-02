import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png'
import procedureImage from './images/procedure.png'

const HMAC = () => {

    const [currentSection, setCurrentSection] = useState('aim');
    
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [hash, setHash] = useState('');

  const calculateHmac = () => {
    // Implement HMAC calculation logic here
    // For demonstration purposes, let's assume a simple hash function
    const hashedMessage = hashFunction(`${message}${key}`);
    setHash(hashedMessage);
  };
  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const hashFunction = (data) => {
    // Simple hash function (for demonstration only)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash &= hash; // Convert to 32bit integer
    }
    return hash.toString(16); // Return hexadecimal representation
  };

  return (

    <div>
    <div id="whole_body">
      <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
        <b>HMAC Algorithm Virtual Lab​</b>
      </div>

    <div id="nav-placeholder">
      <ul>
        {/* Use Link component for navigation */}
        <li><Link to="#aim" onClick={() => handleSectionChange('aim')}><img src={aimImage} alt="Aim" height="70px" width="80px"/>Aim</Link></li>
        <li><Link to="#theory" onClick={() => handleSectionChange('theory')}><img src={theoryImage} alt="Theory" height="70px" width="70px"/>Theory</Link></li>
        <li><Link to="#procedure" onClick={() => handleSectionChange('procedure')}><img src={procedureImage} alt="Procedure" height="70px" width="70px"/>Procedure</Link></li>
        <li><Link to="#simulation" onClick={() => handleSectionChange('simulation')}><img src={simulationImage} alt="Simulation" height="70px" width="70px"/>Simulation</Link></li>
        <li><Link to="#test" onClick={() => handleSectionChange('test')}><img src={testImage} alt="Post-Test" height="70px" width="70px"/>Post-Test</Link></li>
        <li><Link to="#references" onClick={() => handleSectionChange('references')}><img src={referencesImage} alt="References" height="70px" width="70px"/>References</Link></li>
      </ul>
    </div>

    

      <div id="aim" style={{ display: currentSection === 'aim' ? 'block' : 'none' }}>
        <h3>Aim:</h3>
        
        <p>The aim of this virtual lab is to understand the HMAC (Hash-based Message Authentication Code) algorithm and its applications in ensuring message integrity and authenticity.</p>
      </div>

      <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
        <h3>Theory:</h3>
        <p>HMAC (Hash-based Message Authentication Code) is a type of message authentication code (MAC) involving a cryptographic hash function and a secret cryptographic key. It can be used to verify the authenticity and integrity of a message.</p>
  <p>The procedure for generating an HMAC involves two steps:</p>
  <ol>
    <li>Append zeros to the key to make it the same size as the block size of the hash function.</li>
    <li>XOR the key with the inner and outer padding values.</li>
    <li>Hash the result of step 2.</li>
  </ol>
      </div>

      <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
        <h3>Procedure:</h3>
        <ol>
    <li>Choose a cryptographic hash function (e.g., SHA-256).</li>
    <li>Choose a secret key known only to the sender and receiver.</li>
    <li>Prepare the message to be authenticated.</li>
    <li>Append zeros to the key to match the block size of the hash function.</li>
    <li>XOR the key with the inner and outer padding values.</li>
    <li>Hash the result of step 5.</li>
    <li>Append the hash to the end of the message.</li>
    <li>Send the message along with the HMAC to the receiver.</li>
    <li>At the receiver's end, repeat steps 4 to 6 using the received key.</li>
    <li>Compare the computed HMAC with the received HMAC to verify message integrity and authenticity.</li>
  </ol>
      </div>

      <div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
        <h3>Simulation:</h3>
        <div className="hmac-container">
    
      <div className="input-container">
        <label htmlFor="message">Message:</label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="key">Key:</label>
        <input
          type="text"
          id="key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
      </div>
      <button onClick={calculateHmac}>Calculate HMAC</button>
      {hash && (
        <div className="hash-result">
          <p><b>HMAC:</b> {hash}</p>
        </div>
      )}
    </div>

      </div>

      <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
        <h3>Test:</h3>
        <p>To test your understanding of HMAC, try answering the following questions:</p>
  <ol>
    <li>What does HMAC stand for?</li>
    <li>Explain the purpose of HMAC in message authentication.</li>
    <li>Describe the steps involved in generating an HMAC.</li>
    <li>How does HMAC ensure message integrity and authenticity?</li>
    <li>Discuss any security considerations or vulnerabilities related to HMAC.</li>
  </ol>
      </div>

      <div id="references" style={{ display: currentSection === 'references' ? 'block' : 'none' }}>
        <h3>References:</h3>
        <li>Keying hash functions for message authentication - M. Bellare, R. Canetti, H. Krawczyk</li>
    <li>RFC 2104 - HMAC: Keyed-Hashing for Message Authentication</li>
    <li>Understanding Cryptography by Christof Paar and Jan Pelzl</li>
      </div>

    </div>
    <footer className="footer">
        <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
      </footer>
  </div>



  
  );
};

export default HMAC;