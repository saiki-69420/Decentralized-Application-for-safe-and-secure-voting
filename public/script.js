
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
