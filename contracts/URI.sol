// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract URIToken is ERC1155, Ownable {

    mapping(uint256 => string) public tokenUri;

    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant COPPER = 2;
    uint256 public constant SUPERCUTEKITTY = 3;

    constructor() ERC1155("/assets/nft/{id}.json") {
        _mint(msg.sender, GOLD, 100, "");
        _mint(msg.sender, SILVER, 200, "");
        _mint(msg.sender, COPPER, 300, "");
        _mint(msg.sender, SUPERCUTEKITTY, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setTokenUri(uint256 _id, string memory _uri) public {
        tokenUri[_id] = _uri;
    }

    function uri(uint256 _id) override public view returns(string memory){
        return tokenUri[_id];
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        string memory _uri,
        bytes memory data
    ) public onlyOwner {
        _mint(account, id, amount, data);
        setTokenUri(id, _uri);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    }
}
