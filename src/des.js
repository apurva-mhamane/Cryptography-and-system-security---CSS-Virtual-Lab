import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './vlab.css'; 
import aimImage from './images/aim.png';
import theoryImage from './images/theory.png';
import procedureImage from './images/procedure.png';
import simulationImage from './images/simulation.png';
import testImage from './images/test.png';
import referencesImage from './images/references.png';

const DES = () => {
  const [currentSection, setCurrentSection] = useState('aim');

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  return (
    <div>
      <div id="whole_body">
        <div style={{ fontSize: '30px', textAlign: 'center', paddingTop: '5px' }}>
          <b>Data Encryption Standard (DES) Virtual Lab​</b>
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
          <p>----Add all sections similar to PlayFair----- Follow Same UI----- Ignore footer it will go downwards when info is added----</p>
        </div>

        <div id="theory" style={{ display: currentSection === 'theory' ? 'block' : 'none' }}>
          <h3>Theory:</h3>
        </div>

        <div id="procedure" style={{ display: currentSection === 'procedure' ? 'block' : 'none' }}>
          <h3>Procedure:</h3>
        </div>

        <div id="simulation" style={{ display: currentSection === 'simulation' ? 'block' : 'none' }}>
          <h3>Simulation:</h3>
        </div>

        <div id="test" style={{ display: currentSection === 'test' ? 'block' : 'none' }}>
          <h3>Test:</h3>
        </div>

        <div id="references" style={{ display: currentSection === 'references' ? 'block' : 'none' }}>
          <h3>References:</h3>
        </div>

      </div>
      <footer className="footer">
        <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
      </footer>
    </div>
  );
}

export default DES;
