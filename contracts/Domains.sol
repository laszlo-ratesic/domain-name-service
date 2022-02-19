// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import { StringUtils } from "./libraries/StringUtils.sol";
import "hardhat/console.sol";

contract Domains {
    // Domain TLD
    string public tld;

    // 'mapping' data type to store names
    mapping(string => address) public domains;
    // this mapping will store values
    mapping(string => string) public records;

    // Gotta make the contract payable
    constructor(string memory _tld) payable {
        tld = _tld;
        console.log(
            "%s name service deployed", _tld
        );
    }

    // this will give us domain price based on length
    function lengthPrice(string calldata name) public pure returns(uint) {
        uint len = StringUtils.strlen(name);
        require(len > 0);
        if (len == 3) {
            return 5 * 10**17; // 5 MATIC = 5 w/ 18 '0's. Going w/ 0.5 Matic b/c faucets
        } else if (len == 4) {
            return 3 * 10**17; // to go smaller, reduce decimals. This is 0.3 Matic
        } else {
            return 1 * 10**17;
        }
    }

    // register function that adds names to mapping
    function register(string calldata name) public payable{
        // Check that the name is unregistered
        require(domains[name] == address(0));

        uint _price = this.lengthPrice(name);

        // Check if enough Matic was paid in txn
        require(msg.value >= _price, "Not enough MATIC!");

        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    // gives us the domain owner's address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // Check that the owner is the txn sender
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name) public view returns(string memory) {
        return records[name];
    }
}
