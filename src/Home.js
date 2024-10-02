
import React from 'react';
import './HomePage.css'; 
import { Link } from 'react-router-dom';
import rsaImage from './images/rsa.png';
import playfairImage from './images/playfair.jpg';
import desImage from './images/des.jpg';
import md5Image from './images/md5.jpg';
import diffieHellmanImage from './images/diffie_hellman.png';
import snortImage from './images/snort.jpg';
import hillCipherImage from './images/hill_cipher.png';
import labImage from './images/lab_image.png';
import shaImage from './images/sha.png';
import onetimepadImage from './images/onetimepad.jpg';
import digitalsignatureImage from './images/digitalsignature.png'
import hmacImage from './images/hmac.jpg';
import aesImage from './images/aes.jpg';
import monopolyImage from './images/monopoly.jpg'


const Home = () => {
    return (
      <div className="home-container">
      <main>     
      <div className="centered-content">
      <div className="lab-card">
        <div className="lab-card-content">
          <h2>Welcome to Cryptography System Security Lab</h2>
          <p>VIRTUAL LABS is based on the idea that lab experiments can be taught using the Internet, more efficiently and less expensively. The labs can also made be more available to students with no access to physical labs or where equipment is not available owing to being scarce or costly.</p>
        </div>
        <img src={labImage} alt="Lab" className="lab-card-image" height="200" />
      </div>
      <h1>List of Experiments</h1>
    </div>
    
          <div className="cards-container">
            <div className="card" style={{ backgroundColor: '#eebbfa', }}>
              <img src={rsaImage} alt="RSA" />
              <Link to="/RSA">
              <h3>RSA</h3></Link>
            </div>

            <div className="card" style={{ backgroundColor: '#a5ffec', }}>
              <img src={playfairImage} alt="Playfair Cipher" />
              <Link to="/Playfair">
              <h3>Playfair Cipher</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#bdd4ff', }}>
              <img src={desImage} alt="DES" />
              <Link to="/DES">
              <h3>DES</h3>
              </Link>

            </div>
            <div className="card" style={{ backgroundColor: '#ffff99', }}>
              <img src={md5Image} alt="MD5" />
              <Link to="/MD5">
              <h3>MD5</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#dee2e1', }}>
              <img src={diffieHellmanImage} alt="Diffie Hellman Key Exchange" />
              <Link to="/DiffieHellman">
              <h3>Diffie Hellman Key Exchange</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#ffbed1', }}>
              <img src={snortImage} alt="SNORT" />
              <Link to="/Snort">
              <h3>SNORT</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#eebbfa', }}>
              <img src={hillCipherImage} alt="Hill Cipher" />
              <Link to="/HillCipher">
              <h3>Hill Cipher</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#a5ffec', }}>
              <img src={shaImage} alt="SHA" />
              <Link to="/SHA">
              <h3>SHA Hashing</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#bdd4ff', }}>
              <img src={onetimepadImage} alt="OneTimePad" />
              <Link to="/OneTimePad">
              <h3>One Time Pad Cipher</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#ffff99', }}>
              <img src={digitalsignatureImage} alt="DigitalSignature" />
              <Link to="/DigitalSignature">
              <h3>Digital Signature</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#dee2e1', }}>
              <img src={hmacImage} alt="HMAC" />
              <Link to="/HMAC">
              <h3>HMAC</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#ffbed1', }}>
              <img src={aesImage} alt="AES" />
              <Link to="/AES">
              <h3>AES</h3>
              </Link>
            </div>

            <div className="card" style={{ backgroundColor: '#a5ffec', }}>
              <img src={monopolyImage} alt="MonoPoly Cipher" />
              <Link to="/MonoPolyCipher">
              <h3>Mono/Poly Alphabetic Cipher</h3>
              </Link>
            </div>


          </div>

          <footer className="footer">
          <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
        </footer>
      </main>
      </div>
  
    );
};

export default Home;
