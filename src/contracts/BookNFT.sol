// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BookNFT
 * @dev NFT contract for decentralized library books with royalty support
 */
contract BookNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;
    
    struct Book {
        string title;
        string author;
        uint256 price;
        uint256 royaltyPercentage;
        address payable originalAuthor;
    }
    
    mapping(uint256 => Book) public books;
    mapping(uint256 => bool) public bookExists;
    
    event BookPublished(uint256 indexed tokenId, string title, string author, uint256 price);
    event BookPurchased(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event RoyaltyPaid(uint256 indexed tokenId, address indexed author, uint256 amount);
    
    constructor() ERC721("BookNFT", "BOOK") Ownable(msg.sender) {
        _tokenIdCounter = 0;
    }
    
    /**
     * @dev Publish a new book as NFT
     */
    function publishBook(
        string memory title,
        string memory author,
        string memory tokenURI,
        uint256 price,
        uint256 royaltyPercentage
    ) public returns (uint256) {
        require(royaltyPercentage <= 100, "Royalty percentage must be <= 100");
        
        uint256 tokenId = _tokenIdCounter++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        books[tokenId] = Book({
            title: title,
            author: author,
            price: price,
            royaltyPercentage: royaltyPercentage,
            originalAuthor: payable(msg.sender)
        });
        
        bookExists[tokenId] = true;
        
        emit BookPublished(tokenId, title, author, price);
        return tokenId;
    }
    
    /**
     * @dev Purchase a book NFT
     */
    function purchaseBook(uint256 tokenId) public payable {
        require(bookExists[tokenId], "Book does not exist");
        Book memory book = books[tokenId];
        require(msg.value >= book.price, "Insufficient payment");
        
        address currentOwner = ownerOf(tokenId);
        
        // Calculate royalty
        uint256 royaltyAmount = (msg.value * book.royaltyPercentage) / 100;
        uint256 sellerAmount = msg.value - royaltyAmount;
        
        // Transfer royalty to original author
        if (royaltyAmount > 0) {
            book.originalAuthor.transfer(royaltyAmount);
            emit RoyaltyPaid(tokenId, book.originalAuthor, royaltyAmount);
        }
        
        // Transfer payment to current owner
        payable(currentOwner).transfer(sellerAmount);
        
        // Transfer NFT to buyer
        _transfer(currentOwner, msg.sender, tokenId);
        
        emit BookPurchased(tokenId, msg.sender, msg.value);
    }
    
    /**
     * @dev Get book details
     */
    function getBook(uint256 tokenId) public view returns (Book memory) {
        require(bookExists[tokenId], "Book does not exist");
        return books[tokenId];
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
