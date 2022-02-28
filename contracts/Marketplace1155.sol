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
        uint256 indexed id,
        address indexed owner,
        uint256 amount,
        uint256 price
    );

    mapping(address => mapping(uint256 => mapping(address => Listing)))
        public toSell;

    function addOffer(
        address _contract,
        uint256 _id,
        uint256 _amount,
        uint256 _pricePerToken
    ) public {
        IERC1155 Token = IERC1155(address(_contract));
        require(Token.balanceOf(msg.sender, _id) >= _amount);
        uint256 totalPrice = _pricePerToken * _amount;
        toSell[_contract][_id][msg.sender] = Listing(_amount, totalPrice);
        emit OnSale(_contract, _id, msg.sender, _amount, totalPrice);
    }

    function addBatchOffer(
        address _contract,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _pricesPerToken
    ) public {
        IERC1155 Token = IERC1155(address(_contract));
        uint256 size = _ids.length;
        require(_amounts.length == size);
        require(_pricesPerToken.length == size);
        for (uint256 i = 0; i < size; i++) {
            require(
                Token.balanceOf(msg.sender, _ids[i]) >= _amounts[i],
                "Not enough balance"
            );
            uint256 totalPrice = _pricesPerToken[i] * _amounts[i];
            toSell[_contract][_ids[i]][msg.sender] = Listing(
                _amounts[i],
                totalPrice
            );
            emit OnSale(
                _contract,
                _ids[i],
                msg.sender,
                _amounts[i],
                totalPrice
            );
        }
    }

    function cancelOffer(address _contract, uint256 _id) public {
        delete toSell[_contract][_id][msg.sender];
    }

    function cancelBatchOffer(address _contract, uint256[] memory _ids) public {
        for (uint256 i = 0; i < _ids.length; i++) {
            delete toSell[_contract][_ids[i]][msg.sender];
        }
    }

    function acceptOffer(
        address _contract,
        uint256 _id,
        address payable _owner,
        uint256 _amount,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_contract));
        require(
            _amount <= toSell[_contract][_id][_owner].amount,
            "Not enough stock"
        );
        if (_amount == toSell[_contract][_id][_owner].amount) {
            require(msg.value == toSell[_contract][_id][_owner].price);
            uint256 amount = toSell[_contract][_id][_owner].amount;
            Token.safeTransferFrom(_owner, msg.sender, _id, amount, _data);
            _owner.transfer(msg.value);
            delete toSell[_contract][_id][_owner];
        }
        if (_amount < toSell[_contract][_id][_owner].amount) {
            uint256 totalAmount = toSell[_contract][_id][_owner].amount;
            uint256 totalPrice = toSell[_contract][_id][_owner].price;
            uint256 singlePrice = totalPrice / totalAmount;
            require(
                msg.value == singlePrice * _amount,
                "Not enough value sent"
            );
            Token.safeTransferFrom(_owner, msg.sender, _id, _amount, _data);
            toSell[_contract][_id][_owner].amount -= _amount;
            toSell[_contract][_id][_owner].price -= (_amount * singlePrice);
            _owner.transfer(msg.value);
            if (toSell[_contract][_id][_owner].amount == 0) {
                delete toSell[_contract][_id][_owner];
            }
        }
    }

    function acceptBatchOffer(
        address _contract,
        uint256[] memory _ids,
        address payable _owner,
        uint256[] memory _amount,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_contract));
        uint256 size = _ids.length;
        uint256 batchPrice = 0;
        uint256[] memory amounts = new uint256[](size);
        for (uint256 i = 0; i < size; i++) {
            require(
                _amount[i] <= toSell[_contract][_ids[i]][_owner].amount,
                "Not enough stock"
            );
            if (_amount[i] == toSell[_contract][_ids[i]][_owner].amount) {
                batchPrice += toSell[_contract][_ids[i]][_owner].price;
                amounts[i] = toSell[_contract][_ids[i]][_owner].amount;
            }
            if (_amount[i] < toSell[_contract][_ids[i]][_owner].amount) {
                uint256 totalAmount = toSell[_contract][_ids[i]][_owner].amount;
                uint256 totalPrice = toSell[_contract][_ids[i]][_owner].price;
                uint256 singlePrice = totalPrice / totalAmount;
                batchPrice += singlePrice * _amount[i];
                amounts[i] = _amount[i];
            }
        }
        require(msg.value == batchPrice, "value doesn't match required amount");
        for (uint256 i = 0; i < size; i++) {
            uint256 totalAmount = toSell[_contract][_ids[i]][_owner].amount;
            uint256 totalPrice = toSell[_contract][_ids[i]][_owner].price;
            uint256 singlePrice = totalPrice / totalAmount;
            toSell[_contract][_ids[i]][_owner].amount -= _amount[i];
            toSell[_contract][_ids[i]][_owner].price -= (_amount[i] *
                singlePrice);
            if (toSell[_contract][_ids[i]][_owner].amount == 0) {
                delete toSell[_contract][_ids[i]][_owner];
            }
        }
        Token.safeBatchTransferFrom(_owner, msg.sender, _ids, amounts, _data);
    }
}
