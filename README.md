Decentralized Voting Application

Abstract:
The Decentralized Voting Application is a prototype leveraging blockchain technology to facilitate secure and transparent voting processes. This report outlines the design, implementation, and significance of this project.

1. Introduction:
The Decentralized Voting Application represents a pioneering step towards integrating blockchain technology into voting systems. This project was conceptualized to address the inherent challenges faced by traditional voting systems, including issues related to transparency, security, and immutability of records. Leveraging the Ethereum blockchain and MetaMask wallet integration, this application offers a secure platform for casting votes, ensuring each vote's authenticity and traceability while maintaining voter privacy.

2. Project Overview:

Motivation and Objectives:

Traditional voting systems often encounter challenges such as centralized control, susceptibility to fraud, and lack of transparency. The objective of this project is to develop a decentralized voting system that addresses these shortcomings by utilizing blockchain technology. The primary goals include:

●	Ensuring transparent and tamper-proof voting records.
●	Providing a secure and user-friendly interface for voters through MetaMask integration.
●	Demonstrating the potential of blockchain in revolutionizing governance and voting mechanisms.







Technology Stack:

The project utilizes Ethereum as the underlying blockchain platform due to its robustness, smart contract capabilities, and widespread adoption. The integration with MetaMask, a popular Ethereum wallet browser extension, facilitates user interaction with the Ethereum blockchain securely.


3. Implementation Details:

Smart Contract:

The heart of the application lies in the Ethereum smart contract. The contract manages the voting process, maintaining a mapping of candidates and their respective votes. Each vote increments the candidate's vote count while ensuring that a single user cannot vote multiple times.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => uint256) public votes;

    function voteForCandidate(string memory candidate) external {
        votes[candidate]++;
    }

    function getVotesForCandidate(string memory candidate) external view returns (uint256) {
        return votes[candidate];
    }
}


Frontend (HTML/CSS/JavaScript):
HTML Structure:


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Decentralized Voting App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div id="app">
    <header class="header">
      <h1>Decentralized Voting App</h1>
    </header>
    <main class="main">
      <section class="voting-section">
        <p class="connect-text">Connect your MetaMask wallet to vote:</p>
        <button id="connectWallet" class="connect-button">Connect to MetaMask</button>
        <div class="vote-buttons" id="voteSection" style="display: none;">
          <h2>Vote for a Candidate:</h2>
          <button id="voteCandidate1" class="vote-button">Candidate 1</button>
          <button id="voteCandidate2" class="vote-button">Candidate 2</button>
          <p id="voteResult" class="vote-result"></p>
        </div>
      </section>
    </main>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/web3@1.5.3/dist/web3.min.js"></script>
  <script src="script.js"></script>
</body>
</html>





CSS Styling:

body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #111;
    color: #fff;
  }
 
  .header {
    text-align: center;
    padding: 30px 0;
  }
 
  .header h1 {
    margin: 0;
    font-size: 2.5rem;
  }
 
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
 
  .voting-section {
    text-align: center;
    padding: 20px;
    border: 2px solid #fff;
    border-radius: 10px;
  }
 
  .connect-text {
    margin-bottom: 20px;
  }
 
  .connect-button, .vote-button {
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
 
  .connect-button:hover, .vote-button:hover {
    background-color: #45a049;
  }
 
  .vote-result {
    margin-top: 15px;
    font-weight: bold;
  }
 


Javascript interactions : 


const web3 = new Web3(window.ethereum);


const abi =

  [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "voteForCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "getVotesForCandidate",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "votes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];





// Replace this address with your deployed smart contract address
const contractAddress = '0xEC3C3325BA12e90E1c6B882F90A203B705d5A35c';

window.addEventListener('load', async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    const ethereum = window.ethereum;
    const web3 = new Web3(window.ethereum);

    // Requesting access to user's MetaMask account
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error('User denied account access', error);
    }

    const voteSection = document.getElementById('voteSection');
    const voteCandidate1Button = document.getElementById('voteCandidate1');
    const voteCandidate2Button = document.getElementById('voteCandidate2');
    const voteResult = document.getElementById('voteResult');


    // Contract instance
    const contract = new web3.eth.Contract(abi, contractAddress);

    // Function to handle voting for candidate 1
    voteCandidate1Button.addEventListener('click', async () => {
      try {
        await contract.methods.voteForCandidate('candidate1').send({ from: ethereum.selectedAddress });
        voteResult.innerText = 'You voted for Candidate 1';
      } catch (error) {
        console.error('Error voting:', error);
      }
    });

    // Function to handle voting for candidate 2
    voteCandidate2Button.addEventListener('click', async () => {
      try {
        await contract.methods.voteForCandidate('candidate2').send({ from: ethereum.selectedAddress });
        voteResult.innerText = 'You voted for Candidate 2';
      } catch (error) {
        console.error('Error voting:', error);
      }
    });

    // Show vote section after connecting wallet
    voteSection.style.display = 'block';
  } else {
    console.error('MetaMask is not installed');
  }
});




4. Features and Functionality:

Wallet Integration:
The application integrates with MetaMask, allowing users to connect their Ethereum wallets securely. This connection enables them to cast their votes using their verified Ethereum accounts.


Secure Voting Process:
Each voter can cast only one vote. The smart contract tracks user addresses to ensure that an individual cannot vote multiple times for different candidates, ensuring the integrity and fairness of the voting process.
5. Significance and Future Scope:

Importance of Decentralized Voting:

The project underscores the significance of decentralized voting systems in modern governance. By ensuring transparency, immutability, and security in voting processes, such systems have the potential to revolutionize democratic practices, leading to more trustworthy and inclusive governance mechanisms.

Future Enhancements:

Scalability: Explore options for optimizing the application's performance to handle a larger voter base efficiently.

Improved User Interface: Enhance the UI/UX to make the application more intuitive and accessible for a wider audience.

Integration with Identity Solutions: Incorporate identity verification mechanisms to further secure and validate voter identities.

6. Conclusion:

The Decentralized Voting Application demonstrates the transformative potential of blockchain technology in redefining traditional voting systems. By providing a secure, transparent, and user-friendly platform, the project aims to contribute to the evolution of democratic processes. As the technology advances, further refinements and collaborations can propel decentralized voting systems to the forefront of modern governance.
