// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "hardhat/console.sol";

contract Marketplace1155 {
    struct Listing {
        uint256 amount;
        uint256 price;
    }

    event OnSale(
        address indexed tokenContract,
        uint256 indexed tokenId,
        address indexed owner,
        uint256 amount,
        uint256 price
    );

    mapping(address => mapping(uint256 => mapping(address => Listing)))
        public toSell;

    function addOffer(
        address _tokenContract,
        uint256 _tokenId,
        uint256 _amount,
        uint256 _pricePerToken
    ) public {
        IERC1155 Token = IERC1155(address(_tokenContract));
        require(Token.balanceOf(msg.sender, _tokenId) >= _amount);
        uint256 totalPrice = _pricePerToken * _amount;
        toSell[_tokenContract][_tokenId][msg.sender] = Listing(
            _amount,
            totalPrice
        );
        emit OnSale(_tokenContract, _tokenId, msg.sender, _amount, totalPrice);
    }

    function addGroupOffer(
        address _tokenContract,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts,
        uint256[] memory _pricesPerToken
    ) public {
        IERC1155 Token = IERC1155(address(_tokenContract));
        uint256 size = _tokenIds.length;
        require(_amounts.length == size);
        require(_pricesPerToken.length == size);
        for (uint256 i = 0; i < size; i++) {
            require(
                Token.balanceOf(msg.sender, _tokenIds[i]) >= _amounts[i],
                "Not enough balance"
            );
            uint256 totalPrice = _pricesPerToken[i] * _amounts[i];
            toSell[_tokenContract][_tokenIds[i]][msg.sender] = Listing(
                _amounts[i],
                totalPrice
            );
            emit OnSale(
                _tokenContract,
                _tokenIds[i],
                msg.sender,
                _amounts[i],
                totalPrice
            );
        }
    }

    function cancelOffer(address _tokenContract, uint256 _tokenId) public {
        delete toSell[_tokenContract][_tokenId][msg.sender];
    }

    function cancelBatchOffer(
        address _tokenContract,
        uint256[] memory _tokenIds
    ) public {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            delete toSell[_tokenContract][_tokenIds[i]][msg.sender];
        }
    }

    function acceptOffer(
        address _tokenContract,
        uint256 _tokenId,
        address payable _tokenOwner,
        uint256 _amount,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_tokenContract));
        require(
            _amount <= toSell[_tokenContract][_tokenId][_tokenOwner].amount,
            "Not enough stock"
        );
        if (_amount == toSell[_tokenContract][_tokenId][_tokenOwner].amount) {
            require(
                msg.value == toSell[_tokenContract][_tokenId][_tokenOwner].price
            );
            uint256 amount = toSell[_tokenContract][_tokenId][_tokenOwner]
                .amount;
            Token.safeTransferFrom(
                _tokenOwner,
                msg.sender,
                _tokenId,
                amount,
                _data
            );
            _tokenOwner.transfer(msg.value);
            delete toSell[_tokenContract][_tokenId][_tokenOwner];
        }
        if (_amount < toSell[_tokenContract][_tokenId][_tokenOwner].amount) {
            uint256 totalAmount = toSell[_tokenContract][_tokenId][_tokenOwner]
                .amount;
            uint256 totalPrice = toSell[_tokenContract][_tokenId][_tokenOwner]
                .price;
            uint256 singlePrice = totalPrice / totalAmount;
            require(
                msg.value == singlePrice * _amount,
                "Not enough value sent"
            );
            Token.safeTransferFrom(
                _tokenOwner,
                msg.sender,
                _tokenId,
                _amount,
                _data
            );
            toSell[_tokenContract][_tokenId][_tokenOwner].amount -= _amount;
            toSell[_tokenContract][_tokenId][_tokenOwner].price -= (_amount *
                singlePrice);
            _tokenOwner.transfer(msg.value);
            if (toSell[_tokenContract][_tokenId][_tokenOwner].amount == 0) {
                delete toSell[_tokenContract][_tokenId][_tokenOwner];
            }
        }
    }

    function acceptBatchOffer(
        address _tokenContract,
        uint256[] memory _tokenIds,
        address payable _tokenOwner,
        uint256[] memory _amount,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_tokenContract));
        uint256 size = _tokenIds.length;
        uint256 batchPrice = 0;
        uint256[] memory amounts = new uint256[](size);
        for (uint256 i = 0; i < size; i++) {
            require(
                _amount[i] <=
                    toSell[_tokenContract][_tokenIds[i]][_tokenOwner].amount,
                "Not enough stock"
            );
            if (
                _amount[i] ==
                toSell[_tokenContract][_tokenIds[i]][_tokenOwner].amount
            ) {
                batchPrice += toSell[_tokenContract][_tokenIds[i]][_tokenOwner]
                    .price;
                amounts[i] = toSell[_tokenContract][_tokenIds[i]][_tokenOwner]
                    .amount;
            }
            if (
                _amount[i] <
                toSell[_tokenContract][_tokenIds[i]][_tokenOwner].amount
            ) {
                uint256 totalAmount = toSell[_tokenContract][_tokenIds[i]][
                    _tokenOwner
                ].amount;
                uint256 totalPrice = toSell[_tokenContract][_tokenIds[i]][
                    _tokenOwner
                ].price;
                uint256 singlePrice = totalPrice / totalAmount;
                batchPrice += singlePrice * _amount[i];
                amounts[i] = _amount[i];
            }
        }
        require(msg.value == batchPrice, "value doesn't match required amount");
        for (uint256 z = 0; z < size; z++) {
            uint256 totalAmount = toSell[_tokenContract][_tokenIds[z]][
                _tokenOwner
            ].amount;
            uint256 totalPrice = toSell[_tokenContract][_tokenIds[z]][
                _tokenOwner
            ].price;
            uint256 singlePrice = totalPrice / totalAmount;
            toSell[_tokenContract][_tokenIds[z]][_tokenOwner].amount -= _amount[
                z
            ];
            toSell[_tokenContract][_tokenIds[z]][_tokenOwner].price -= (_amount[
                z
            ] * singlePrice);
            if (toSell[_tokenContract][_tokenIds[z]][_tokenOwner].amount == 0){
               delete toSell[_tokenContract][_tokenIds[z]][_tokenOwner];
            }
        }
        Token.safeBatchTransferFrom(
            _tokenOwner,
            msg.sender,
            _tokenIds,
            amounts,
            _data
        );
    }
}
