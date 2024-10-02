import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./vlab.css";
import aimImage from "./images/aim.png";
import theoryImage from "./images/theory.png";
import simulationImage from "./images/simulation.png";
import testImage from "./images/test.png";
import referencesImage from "./images/references.png";
import procedureImage from "./images/procedure.png";
import digitalSignatureTheory from "./images/digital_signature_theory.png";
import digitalSignatureProcedure from "./images/digital_signature_procedure.png";
import forge from "node-forge";

const DigitalSignature = () => {
  const [currentSection, setCurrentSection] = useState("aim");
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
    quizQuestions.forEach((question) => {
      if (quizAnswers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const [message, setMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [hash, setHash] = useState("");
  const [verificationResult, setVerificationResult] = useState("");

  const generateKeys = () => {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 1024 });
    const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
    const publicKey = forge.pki.publicKeyToPem(keypair.publicKey);
    setPrivateKey(privateKey);
    setPublicKey(publicKey);
    // setPublicKey(forge.pki.publicKeyToPem(keypair.publicKey));
  };

  const signMessage = () => {
    const md = forge.md.sha256.create();
    md.update(message, "utf8");
    const signature = forge.pki.privateKeyFromPem(privateKey).sign(md);
    //convert signature to base64
    setSignedMessage(forge.util.encode64(signature));
    // setInputMessage(forge.util.encode64(signature));
    // setSignedMessage(signature);
    setHash(md.digest().toHex()); 
  };

  const verifySignature = () => {
    const inputMessage = document.querySelector(
      ".input-message"
    ).value;
    if (!inputMessage) {
      setVerificationResult("Please input a signed message.");
      return;
    }
    console.log(inputMessage);
    const sigedMessage = forge.util.decode64(inputMessage);
    const md = forge.md.sha256.create();
    md.update(message, "utf8");
    const publicKeyForge = forge.pki.publicKeyFromPem(publicKey);
    try {
      publicKeyForge.verify(md.digest().bytes(), sigedMessage);
      setVerificationResult("Signature is valid.");
    } catch (error) {
      setVerificationResult("Signature is invalid.");
    }
  };

  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary purpose of a digital signature?",
      options: [
        { id: "a", text: "To encrypt data" },
        { id: "b", text: "To ensure data integrity and authenticity" },
        { id: "c", text: "To compress data" },
        { id: "d", text: "To securely transmit data" },
      ],
      correctAnswer: "b",
    },
    {
      id: 2,
      question:
        "Which of the following is NOT a common algorithm used for digital signatures?",
      options: [
        { id: "a", text: "RSA" },
        { id: "b", text: "DSA" },
        { id: "c", text: "ECDSA" },
        { id: "d", text: "AES" },
      ],
      correctAnswer: "d",
    },
    {
      id: 3,
      question:
        "What is the role of the private key in the digital signature process?",
      options: [
        { id: "a", text: "To encrypt the hash of the message" },
        { id: "b", text: "To decrypt the hash of the message" },
        { id: "c", text: "To verify the authenticity of the message" },
        { id: "d", text: "To generate the hash of the message" },
      ],
      correctAnswer: "a",
    },
  ];

  return (
    <div>
      <div id="whole_body">
        <div
          style={{ fontSize: "30px", textAlign: "center", paddingTop: "5px" }}
        >
          <b>Digital Signature Virtual Lab​</b>
        </div>

        <div id="nav-placeholder">
          <ul>
            {/* Use Link component for navigation */}
            <li>
              <Link to="#aim" onClick={() => handleSectionChange("aim")}>
                <img src={aimImage} alt="Aim" height="70px" width="80px" />
                Aim
              </Link>
            </li>
            <li>
              <Link to="#theory" onClick={() => handleSectionChange("theory")}>
                <img
                  src={theoryImage}
                  alt="Theory"
                  height="70px"
                  width="70px"
                />
                Theory
              </Link>
            </li>
            <li>
              <Link
                to="#procedure"
                onClick={() => handleSectionChange("procedure")}
              >
                <img
                  src={procedureImage}
                  alt="Procedure"
                  height="70px"
                  width="70px"
                />
                Procedure
              </Link>
            </li>
            <li>
              <Link
                to="#simulation"
                onClick={() => handleSectionChange("simulation")}
              >
                <img
                  src={simulationImage}
                  alt="Simulation"
                  height="70px"
                  width="70px"
                />
                Simulation
              </Link>
            </li>
            <li>
              <Link to="#test" onClick={() => handleSectionChange("test")}>
                <img
                  src={testImage}
                  alt="Post-Test"
                  height="70px"
                  width="70px"
                />
                Post-Test
              </Link>
            </li>
            <li>
              <Link
                to="#references"
                onClick={() => handleSectionChange("references")}
              >
                <img
                  src={referencesImage}
                  alt="References"
                  height="70px"
                  width="70px"
                />
                References
              </Link>
            </li>
          </ul>
        </div>

        <div
          id="aim"
          style={{ display: currentSection === "aim" ? "block" : "none" }}
        >
          <h3>Aim:</h3>
          <p>
            The aim of this virtual lab is to introduce the concept of Digital
            Signatures and demonstrate their creation, verification, and
            application in ensuring data integrity and authenticity.
          </p>
          <h3>Broad Goal of the experiment:</h3>
          <p>
            The broad goal of this experiment is to provide students with
            hands-on experience in understanding and implementing Digital
            Signatures. By the end of this lab, students should be able to:
          </p>
          <ul>
            <li>Understand the principles behind Digital Signatures.</li>
            <li>
              Generate a public-private key pair for digital signature
              generation.
            </li>
            <li>Create a digital signature for a given message.</li>
            <li>
              Verify the authenticity and integrity of a message using its
              digital signature.
            </li>
            <li>
              Analyze the strengths and weaknesses of different Digital
              Signature algorithms.
            </li>
          </ul>
        </div>

        <div
          id="theory"
          style={{ display: currentSection === "theory" ? "block" : "none" }}
        >
          <h3>Theory:</h3>
          <p>
            Digital Signatures are cryptographic mechanisms used to verify the
            authenticity and integrity of digital messages or documents. They
            are a fundamental aspect of secure communications and transactions
            on the internet.
          </p>
          <p>
            Digital Signatures work by using a pair of keys: a private key,
            which is kept secret by the signer, and a public key, which is
            shared with others. The signer uses their private key to create a
            unique signature for a message, and anyone with the corresponding
            public key can verify the signature's authenticity and integrity.
          </p>
          <p>
            <b>The key components of Digital Signatures include:</b>
          </p>
          <ul>
            <li>
              <b>Key Pair Generation:</b> The first step in using Digital
              Signatures is to generate a pair of keys: a private key, which is
              kept secret, and a public key, which is shared with others.
            </li>
            <li>
              <b>Signing Process:</b> To sign a message, the signer uses their
              private key to create a unique signature for the message. This
              process involves hashing the message and then encrypting the hash
              with the private key.
            </li>
            <li>
              <b>Verification Process:</b> To verify a signature, the verifier
              uses the signer's public key to decrypt the signature and compare
              it to a newly generated hash of the message. If the decrypted hash
              matches the newly generated hash, the signature is verified.
            </li>
            <li>
              <b>Algorithm Selection:</b> There are several algorithms for
              creating and verifying digital signatures, each with its own
              strengths and weaknesses. Common algorithms include RSA, DSA, and
              ECDSA.
            </li>
          </ul>
          <img src={digitalSignatureTheory} alt="Digital Signature Theory" />
          <p>
            Understanding these key components is essential for implementing and
            using Digital Signatures effectively in secure communications and
            transactions.
          </p>
        </div>

        <div
          id="procedure"
          style={{ display: currentSection === "procedure" ? "block" : "none" }}
        >
          <h3>Procedure:</h3>
          <p>To implement Digital Signatures, follow these steps:</p>
          <ol>
            <li>
              Click on "Generate Keys" button to generate a pair of keys: a private key, which is kept secret, and
              a public key, which is shared with others. This can be done using
              various algorithms such as RSA, DSA, or ECDSA.
            </li>
            <li>
              Type in the message. This message will be used to create the digital signature.
            </li>
            <li>
              Click on "Sign Message" to encrypt the hash with the private key to create the digital
              signature. This process involves using the private key to perform
              a cryptographic operation on the hash.
            </li>
            <br></br>
            <img
              src={digitalSignatureProcedure}
              alt="Digital Signature Procedure"
            />
            <br></br>
            <li>
              To verify a digital signature, the verifier performs the following
              steps:
            </li>
            <ul>
              <li>
                Copy the signature from Sender's side and paste it in the Reciever's side "Input signature here!".
              </li>
              <li>
                Click on "Verify Signature" button to verify the authenticity.
              </li>
              <li>
                The digital signature is decrypted using the signer's public key.
                This step involves using the public key to perform a
                cryptographic operation that reverses the encryption done with
                the private key.
              </li>
            </ul>
          </ol>
        </div>

        <div
          id="simulation"
          style={{
            display: currentSection === "simulation" ? "block" : "none",
          }}
        >
          <h3>Simulation:</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: 200,
              fontSize: "18px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", padding: "0 20px" }}>
              <h4>Sender</h4>
              <div
                style={{ display: "flex", flexDirection: "row", width: 800 }}
              >
                <textarea
                  style={{ width: "50%", padding: "10px 0", margin: "10px 0" }}
                  value={privateKey}
                  readOnly
                />
                <textarea
                  style={{ width: "50%", padding: "10px 0", margin: "10px 0" }}
                  value={publicKey}
                  readOnly
                />
              </div>
              <button onClick={generateKeys}>Generate Keys</button>
              <input
                type="text"
                style={{ padding: "10px 0", margin: "10px 0", width: 800 }}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Enter message"
              />
              <button onClick={signMessage}>Sign Message</button>
              <label>Signature:</label>
              <textarea
                style={{ width: 800, padding: "10px 0", margin: "10px 0" }}
                value={signedMessage}
              />
              <label>Hash:</label>
              <textarea
                style={{ width: 800, padding: "10px 0", margin: "10px 0" }}
                value={hash}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "0 20px" }}>
              <h4>Reciever</h4>
              <textarea
                className="input-message"
                style={{ width: 800, padding: "10px 0", margin: "10px 0" }}
                placeholder="Input signature here"
              />

              <button onClick={verifySignature}>Verify Signature</button>
              <p>Verification Result: {verificationResult}</p>
            </div>


          </div>
        </div>

        <div
          id="test"
          style={{ display: currentSection === "test" ? "block" : "none" }}
        >
          <p>
            Test your understanding of the Digital Signature by answering the
            following multiple-choice questions:
          </p>
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
                        onChange={() =>
                          handleAnswerChange(question.id, option.id)
                        }
                      />
                      <label htmlFor={option.id}>
                        {option.id}. {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <button
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              fontSize: "18px",
            }}
            onClick={handleSubmitQuiz}
          >
            Submit Test
          </button>
        </div>

        {showResults && (
          <div>
            <h3>Results:</h3>
            <p>
              Score: {calculateScore()} / {quizQuestions.length}
            </p>
            <ol>
              {quizQuestions.map((question) => (
                <li
                  key={question.id}
                  style={{
                    color:
                      quizAnswers[question.id] === question.correctAnswer
                        ? "lightgreen"
                        : "red",
                  }}
                >
                  {question.question} -{" "}
                  {quizAnswers[question.id] === question.correctAnswer
                    ? "Correct"
                    : "Incorrect"}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div
          id="references"
          style={{
            display: currentSection === "references" ? "block" : "none",
          }}
        >
          <h3>References:</h3>
          <h4>Book Referred</h4>
          <ul>
            <li>
              "Cryptography and Network Security: Principles and Practice" by
              William Stallings
            </li>
            <li>"Applied Cryptography" by Bruce Schneier</li>
            <li>
              "Digital Signatures and Public Key Cryptography" by John Kelsey,
              Bruce Schneier, and Doug Whiting
            </li>
          </ul>
          <h4>Website Referred</h4>
          <ul>
            <li>
              <a href="https://en.wikipedia.org/wiki/Digital_signature">
                https://en.wikipedia.org/wiki/Digital_signature
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/watch?v=s22eJ1eVLTU&pp=ygURZGlnaXRhbCBzaWduYXR1cmU%3D">
                What are Digital Signatures? - Computerphile
              </a>
            </li>
            <li>
              <a href="https://www.geeksforgeeks.org/digital-signatures-certificates/">
                https://www.geeksforgeeks.org/digital-signatures-certificates/
              </a>
            </li>
          </ul>
        </div>
      </div>
      <footer className="footer">
        <h4>&copy; 2024 KJSIT. All rights reserved.</h4>
      </footer>
    </div>
  );
};

export default DigitalSignature;
