import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './HomePage.css'; 
import Contact from './Contact';
import About from './About';
import Home from './Home';
import logo from './images/vl-logo.png'; 
import RSA from './RSA';
import Playfair from './playfair';
import DES from './des';
import MD5 from './md5';
import DiffieHellman from './diffiehellman'; // Corrected import
import Snort from './snort';
import HillCipher from './hillcipher';
import SHA from './sha';
import OneTimePad from './onetimepad';
import DigitalSignature from './digitalsignature';
import HMAC from './hmac';
import AES from './aes';
import MonoPolyCipher from './monopoly';

const App = () => {
  return (
    <BrowserRouter>
      <div className="topnav">
        <Link to="/contact">Contact</Link>
        <Link to="/About">About</Link>
        <Link to="/Home">Home</Link>
        <img src={logo} alt="Logo" className='logo' />
      </div>

      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/About" element={<About />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/rsa" element={<RSA />} />
        <Route path="/playfair" element={<Playfair />} />
        <Route path="/DES" element={<DES />} />
        <Route path="/MD5" element={<MD5 />} />
        <Route path="/DiffieHellman" element={<DiffieHellman />} /> 
        <Route path="/Snort" element={<Snort />} />
        <Route path="/HillCipher" element={<HillCipher />} />
        <Route path="/SHA" element={<SHA />} />
        <Route path="/OneTimePad" element={<OneTimePad />} />
        <Route path="/DigitalSignature" element={<DigitalSignature />} />
        <Route path="/HMAC" element={<HMAC />} />
        <Route path="/AES" element={<AES />} />
        <Route path="/MonoPolyCipher" element={<MonoPolyCipher />} />
        {/* Add a default route to Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
