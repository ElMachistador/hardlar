// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract URIToken is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant COPPER = 3;
    uint256 public constant SUPERCUTEKITTY = 4;

    constructor() ERC1155("/assets/nft/{id}.json") {
        _mint(msg.sender, GOLD, 100, "");
        _mint(msg.sender, SILVER, 200, "");
        _mint(msg.sender, COPPER, 300, "");
        _mint(msg.sender, SUPERCUTEKITTY, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }
}
