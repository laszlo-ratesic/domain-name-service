// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    // 'mapping' data type to store names
    mapping(string => address) public domains;

    // this mapping will store values
    mapping(string => string) public records;

    constructor() {
        console.log(
            "Blasting off to the web3 moon, once again! Let's go to BUILDSPACE!"
        );
    }

    // register function that adds names to mapping
    function register(string calldata name) public {
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    // gives us the domain owner's address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }
}
