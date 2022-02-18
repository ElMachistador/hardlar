// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


contract Marketplace721 {

    IERC721 MyToken;

    mapping(address => mapping(uint256 => uint256)) public price;

    event OnSale(address indexed _contractAddress, uint256 indexed _tokenId, uint256 _priceAsked );


    function toMarket(address _tokenAddress, uint256 _tokenId, uint256 _priceAsked) public {
        IERC721 token = IERC721(address(_tokenAddress));
        require(msg.sender == token.ownerOf(_tokenId));
        price[_tokenAddress][_tokenId] = _priceAsked;
        emit OnSale(_tokenAddress, _tokenId, _priceAsked);
    }
 
    function buyFromMarket(address _tokenAddress, uint256 _tokenId) public payable {
        require(msg.value == price[_tokenAddress][_tokenId]);
        IERC721 token = IERC721(address(_tokenAddress));
        address payable owner = payable(token.ownerOf(_tokenId));
        token.transferFrom(owner, msg.sender, _tokenId);
        owner.transfer(msg.value);
        delete price[_tokenAddress][_tokenId];
    }

}
 