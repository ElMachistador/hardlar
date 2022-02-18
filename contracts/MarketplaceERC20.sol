// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MarketplaceERC20 {
    struct Listing {
        address owner;
        uint256 tokenAmount;
        uint256 price;
    }

    uint256 private listingN = 0;

    mapping(uint256 => mapping(address => Listing)) public toSell;

    function addOffer(
        address _tokenContract,
        uint256 _amount,
        uint256 _price
    ) public returns (uint256) {
        IERC20 Token = IERC20(address(_tokenContract));
        require(Token.balanceOf(msg.sender) >= _amount);
        uint256 listingId = ++listingN;
        toSell[listingId][_tokenContract] = Listing(
            msg.sender,
            _amount,
            _price
        );
        return listingId;
    }

    function cancelOffer(uint256 _listingId, address _tokenContract) public {
        require(toSell[_listingId][_tokenContract].owner == msg.sender);
        delete (toSell[_listingId][_tokenContract]);
    }

    function acceptOffer(uint256 _listingId, address _tokenContract)
        public
        payable
    {
        IERC20 Token = IERC20(address(_tokenContract));
        require(msg.value == toSell[_listingId][_tokenContract].price);
        address payable owner = payable(
            toSell[_listingId][_tokenContract].owner
        );
        uint256 amount = toSell[_listingId][_tokenContract].tokenAmount;
        Token.transferFrom(owner, msg.sender, amount);
        owner.transfer(msg.value);
    }
}
