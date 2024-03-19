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
