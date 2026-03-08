# 📚 SmartShelf — Decentralized NFT Book Marketplace

<p align="center">
  <img src="public/book-eth-favicon.png" alt="SmartShelf Logo" width="80" />
</p>

<p align="center">
  <strong>Own books. On-chain. Forever.</strong><br/>
  A decentralized marketplace where authors publish books as NFTs and readers truly own what they buy.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Solidity-^0.8.20-363636?logo=solidity" alt="Solidity" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Network-Sepolia-7B3FE4?logo=ethereum" alt="Sepolia" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
</p>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📖 **NFT Publishing** | Authors mint books as ERC-721 tokens with custom metadata |
| 💰 **On-Chain Royalties** | Configurable royalty percentage paid to original authors on every resale |
| 🔐 **Verifiable Ownership** | Blockchain-backed proof of purchase — no platform lock-in |
| 🌐 **IPFS Storage** | Book content hosted on decentralized IPFS via Pinata |
| 🦊 **MetaMask Integration** | Seamless wallet connection with RainbowKit |
| 📚 **Personal Library** | Track and manage your owned book NFTs |
| ✍️ **Author Dashboard** | Publish, manage, and monitor book sales |
| 🎁 **Rewards System** | Earn rewards for platform participation |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui |
| **Blockchain** | Ethereum (Sepolia Testnet) · Solidity ^0.8.20 · OpenZeppelin |
| **Web3** | Wagmi · Viem · RainbowKit · MetaMask |
| **Storage** | IPFS via Pinata |
| **Backend** | Supabase (Auth, Database, Edge Functions) |

---

## 📜 Smart Contract

The `BookNFT` contract is an ERC-721 NFT with built-in royalty distribution, deployed on **Sepolia Testnet**.

**Contract Address:** `0xcCE0eF256d0F0449D024584227B18ceA8c2A5aA7`

### Core Functions

```solidity
/// @dev Publish a new book as an NFT
function publishBook(
    string memory title,
    string memory author,
    string memory tokenURI,
    uint256 price,
    uint256 royaltyPercentage
) public returns (uint256)

/// @dev Purchase a book NFT — royalties are auto-distributed
function purchaseBook(uint256 tokenId) public payable

/// @dev Retrieve on-chain book metadata
function getBook(uint256 tokenId) public view returns (Book memory)
```

### Book Struct

```solidity
struct Book {
    string title;
    string author;
    uint256 price;
    uint256 royaltyPercentage;
    address payable originalAuthor;
}
```

### Events

```solidity
event BookPublished(uint256 indexed tokenId, string title, string author, uint256 price);
event BookPurchased(uint256 indexed tokenId, address indexed buyer, uint256 price);
event RoyaltyPaid(uint256 indexed tokenId, address indexed author, uint256 amount);
```

> The contract inherits from OpenZeppelin's `ERC721`, `ERC721URIStorage`, and `Ownable` — battle-tested, audited building blocks.

---

## 🏛️ Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────────┐
│   React UI  │────▶│  Wagmi/Viem  │────▶│  Sepolia (ETH)  │
│  + Tailwind │     │  + RainbowKit│     │  BookNFT.sol    │
└─────────────┘     └──────────────┘     └─────────────────┘
       │                                          │
       ▼                                          ▼
┌─────────────┐                          ┌─────────────────┐
│  Supabase   │                          │   IPFS/Pinata   │
│  Auth + DB  │                          │  (Book Content) │
└─────────────┘                          └─────────────────┘
```

---

## 🖼️ Pages

- **Home** — Landing page with hero section and featured books
- **Library** — Browse all published book NFTs
- **My Library** — View your owned books
- **Publish** — Author dashboard to mint new book NFTs
- **Reader** — Read purchased book content
- **Rewards** — Track and claim platform rewards
- **Profile** — Manage wallet and account settings

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss proposed changes.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](SmartShelf/blob/main/License) file for details.

---

<p align="center">
  Built with ❤️ for the decentralized future of publishing
</p>
