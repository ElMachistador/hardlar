// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Marketplace1155 {
    struct Listing {
        address owner;
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

    event Cancelled(
        address indexed tokenContract,
        uint256 indexed tokenId,
        address indexed owner
    );

    event Accepted(
        address indexed tokenContract,
        uint256 indexed tokenId,
        address indexed newOwner
    );

    mapping(uint256 => mapping(address => Listing)) public toSell;

    function addOffer(
        address _tokenContract,
        uint256 _tokenId,
        uint256 _amount,
        uint256 _price
    ) public {
        IERC1155 Token = IERC1155(address(_tokenContract));
        require(Token.balanceOf(msg.sender, _tokenId) >= _amount);
        toSell[_tokenId][_tokenContract] = Listing(msg.sender, _amount, _price);
        emit OnSale(_tokenContract, _tokenId, msg.sender, _amount, _price);
    }

    function addGroupOffer(
        address _tokenContract,
        uint256[] memory _tokenIds,
        uint256[] memory _amounts,
        uint256[] memory _prices
    ) public {
        IERC1155 Token = IERC1155(address(_tokenContract));
        uint256 size = _tokenIds.length;
        require(_amounts.length == size);
        require(_prices.length == size);
        for (uint256 i = 0; i < size; i++) {
            require(
                Token.balanceOf(msg.sender, _tokenIds[i]) >= _amounts[i],
                "Not enough balance"
            );
            toSell[_tokenIds[i]][_tokenContract] = Listing(
                msg.sender,
                _amounts[i],
                _prices[i]
            );
            emit OnSale(
                _tokenContract,
                _tokenIds[i],
                msg.sender,
                _amounts[i],
                _prices[i]
            );
        }
    }

    function cancelOffer(address _tokenContract, uint256 _tokenId) public {
        require(toSell[_tokenId][_tokenContract].owner == msg.sender);
        emit Cancelled(_tokenContract, _tokenId, msg.sender);
        delete (toSell[_tokenId][_tokenContract]);
    }

    function cancelBatchOffer(
        address _tokenContract,
        uint256[] memory _tokenIds
    ) public {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(toSell[_tokenIds[i]][_tokenContract].owner == msg.sender);
            emit Cancelled(_tokenContract, _tokenIds[i], msg.sender);
            delete (toSell[_tokenIds[i]][_tokenContract]);
        }
    }

    function acceptOffer(
        address _tokenContract,
        uint256 _tokenId,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_tokenContract));
        require(msg.value == toSell[_tokenId][_tokenContract].price);
        address payable owner = payable(toSell[_tokenId][_tokenContract].owner);
        uint256 amount = toSell[_tokenId][_tokenContract].amount;
        Token.safeTransferFrom(owner, msg.sender, _tokenId, amount, _data);
        owner.transfer(msg.value);
        emit Accepted(_tokenContract, _tokenId, msg.sender);
    }

    function acceptBatchOffer(
        address _tokenContract,
        uint256[] memory _tokenIds,
        bytes memory _data
    ) public payable {
        IERC1155 Token = IERC1155(address(_tokenContract));
        uint256 size = _tokenIds.length;
        uint256 batchPrice = 0;
        uint256[] memory amounts = new uint256[](size);
        for (uint256 i = 0; i < size; i++) {
            batchPrice += toSell[_tokenIds[i]][_tokenContract].price;
            amounts[i] = toSell[_tokenIds[i]][_tokenContract].amount;
        }
        address payable batchOwner = payable(
            toSell[_tokenIds[0]][_tokenContract].owner
        );
        require(msg.value == batchPrice, "value doesn't match required amount");
        for (uint256 z = 0; z < size; z++) {
            emit Accepted(_tokenContract, _tokenIds[z], msg.sender);
        }
        Token.safeBatchTransferFrom(
            batchOwner,
            msg.sender,
            _tokenIds,
            amounts,
            _data
        );
    }
}
