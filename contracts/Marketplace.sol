// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.2;

// import "./Quotes.sol";


// contract Marketplace {
//     mapping(uint256 => uint256) public price;

//     function toMarket(uint256 _tokenId, uint256 _priceAsked) public {
//         address _seller = msg.sender;
//         address _marketplace = address(this);
//         price[_tokenId] = _priceAsked;
//         ERC721.transferFrom(_seller, _marketplace, _tokenID);
//     }

//     function buyFromMarket(uint256 _tokenId) public payable {
//         address _marketplace = address(this);
//         require(msg.value == price[_tokenId]);
//         ERC721(address(this)).transferFrom(_marketplace, msg.sender, _tokenId);
//         delete (price[_tokenId]);
//     }
// }
