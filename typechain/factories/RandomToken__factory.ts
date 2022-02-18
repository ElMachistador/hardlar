/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { RandomToken, RandomTokenInterface } from "../RandomToken";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeMint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600b81526020017f52616e646f6d546f6b656e0000000000000000000000000000000000000000008152506040518060400160405280600381526020017f52544b0000000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001a6565b508060019080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000256565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b600060028204905060018216806200026f57607f821691505b602082108114156200028657620002856200028c565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b612b5a80620002cb6000396000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c8063715018a6116100a2578063a22cb46511610071578063a22cb465146102a4578063b88d4fde146102c0578063c87b56dd146102dc578063e985e9c51461030c578063f2fde38b1461033c5761010b565b8063715018a6146102425780638da5cb5b1461024c57806395d89b411461026a578063a1448194146102885761010b565b806323b872dd116100de57806323b872dd146101aa57806342842e0e146101c65780636352211e146101e257806370a08231146102125761010b565b806301ffc9a71461011057806306fdde0314610140578063081812fc1461015e578063095ea7b31461018e575b600080fd5b61012a60048036038101906101259190611c5e565b610358565b6040516101379190612064565b60405180910390f35b61014861043a565b604051610155919061207f565b60405180910390f35b61017860048036038101906101739190611cb0565b6104cc565b6040516101859190611ffd565b60405180910390f35b6101a860048036038101906101a39190611c22565b610551565b005b6101c460048036038101906101bf9190611b1c565b610669565b005b6101e060048036038101906101db9190611b1c565b6106c9565b005b6101fc60048036038101906101f79190611cb0565b6106e9565b6040516102099190611ffd565b60405180910390f35b61022c60048036038101906102279190611ab7565b61079b565b60405161023991906122a1565b60405180910390f35b61024a610853565b005b6102546108db565b6040516102619190611ffd565b60405180910390f35b610272610905565b60405161027f919061207f565b60405180910390f35b6102a2600480360381019061029d9190611c22565b610997565b005b6102be60048036038101906102b99190611be6565b610a21565b005b6102da60048036038101906102d59190611b6b565b610a37565b005b6102f660048036038101906102f19190611cb0565b610a99565b604051610303919061207f565b60405180910390f35b61032660048036038101906103219190611ae0565b610b40565b6040516103339190612064565b60405180910390f35b61035660048036038101906103519190611ab7565b610bd4565b005b60007f80ac58cd000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061042357507f5b5e139f000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610433575061043282610ccc565b5b9050919050565b606060008054610449906124c6565b80601f0160208091040260200160405190810160405280929190818152602001828054610475906124c6565b80156104c25780601f10610497576101008083540402835291602001916104c2565b820191906000526020600020905b8154815290600101906020018083116104a557829003601f168201915b5050505050905090565b60006104d782610d36565b610516576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161050d906121e1565b60405180910390fd5b6004600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050919050565b600061055c826106e9565b90508073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156105cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105c490612261565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff166105ec610da2565b73ffffffffffffffffffffffffffffffffffffffff16148061061b575061061a81610615610da2565b610b40565b5b61065a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065190612161565b60405180910390fd5b6106648383610daa565b505050565b61067a610674610da2565b82610e63565b6106b9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b090612281565b60405180910390fd5b6106c4838383610f41565b505050565b6106e483838360405180602001604052806000815250610a37565b505050565b6000806002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610792576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610789906121a1565b60405180910390fd5b80915050919050565b60008073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141561080c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080390612181565b60405180910390fd5b600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b61085b610da2565b73ffffffffffffffffffffffffffffffffffffffff166108796108db565b73ffffffffffffffffffffffffffffffffffffffff16146108cf576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108c690612201565b60405180910390fd5b6108d9600061119d565b565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606060018054610914906124c6565b80601f0160208091040260200160405190810160405280929190818152602001828054610940906124c6565b801561098d5780601f106109625761010080835404028352916020019161098d565b820191906000526020600020905b81548152906001019060200180831161097057829003601f168201915b5050505050905090565b61099f610da2565b73ffffffffffffffffffffffffffffffffffffffff166109bd6108db565b73ffffffffffffffffffffffffffffffffffffffff1614610a13576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a0a90612201565b60405180910390fd5b610a1d8282611263565b5050565b610a33610a2c610da2565b8383611281565b5050565b610a48610a42610da2565b83610e63565b610a87576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7e90612281565b60405180910390fd5b610a93848484846113ee565b50505050565b6060610aa482610d36565b610ae3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ada90612241565b60405180910390fd5b6000610aed61144a565b90506000815111610b0d5760405180602001604052806000815250610b38565b80610b1784611461565b604051602001610b28929190611fd9565b6040516020818303038152906040525b915050919050565b6000600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b610bdc610da2565b73ffffffffffffffffffffffffffffffffffffffff16610bfa6108db565b73ffffffffffffffffffffffffffffffffffffffff1614610c50576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4790612201565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610cc0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cb7906120c1565b60405180910390fd5b610cc98161119d565b50565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b60008073ffffffffffffffffffffffffffffffffffffffff166002600084815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614159050919050565b600033905090565b816004600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16610e1d836106e9565b73ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000610e6e82610d36565b610ead576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ea490612141565b60405180910390fd5b6000610eb8836106e9565b90508073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161480610f2757508373ffffffffffffffffffffffffffffffffffffffff16610f0f846104cc565b73ffffffffffffffffffffffffffffffffffffffff16145b80610f385750610f378185610b40565b5b91505092915050565b8273ffffffffffffffffffffffffffffffffffffffff16610f61826106e9565b73ffffffffffffffffffffffffffffffffffffffff1614610fb7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fae90612221565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611027576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161101e90612101565b60405180910390fd5b61103283838361160e565b61103d600082610daa565b6001600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461108d91906123dc565b925050819055506001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546110e49190612355565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61127d828260405180602001604052806000815250611613565b5050565b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156112f0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112e790612121565b60405180910390fd5b80600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516113e19190612064565b60405180910390a3505050565b6113f9848484610f41565b6114058484848461166e565b611444576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161143b906120a1565b60405180910390fd5b50505050565b606060405180602001604052806000815250905090565b606060008214156114a9576040518060400160405280600181526020017f30000000000000000000000000000000000000000000000000000000000000008152509050611609565b600082905060005b600082146114db5780806114c490612529565b915050600a826114d491906123ab565b91506114b1565b60008167ffffffffffffffff81111561151d577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280601f01601f19166020018201604052801561154f5781602001600182028036833780820191505090505b5090505b600085146116025760018261156891906123dc565b9150600a856115779190612572565b60306115839190612355565b60f81b8183815181106115bf577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600a856115fb91906123ab565b9450611553565b8093505050505b919050565b505050565b61161d8383611805565b61162a600084848461166e565b611669576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611660906120a1565b60405180910390fd5b505050565b600061168f8473ffffffffffffffffffffffffffffffffffffffff166119d3565b156117f8578373ffffffffffffffffffffffffffffffffffffffff1663150b7a026116b8610da2565b8786866040518563ffffffff1660e01b81526004016116da9493929190612018565b602060405180830381600087803b1580156116f457600080fd5b505af192505050801561172557506040513d601f19601f820116820180604052508101906117229190611c87565b60015b6117a8573d8060008114611755576040519150601f19603f3d011682016040523d82523d6000602084013e61175a565b606091505b506000815114156117a0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611797906120a1565b60405180910390fd5b805181602001fd5b63150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149150506117fd565b600190505b949350505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611875576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161186c906121c1565b60405180910390fd5b61187e81610d36565b156118be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016118b5906120e1565b60405180910390fd5b6118ca6000838361160e565b6001600360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461191a9190612355565b92505081905550816002600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b600080823b905060008111915050919050565b60006119f96119f4846122e1565b6122bc565b905082815260208101848484011115611a1157600080fd5b611a1c848285612484565b509392505050565b600081359050611a3381612ac8565b92915050565b600081359050611a4881612adf565b92915050565b600081359050611a5d81612af6565b92915050565b600081519050611a7281612af6565b92915050565b600082601f830112611a8957600080fd5b8135611a998482602086016119e6565b91505092915050565b600081359050611ab181612b0d565b92915050565b600060208284031215611ac957600080fd5b6000611ad784828501611a24565b91505092915050565b60008060408385031215611af357600080fd5b6000611b0185828601611a24565b9250506020611b1285828601611a24565b9150509250929050565b600080600060608486031215611b3157600080fd5b6000611b3f86828701611a24565b9350506020611b5086828701611a24565b9250506040611b6186828701611aa2565b9150509250925092565b60008060008060808587031215611b8157600080fd5b6000611b8f87828801611a24565b9450506020611ba087828801611a24565b9350506040611bb187828801611aa2565b925050606085013567ffffffffffffffff811115611bce57600080fd5b611bda87828801611a78565b91505092959194509250565b60008060408385031215611bf957600080fd5b6000611c0785828601611a24565b9250506020611c1885828601611a39565b9150509250929050565b60008060408385031215611c3557600080fd5b6000611c4385828601611a24565b9250506020611c5485828601611aa2565b9150509250929050565b600060208284031215611c7057600080fd5b6000611c7e84828501611a4e565b91505092915050565b600060208284031215611c9957600080fd5b6000611ca784828501611a63565b91505092915050565b600060208284031215611cc257600080fd5b6000611cd084828501611aa2565b91505092915050565b611ce281612410565b82525050565b611cf181612422565b82525050565b6000611d0282612312565b611d0c8185612328565b9350611d1c818560208601612493565b611d258161265f565b840191505092915050565b6000611d3b8261231d565b611d458185612339565b9350611d55818560208601612493565b611d5e8161265f565b840191505092915050565b6000611d748261231d565b611d7e818561234a565b9350611d8e818560208601612493565b80840191505092915050565b6000611da7603283612339565b9150611db282612670565b604082019050919050565b6000611dca602683612339565b9150611dd5826126bf565b604082019050919050565b6000611ded601c83612339565b9150611df88261270e565b602082019050919050565b6000611e10602483612339565b9150611e1b82612737565b604082019050919050565b6000611e33601983612339565b9150611e3e82612786565b602082019050919050565b6000611e56602c83612339565b9150611e61826127af565b604082019050919050565b6000611e79603883612339565b9150611e84826127fe565b604082019050919050565b6000611e9c602a83612339565b9150611ea78261284d565b604082019050919050565b6000611ebf602983612339565b9150611eca8261289c565b604082019050919050565b6000611ee2602083612339565b9150611eed826128eb565b602082019050919050565b6000611f05602c83612339565b9150611f1082612914565b604082019050919050565b6000611f28602083612339565b9150611f3382612963565b602082019050919050565b6000611f4b602983612339565b9150611f568261298c565b604082019050919050565b6000611f6e602f83612339565b9150611f79826129db565b604082019050919050565b6000611f91602183612339565b9150611f9c82612a2a565b604082019050919050565b6000611fb4603183612339565b9150611fbf82612a79565b604082019050919050565b611fd38161247a565b82525050565b6000611fe58285611d69565b9150611ff18284611d69565b91508190509392505050565b60006020820190506120126000830184611cd9565b92915050565b600060808201905061202d6000830187611cd9565b61203a6020830186611cd9565b6120476040830185611fca565b81810360608301526120598184611cf7565b905095945050505050565b60006020820190506120796000830184611ce8565b92915050565b600060208201905081810360008301526120998184611d30565b905092915050565b600060208201905081810360008301526120ba81611d9a565b9050919050565b600060208201905081810360008301526120da81611dbd565b9050919050565b600060208201905081810360008301526120fa81611de0565b9050919050565b6000602082019050818103600083015261211a81611e03565b9050919050565b6000602082019050818103600083015261213a81611e26565b9050919050565b6000602082019050818103600083015261215a81611e49565b9050919050565b6000602082019050818103600083015261217a81611e6c565b9050919050565b6000602082019050818103600083015261219a81611e8f565b9050919050565b600060208201905081810360008301526121ba81611eb2565b9050919050565b600060208201905081810360008301526121da81611ed5565b9050919050565b600060208201905081810360008301526121fa81611ef8565b9050919050565b6000602082019050818103600083015261221a81611f1b565b9050919050565b6000602082019050818103600083015261223a81611f3e565b9050919050565b6000602082019050818103600083015261225a81611f61565b9050919050565b6000602082019050818103600083015261227a81611f84565b9050919050565b6000602082019050818103600083015261229a81611fa7565b9050919050565b60006020820190506122b66000830184611fca565b92915050565b60006122c66122d7565b90506122d282826124f8565b919050565b6000604051905090565b600067ffffffffffffffff8211156122fc576122fb612630565b5b6123058261265f565b9050602081019050919050565b600081519050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600081905092915050565b60006123608261247a565b915061236b8361247a565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156123a05761239f6125a3565b5b828201905092915050565b60006123b68261247a565b91506123c18361247a565b9250826123d1576123d06125d2565b5b828204905092915050565b60006123e78261247a565b91506123f28361247a565b925082821015612405576124046125a3565b5b828203905092915050565b600061241b8261245a565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b838110156124b1578082015181840152602081019050612496565b838111156124c0576000848401525b50505050565b600060028204905060018216806124de57607f821691505b602082108114156124f2576124f1612601565b5b50919050565b6125018261265f565b810181811067ffffffffffffffff821117156125205761251f612630565b5b80604052505050565b60006125348261247a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612567576125666125a3565b5b600182019050919050565b600061257d8261247a565b91506125888361247a565b925082612598576125976125d2565b5b828206905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560008201527f63656976657220696d706c656d656e7465720000000000000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20746f6b656e20616c7265616479206d696e74656400000000600082015250565b7f4552433732313a207472616e7366657220746f20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f766520746f2063616c6c657200000000000000600082015250565b7f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760008201527f6e6572206e6f7220617070726f76656420666f7220616c6c0000000000000000602082015250565b7f4552433732313a2062616c616e636520717565727920666f7220746865207a6560008201527f726f206164647265737300000000000000000000000000000000000000000000602082015250565b7f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460008201527f656e7420746f6b656e0000000000000000000000000000000000000000000000602082015250565b7f4552433732313a206d696e7420746f20746865207a65726f2061646472657373600082015250565b7f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860008201527f697374656e7420746f6b656e0000000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960008201527f73206e6f74206f776e0000000000000000000000000000000000000000000000602082015250565b7f4552433732314d657461646174613a2055524920717565727920666f72206e6f60008201527f6e6578697374656e7420746f6b656e0000000000000000000000000000000000602082015250565b7f4552433732313a20617070726f76616c20746f2063757272656e74206f776e6560008201527f7200000000000000000000000000000000000000000000000000000000000000602082015250565b7f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60008201527f776e6572206e6f7220617070726f766564000000000000000000000000000000602082015250565b612ad181612410565b8114612adc57600080fd5b50565b612ae881612422565b8114612af357600080fd5b50565b612aff8161242e565b8114612b0a57600080fd5b50565b612b168161247a565b8114612b2157600080fd5b5056fea26469706673582212203e72e302c13e7f50e7e51e35285087273f4e9fd8227901302f5ae8c724bd263864736f6c63430008020033";

export class RandomToken__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<RandomToken> {
    return super.deploy(overrides || {}) as Promise<RandomToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): RandomToken {
    return super.attach(address) as RandomToken;
  }
  connect(signer: Signer): RandomToken__factory {
    return super.connect(signer) as RandomToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RandomTokenInterface {
    return new utils.Interface(_abi) as RandomTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): RandomToken {
    return new Contract(address, _abi, signerOrProvider) as RandomToken;
  }
}