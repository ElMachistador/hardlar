// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Quotes is ERC721, ERC721Enumerable, Ownable {
    constructor() ERC721("MyToken", "MTK") {}

    mapping(uint256 => uint256) public price;

    function toMarket(uint256 _tokenId, uint256 _priceAsked) public {
        address _seller = msg.sender;
        address _marketplace = address(this);
        price[_tokenId] = _priceAsked;
        transferFrom(_seller, _marketplace, _tokenId);
    }

    function buyFromMarket(uint256 _tokenId) public payable {
        address _marketplace = address(this);
        require(msg.value == price[_tokenId]);
        ERC721(address(this)).transferFrom(_marketplace, msg.sender, _tokenId);
        delete (price[_tokenId]);
    }

    function safeMint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
