// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Marketplace1155 {

    using SafeMath for uint256;    

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

    event Cancelled(
        address indexed tokenContract,
        uint256 indexed id,
        address indexed owner
    );

    event Sold(
        address indexed tokenContract,
        uint256 indexed id,
        address indexed newOwner,
        address originalOwner
    );

    mapping(address => mapping(uint256 => mapping(address => Listing)))
        public toSell;

    function addOffer(
        address _contract,
        uint256 _id,
        uint256 _amount,
        uint256 _price
    ) public {
        IERC1155 Token = IERC1155(address(_contract));
        require(Token.balanceOf(msg.sender, _id) >= _amount, "Not enough tokens");
        toSell[_contract][_id][msg.sender] = Listing(_amount, _price);
        emit OnSale(_contract, _id, msg.sender, _amount, _price);
    }

    function addBatchOffer(
        address _contract,
        uint256[] memory _ids,
        uint256[] memory _amounts,
        uint256[] memory _prices
    ) public {
        IERC1155 Token = IERC1155(address(_contract));
        uint256 size = _ids.length;

        require(_amounts.length == size, "The size of ids and and amounts should be the same");
        require(_prices.length == size, "The size of ids and and amounts should be the same");

        for (uint256 i = 0; i < size; i++) {
            require(Token.balanceOf(msg.sender, _ids[i]) >= _amounts[i], "Insufficient balance");

            toSell[_contract][_ids[i]][msg.sender] = Listing(_amounts[i], _prices[i]);
            emit OnSale(_contract, _ids[i], msg.sender, _amounts[i], _prices[i] );
        }
    }

    function cancelOffer(address _contract, uint256 _id) public {
        delete toSell[_contract][_id][msg.sender];
        emit Cancelled(_contract, _id, msg.sender);
    }

    function cancelBatchOffer(address _contract, uint256[] memory _ids) public {
        for (uint256 i = 0; i < _ids.length; i++) {
            delete toSell[_contract][_ids[i]][msg.sender];
            emit Cancelled(_contract, _ids[i], msg.sender);
        }
    }

    function acceptOffer(
        address _contract,
        uint256 _id,
        address payable _owner,
        address _to,
        uint256 _amount,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_contract));
        Listing storage listing = toSell[_contract][_id][_owner];
        
        require(_amount > 0);
        require(_amount <= toSell[_contract][_id][_owner].amount, "Not enough stock");
        require(Token.balanceOf(_owner, _id) >= _amount, "Seller no longer owns enough tokens for this transaction");
        require(msg.value == toSell[_contract][_id][_owner].price.mul(_amount));

        Token.safeTransferFrom(_owner, _to, _id, _amount, _data);
        _owner.transfer(msg.value);

        listing.amount = listing.amount.sub(_amount);

        if (toSell[_contract][_id][_owner].amount == 0){
            delete toSell[_contract][_id][_owner];
        }
        emit Sold(_contract, _id, _to, _owner);
    }

    function acceptBatchOffer(
        address _contract,
        uint256[] memory _ids,
        address payable _owner,
        address _to,
        uint256[] memory _amount,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_contract));

        uint256 size = _ids.length;
        uint256 batchPrice = 0;
        uint256[] memory amounts = new uint256[](size);

        require(_amount.length == size);

        for (uint256 i = 0; i < size; i++) {
            require(_amount[i] > 0);
            require( _amount[i] <= toSell[_contract][_ids[i]][_owner].amount, "Not enough stock");

            batchPrice = batchPrice.add(toSell[_contract][_ids[i]][_owner].price.mul(_amount[i]));
            amounts[i] = amounts[i].add(_amount[i]);
        }

        require(msg.value == batchPrice, "Value doesn't match required amount for transaction");

        for (uint256 i = 0; i < size; i++) {
            toSell[_contract][_ids[i]][_owner].amount = toSell[_contract][_ids[i]][_owner].amount.sub(_amount[i]);
            if (toSell[_contract][_ids[i]][_owner].amount == 0) {
                delete toSell[_contract][_ids[i]][_owner];
            }
            emit Sold(_contract, _ids[i], _to, _owner);
        }
        Token.safeBatchTransferFrom(_owner, _to, _ids, amounts, _data);
    }
}
