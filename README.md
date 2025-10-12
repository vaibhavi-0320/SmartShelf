# SmartShelf
SmartShelf is a decentralized library platform that lets authors publish licensed digital books (or media), guarantees automatic royalty payout, reduces piracy through encrypted-per-copy delivery and traceable watermarks, and gives readers a seamless purchase &amp; read experience via a dApp.

SmartShelf - A Decentralized Library Platform

PAGE 1
SAVITRIBAI PHULE PUNE UNIVERSITY
A Project Report On
SMARTSHELF - A DECENTRALIZED LIBRARY PLATFORM
Submitted Towards The
Partial Fulfillment Of The Requirements Of
BSc in Blockchain Technology
Submitted By
Vaibhavi Agale & Gayatri Nanaware
Under The Guidance of
Assistant Prof. Sahil Shaikh
DEPARTMENT OF TECHNOLOGY
Accepted By
Department of Technology
Savitribai Phule Pune University, Pune

PAGE 2
Abstract
The traditional digital library and content distribution systems rely heavily on centralized servers and third-party intermediaries, which makes them vulnerable to issues such as data breaches, censorship, ownership disputes, manipulation of records, and unfair distribution of revenue. These systems often lack transparency, traceability, and user control, leading to inefficiency and trust deficits between creators, publishers, and readers.
To address these challenges, this paper proposes the use of blockchain technology to build a decentralized library management system, SmartShelf, that ensures transparency, security, and immutability in digital content transactions. SmartShelf leverages the Ethereum blockchain and smart contracts to enable secure publishing, purchasing, and access of e-books and digital content without relying on a central authority.
The use of blockchain's immutable public ledger ensures that each transaction and ownership record is tamper-proof and verifiable. By eliminating intermediaries, SmartShelf enhances trust, reduces operational costs, and accelerates content distribution while providing fair compensation to authors through automated royalty mechanisms. The primary objective of this paper is to explore how blockchain technology can transform digital content management by establishing decentralized ownership, preventing piracy, and automating access through smart contracts. This paper discusses the shortcomings of traditional centralized library systems and demonstrates how blockchain-based solutions can overcome these limitations by offering a transparent, secure, and efficient decentralized platform for digital content management.

PAGE 3
Acknowledgment
It gives me great pleasure and satisfaction to present the final project report on 'SmartShelf - A Decentralized Library Platform.
I am sincerely thankful to my guide, Assistant Prof. Sahil Shaikh, and to the Head of the Department, Dr. Aditya Abhyankar, for their constant encouragement and guidance throughout the project.
I would also like to thank all those who directly or indirectly supported me during the course of this work.

PAGE 4
Contents
Chapter
Title
Page No.
1
SYNOPSIS
7
1.1
Project Title
8
1.2
Internal Guide
8
1.3
Problem Statement
8
1.4
Abstract
8
1.5
Goals and Objectives
9
2
TECHNICAL KEYWORDS
11
2.1
Area of Project
12
2.2
Technical Keywords
13
3
INTRODUCTION
14
3.1
Project Idea
15
3.2
Motivation of the Project
15
4
PROBLEM DEFINITION AND SCOPE
17
4.1
Problem Statement
18
4.1.1
Goals and objectives
18
4.1.2
Statement of scope
19
4.2
Major Constraints
19
4.3
Hardware Resources Required
21
4.4
Software Resources Required
22
5
SOFTWARE REQUIREMENT SPECIFICATION
23
6
DETAILED DESIGN DOCUMENT
37
7
PROJECT IMPLEMENTATION
38
8
SOFTWARE TESTING
39
9
REFERENCES
42


PAGE 5
List of Figures
Figure No.
Title
Page No.
5.1
Use Case Diagram
27
5.2
Entity Relationship Diagram
29
5.3
Level 0 Data Flow Diagram
30
5.4
Level 1 Data Flow Diagram
31
5.5
Activity Diagram
32
5.6
State Chart Diagram
35
6.1
System Architecture Diagram
36
6.2
Class Diagram
37


PAGE 6
List of Tables
Table No.
Title
Page No.
4.1
Hardware Resources
21
4.2
Software Resources
22
5.1
User Profile
25
5.2
Use Cases
26
5.3
Data Description
28
8.1
Test Results - Test ID 1
40
8.2
Test Results - Test ID 2
40
8.3
Test Results - Test ID 3
40
8.4
Test Results - Test ID 4
40
8.5
Test Results - Test ID 5
41


PAGE 7
Chapter 1
SYNOPSIS

PAGE 8
CHAPTER 1. SYNOPSIS
1.1 Project Title
SMARTSHELF - A DECENTRALIZED LIBRARY PLATFORM 

1.2 Internal Guide
Assistant Prof. Sahil Shaikh 
1.3 PROBLEM STATEMENT
Traditional digital content platforms are centralized, leading to issues like censorship, unfair revenue distribution for authors, risk of data breaches, and lack of verifiable ownership for readers. These platforms act as powerful intermediaries, controlling access and sales, which creates a trust deficit and operational inefficiencies. To overcome these issues, a blockchain-based solution is required. It must ensure immutable ownership records, transparent and fair royalty distribution, enhanced security against piracy, and efficiency in content access and management.
1.4 Abstract
The current digital library systems rely on centralized servers, which are prone to single points of failure, censorship, and data manipulation. This conventional method is often opaque, leading to disputes over royalties, content ownership, and unauthorized distribution. To address these issues, this paper proposes the use of blockchain technology to develop a decentralized digital library called SmartShelf, which ensures data integrity, transparency, and security. The blockchain-based SmartShelf model provides an immutable and decentralized public ledger that enhances the accuracy and traceability of content ownership and transactions. By eliminating intermediaries, SmartShelf can automate royalty payments, streamline content access, and reduce operational costs while empowering authors with direct control over their work.
Department of Technology, SPPU 2023-2025 

PAGE 9
CHAPTER 1. SYNOPSIS
The primary objective of this paper is to explore how blockchain technology can revolutionize digital content management by ensuring secure and verifiable ownership, enabling transparent royalty distribution, and preventing piracy through smart contracts. This paper will first discuss the limitations of traditional digital libraries and then examine how the blockchain-based SmartShelf addresses these challenges through a decentralized and automated platform.
1.5 Goals and Objectives
To create a decentralized platform for authors to publish and manage their digital content securely.
To establish a permanent, tamper-proof record of digital content ownership and transaction history on a blockchain network.
To enable digital content to be tokenized as unique assets (NFTs), securely stored, and assigned to a verified user's digital wallet.
The SmartShelf system will use smart contracts to automate and record all transactions related to content purchasing, royalty distribution, and access rights.
Department of Technology, SPPU 2023-2025 

PAGE 10
CHAPTER 1. SYNOPSIS
1.6 RELEVANT MATHEMATICS ASSOCIATED WITH THE PROJECT
System Description:
Input: Author's content metadata, e-book files, reader purchase requests, wallet addresses.
Output: Verified and recorded content ownership (NFTs) and transactions on the Ethereum blockchain.
Success Conditions:
Successful tokenization of digital books and recording of ownership on the blockchain.
Secure storage of digital content (e.g., via IPFS) and retrieval for verified owners.
Efficient and accurate processing of purchase transactions and automated royalty payments.
Failure Conditions:
Inability to validate transactions, leading to incorrect ownership records or failed payments.
Smart contract vulnerabilities or data loss can compromise the integrity of ownership records.
Inefficient algorithms lead to slow transaction processing or high gas fees.
Department of Technology, SPPU 2023-2025 

PAGE 11
Chapter 2
TECHNICAL KEYWORDS

PAGE 12
CHAPTER 2. TECHNICAL KEYWORDS
2.1 AREA OF PROJECT
Digital Publishing Industry: Work with independent authors and small publishers to provide a platform for secure, transparent, and fair distribution of digital books and articles.
Academic Institutions: Collaborate with universities and research organizations to create a decentralized repository for academic papers, ensuring provenance and preventing plagiarism while managing access rights transparently.
Developing Countries: In regions where intellectual property rights are difficult to enforce, a blockchain-based system can offer authors a secure, global platform to publish their work and receive fair compensation directly.
Creator Economy Platforms: Integrate with platforms for artists, writers, and journalists, offering a blockchain backend to manage digital content as ownable assets, enhancing value and enabling new monetization models.
Non-profit & Open Access Initiatives: Support organizations focused on open access to knowledge by providing a framework to manage and track the distribution of free content, ensuring its integrity and acknowledging authorship immutably.
Department of Technology, SPPU 2023-2025 

PAGE 13
CHAPTER 2. TECHNICAL KEYWORDS
2.2 TECHNICAL KEYWORDS
Blockchain 
Smart Contracts 
Decentralization 
Ethereum
IPFS (InterPlanetary File System)
NFT (Non-Fungible Token) / ERC-721
Cryptography 
Digital Wallet (MetaMask)
Web3.js / Ethers.js
Solidity
Gas Fees
User Interface (UI) and User Experience (UX) 
Department of Technology, SPPU 2023-2025 

PAGE 14
Chapter 3
INTRODUCTION

PAGE 15
CHAPTER 3. INTRODUCTION
3.1 Project Idea
A blockchain-based digital library system provides numerous benefits to both authors and readers. It is a robust, transparent, and efficient platform that ensures the security of intellectual property and ownership data through cryptographic principles and decentralization.
A digital library built on blockchain offers features like verifiable ownership, automated and transparent royalty payments, censorship resistance, and enhanced security against piracy.
The encrypted, distributed ledger provides a novel method for recording ownership and transactions, bringing authenticity to digital content management and provenance.
Blockchain technology can be used to build an integrated and secure global library, solving problems related to copyright infringement and unfair compensation, and ensuring creators retain control over their intellectual property.
3.2 MOTIVATION OF THE PROJECT
The primary motivation is to combat digital piracy and ensure authors are fairly compensated for their work.
Using the system, validation of book ownership is possible, as immutable transaction records are stored on a public ledger.
Accelerating the content distribution process by removing intermediaries like traditional publishers and distributors using the SmartShelf platform. Blockchain technology can help create a more secure and transparent digital marketplace.
Department of Technology, SPPU 2023-2025 

PAGE 16
CHAPTER 3. INTRODUCTION
It can help reduce the costs and time associated with publishing and royalty administration.
It could potentially be used to resolve disputes over digital content ownership and usage rights definitively.
Department of Technology, SPPU 2023-2025 

PAGE 17
Chapter 4
PROBLEM DEFINITION AND SCOPE

PAGE 18
CHAPTER 4. PROBLEM DEFINITION AND SCOPE
4.1 PROBLEM STATEMENT
The problems with current digital content platforms include opaque royalty calculations, delayed payments to authors, and the risk of censorship or de-platforming. There is a high prevalence of digital piracy, loss of verifiable ownership for buyers, and the involvement of multiple intermediaries who take a significant cut of the revenue. One of the drawbacks of the current system is that digital files can be easily copied and distributed illegally, diluting the value of the original work.
This process is inefficient. The current centralized system is not secure against data breaches, and tracking the provenance of a digital file is nearly impossible. Currently, digital ownership is often a licensing agreement stored in a company's private database, which is inadequate in terms of true ownership and data security.
4.1.1 Goals and objectives
To create a system that can be used by any author or publisher who wants to digitize and securely distribute their content.
To create a permanent, unbreakable record of ownership for each piece of digital content as an NFT.
To enable digital content ownership to be recorded and assigned to the owner's cryptographic wallet.
The SmartShelf system, using blockchain, is a distributed system that will store all transactions made during the process of buying and selling digital content.
Department of Technology, SPPU 2023-2025 
PAGE 19
CHAPTER 4. PROBLEM DEFINITION AND SCOPE
4.1.2 Statement of scope
The SmartShelf system, using blockchain, is a distributed platform that will store all transactions related to the purchase, sale, and transfer of digital books.
This system can be easily adapted by various content industries by creating a standard framework for digital asset tokenization.
This will be helpful for authors, readers, and the platform itself to manage ownership transfers transparently and will accelerate the process of content delivery and royalty payments.
4.2 MAJOR CONSTRAINTS
Legal and Regulatory Framework: The system must comply with copyright laws and regulations concerning digital assets, which vary by jurisdiction and are still evolving for blockchain technology.
Data Quality and Storage: The quality of metadata for digital content is critical. The system also relies on decentralized storage solutions like IPFS, whose long-term reliability and performance are constrained.
Infrastructure: The system requires robust blockchain infrastructure (e.g., Ethereum network). Network congestion and high gas fees can be a major constraint on usability and affordability.
Human Resources: The project requires skilled personnel with expertise in blockchain development, smart contract security, and front-end technologies.
Department of Technology, SPPU 2023-2025 

PAGE 20
CHAPTER 4. PROBLEM DEFINITION AND SCOPE
Funding: The development and maintenance of a decentralized application, including smart contract audits and gas fees for deployment, can be costly.
Stakeholder Engagement: The success of the platform depends on attracting both authors and readers. Onboarding users unfamiliar with blockchain, wallets, and cryptocurrency is a significant challenge.
Political and Industry Support: The project may face resistance from traditional publishing houses and distributors who benefit from the existing centralized model.
Department of Technology, SPPU 2023-2025 

PAGE 21
CHAPTER 4. PROBLEM DEFINITION AND SCOPE
4.3 HARDWARE RESOURCES REQUIRED
Hardware Resource
Parameter
Minimum Requirement
Justification
Central Processing Unit (CPU)
Speed (GHz)
2.5 or higher
Solidity compilation, running local blockchain, React processing


Cores/Threads
4/8 or higher
Concurrent process handling (e.g., node, front-end server) 
Random Access Memory (RAM)
Capacity (GB)
8 or higher
Storage for local blockchain data, dependencies, and React app 
Graphics Processing Unit (GPU)
Type
Integrated
Not critical for development, but a dedicated GPU helps system performance 


VRAM (GB)
N/A
Not required for core development 
Storage
Type
SSD
Faster read/write for node modules and blockchain data 


Capacity (GB)
256 or higher
Adequate storage for OS, applications, and project files 
Internet Connection
Speed (Mbps)
10 or higher
Stable and fast connection for blockchain interaction and package downloads 

Table 4.1: Hardware resources
Department of Technology, SPPU 2023-2025 

PAGE 22
CHAPTER 4. PROBLEM DEFINITION AND SCOPE
4.4 SOFTWARE RESOURCES REQUIRED
Software Resource
Version
Solidity
0.8.10 or higher
Truffle / Hardhat
5.4.6 or higher
Ganache / Local Node
7.0.0 or higher
MetaMask
Latest version
React.js
17.0.2 or higher
Node.js
16.0.0 or higher
Integrated Development Environment (IDE)
VS Code with Solidity extensions
Ethers.js / Web3.js
5.4.0 or higher
IPFS Client
Latest stable version
Testing Frameworks
Mocha, Chai, Jest
Security Tools
Slither, MythX
Version Control System
Git
Deployment Tools
Docker (optional)


Department of Technology, SPPU 2023-2025 

PAGE 23
Chapter 5
SOFTWARE REQUIREMENT SPECIFICATION

PAGE 24
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.1 INTRODUCTION
The SmartShelf project seeks to revolutionize the digital publishing industry. By providing a decentralized and immutable ledger for digital content ownership, it aims to increase transparency, efficiency, and security in the publishing process, empowering authors and preventing piracy. This project solves critical issues in digital content management by fusing blockchain's inherent properties with modern web technologies, providing a game-changing solution for authors, publishers, and readers seeking secure and verifiable digital transactions.
5.1.1 Purpose and Scope of Document
To give readers a thorough understanding of the blockchain-based digital library initiative. It provides a reference for stakeholders to align their understanding by outlining the project's objectives, scope, and key features. The document's scope includes the project overview, goals, user roles, deliverables, and communication strategies.
5.1.2 Overview of responsibilities of the Developer
The developer for the SmartShelf system is in charge of creating and implementing the smart contracts using Solidity, integrating them with a front-end application created with React.js, and ensuring the system's secure and effective operation. They work with the team to produce a seamless user experience, conduct testing to find and fix flaws, and adhere to coding standards to deliver a trustworthy blockchain-based digital library solution.
Department of Technology, SPPU 2023-2025 

PAGE 25
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.2 USAGE SCENARIO
A user who wants to purchase and own a digital book is a primary usage scenario. They open React. js-built web application, connect their secure MetaMask wallet for authentication, and browse the library. Upon purchasing a book, a smart contract verifies the transaction, transfers the funds to the author, and mints an NFT representing ownership of the book to the user's wallet. This ensures the integrity of the sale and creates an immutable, transparent record of ownership.
5.2.1 User profiles
User Profile
Description
Author
An individual or entity that creates and wishes to publish digital content. They interact with the system to upload their work, set a price, and view their sales and earnings.
Reader / Buyer
An individual who wishes to purchase, own, and read digital content. They interact with the system to browse the library, purchase books, and access their collection of owned content.
Platform Administrator
A role responsible for maintaining the front-end application, curating featured content, and managing platform-level parameters (though not controlling user transactions).


Department of Technology, SPPU 2023-2025

PAGE 26
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.2.2 Use Cases
Use Case
Description
Actors
Assumptions
Publish Book
Authors can publish their digital books securely and transparently on the blockchain, creating a unique token for each.
Author
The system assumes the author has the legal rights to the content they are publishing.
Purchase Book
Readers can purchase ownership of a book using cryptocurrency. The transaction is recorded on the blockchain.
Reader, Author
The system assumes the reader has a valid digital wallet with sufficient funds. The smart contract handles the fund transfer and ownership change.
Access Content
Readers can verify their ownership via their wallet to access and read the content they have purchased.
Reader
The system assumes the data on the blockchain is accurate and can verify the reader's ownership token.


Department of Technology, SPPU 2023-2025 

PAGE 27
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.2.3 Use Case View
Actors: Author, Reader
System Boundary: SmartShelf DApp
Use Cases for Author:
Register/Connect Wallet (includes Authentication)
Upload Book Info
Set Price
View Earnings
Use Cases for Reader:
Register/Connect Wallet (includes Authentication)
Browse Library
View Book Details
Purchase Book
Access Purchased Book
Department of Technology, SPPU 2023-2025 

PAGE 28
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.3 Data Model and Description
5.3.1 Data Description
The SmartShelf project's data set consists of information on book ownership (NFTs), a history of transactions, book metadata (title, author, genre), and the cryptographic wallet addresses of users116. To guarantee transparency, immutability, and accessibility for authorized users, this data is safely kept on the blockchain and referenced via decentralized storage117.
Data
Description
Book Ownership Details
Information about book ownership, including the owner's wallet address and the unique token ID (NFT).
Transaction Records
Records of book purchases, including buyer and seller addresses, date, and transaction amount (price).
Book Metadata
Data describing the book, including title, author name, description, cover image URL (linked from IPFS).
User Identity Information
Public wallet addresses of authors and readers involved in the transactions, ensuring secure and authenticated interactions.


5.3.2 Data objects and Relationships
The SmartShelf project's data objects include Users (Authors/Readers), Books (as NFTs), and Transactions. These are linked through relationships like User-owns-Book and Transaction-involves-User-and-Book, creating a vast and trustworthy data ecosystem for secure content management and verification procedures.
Department of Technology, SPPU 2023-2025 

PAGE 29
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
Entities:
User: (walletAddress (PK), userName)
Book (NFT): (tokenId (PK), title, description, ipfsHash, price)
Transaction: (transactionHash (PK), fromAddress, toAddress, timestamp, value)
Relationships:
A User (Author) creates a Book.
A User (Reader) owns one or more Books.
A Transaction transfers a Book from one User to another.
Department of Technology, SPPU 2023-2025 

PAGE 30
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.3.3 Data Flow Diagram
Level 0 Data Flow Diagram
External Entities: Author, Reader
Process: 0. SmartShelf Platform
Data Stores: Blockchain Ledger, IPFS Storage
Data Flows:
Author -> Platform: Upload Book Details
Platform -> IPFS: Store Book File
Platform -> Blockchain: Mint NFT, Record Transaction
Reader -> Platform: Purchase Request
Blockchain -> Platform: Ownership Verification
IPFS -> Platform: Retrieve Book File
Platform -> Reader: Display Book
Department of Technology, SPPU 2023-2025 

PAGE 31
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
Level 1 Data Flow Diagram
Processes:
1.0 Manage User Account
2.0 Manage Library
3.0 Process Purchase
4.0 Access Content
Data Flows: Shows detailed data exchange between users, processes, and data stores (Blockchain, IPFS). For example, a Purchase Request from a Reader goes to Process 3.0, which interacts with the Blockchain to verify funds and transfer ownership, and then updates the user's owned books list.
Department of Technology, SPPU 2023-2025 

PAGE 32
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.3.4 Activity Diagram:
Start -> Landing Page
Connect Wallet
Browse Library
Select Book
[Decision] Interested?
No -> Browse Library
Yes -> Click Purchase
[Fork]
Smart Contract: Transfer Funds
Smart Contract: Mint & Transfer NFT
[Join]
Update User's Owned Books
[Decision] Read Now?
No -> End
Yes -> Access Content -> End
Department of Technology, SPPU 2023-2025 

PAGE 33
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.3.5 Non-Functional Requirements
Security: To safeguard author content and user funds, the system must employ robust smart contract security practices, undergo audits, and prevent unauthorized access.
Scalability: The system should handle a growing number of books, users, and transactions without significant performance degradation or prohibitive gas costs.
Reliability: The DApp must be highly dependable to guarantee correct and timely transactions and content access. It should minimize downtime and ensure data integrity.
Transparency: The blockchain-based system ought to make all transactions and ownership records publicly verifiable, allowing any interested party to confirm data on a block explorer.
Usability: The system should have an intuitive user interface that abstracts away the complexities of blockchain, making it simple for non-technical authors and readers to use.
Interoperability: The ownership tokens (NFTs) should adhere to the ERC-721 standard, allowing them to be recognized and traded on external NFT marketplaces.
Performance: In terms of response times and transaction processing speed, the DApp should perform well. The front-end should be optimized for fast loading and interaction.
Department of Technology, SPPU 2023-2025 

PAGE 34
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
Compliance: The system should be designed with consideration for evolving regulations around digital assets and intellectual property.
Disaster Recovery: Since the core logic and data are on the decentralized blockchain, the system is inherently resilient. Front-end hosting and decentralized file storage (IPFS) should have redundancy plans.
Auditability: To track all platform activities, the system should offer thorough auditing capabilities via the public blockchain ledger. All smart contract events should be logged for easy monitoring.
Department of Technology, SPPU 2023-2025

PAGE 35
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.3.6 State Diagram
[Start] -> Available for Sale
On Purchase Event -> Sold (Owned by Reader)
Sold (Owned by Reader)
On Transfer Event (e.g., secondary sale) -> Sold (Owned by New Reader)
On Burn Event (optional) -> [End]
5.3.7 Design Constraints
Regulatory Compliance: The platform must navigate the ambiguous legal landscape of NFTs as they relate to copyright and digital ownership.
Blockchain Limitations: The system is constrained by the throughput, latency, and transaction costs (gas fees) of the underlying Ethereum blockchain.
Interoperability: To ensure data consistency, the smart contracts must strictly adhere to established standards like ERC-721.
Department of Technology, SPPU 2023-2025 

PAGE 36
CHAPTER 5. SOFTWARE REQUIREMENT SPECIFICATION
5.3.8 System Architecture Diagram
Frontend (Client-Side): React.js, Web3.js/Ethers.js, MetaMask. This is the user interface that users interact with.
Backend (Smart Contracts): Solidity contracts deployed on the Ethereum Blockchain. This handles all logic for minting, purchasing, and ownership.
Decentralized Storage: IPFS for storing the actual e-book files and cover images securely. The blockchain stores the IPFS hash, not the file itself.
Blockchain Network: Ethereum Mainnet or a Testnet. Provides the decentralized, immutable ledger for all transactions.
5.3.9 Software Interface Description
To securely exchange data and verify ownership, the SmartShelf system communicates with external interfaces such as the public Ethereum blockchain, the decentralized IPFS network, and the user's MetaMask wallet for signing transactions.
Department of Technology, SPPU 2023-2025 

PAGE 37
Chapter 6
DETAILED DESIGN DOCUMENT
6.1 Class Diagram
User Class:
Attributes: walletAddress
Methods: connectWallet(), getOwnedBooks()
BookNFT (Smart Contract) Class:
Attributes: bookId, title, authorAddress, price, ipfsHash
Methods: mintBook(), purchaseBook(), getBookDetails()
Library Class (Front-end Component):
Attributes: bookList
Methods: fetchAllBooks(), displayBooks()
Wallet (MetaMask) Class:
Attributes: userAddress, balance
Methods: signTransaction(), sendTransaction()

PAGE 38
Chapter 7
PROJECT IMPLEMENTATION

PAGE 39
Chapter 8
SOFTWARE TESTING
8.1 Types of Tests Performed
Smart Contract Tests: Unit testing each function of the Solidity smart contracts (e.g., minting, purchasing) using frameworks like Hardhat/Truffle.
Blockchain Integration Tests: Testing the interaction between the React front-end and the deployed smart contracts on a local or test network.
User Interface Tests: Testing the front-end components for functionality and user experience.
End-to-End Transaction Flow Tests: Simulating the full user journey from connecting a wallet to purchasing a book and verifying ownership.
Security Audits: Analyzing smart contracts for common vulnerabilities (e.g., reentrancy, integer overflow).
Performance Tests: Assessing the DApp's responsiveness and the gas efficiency of smart contract functions.
Usability Tests: Gathering feedback from users on the ease of use of the platform.
Regression Tests: Ensuring new changes do not break existing functionality.

PAGE 40
CHAPTER 8. SOFTWARE TESTING
8.2 Test Cases & Test Results
Test ID
Test Description
Input Data
Expected Data
Actual Data
Status


1
Hardhat Installation
N/A
Successful installation of the Hardhat framework
Successful installation
Pass




Table 8.1: Test Results - Test ID 1 












Test ID
Test Description
Input Data
Expected Data
Actual Data
Status


2
Ganache Setup
N/A
Local blockchain network running
Local blockchain network running
Pass




Table 8.2: Test Results - Test ID 2 












Test ID
Test Description
Input Data
Expected Data
Actual Data
Status


3
Solidity Contract Deployment
Smart contract files
Successful deployment on blockchain
Successful deployment
Pass




Table 8.3: Test Results - Test ID 3 












Test ID
Test Description
Input Data
Expected Data
Actual Data
Status


4
React.js Integration
Front-end components
Successful integration for user interface
Successful integration
Pass




Table 8.4: Test Results - Test ID 4 











Department of Technology, SPPU 2023-2025 

PAGE 41
CHAPTER 8. SOFTWARE TESTING
Test ID
Test Description
Input Data
Expected Data
Actual Data
Status


5
MetaMask Integration
MetaMask plugin
Successful integration for blockchain interaction
Successful integration
Pass




Table 8.5: Test Results - Test ID 5 (Adapted from )












PAGE 42
References
[1] Nakamoto, S. "Bitcoin: A Peer-to-Peer Electronic Cash System." 2008.

[2] Wood, G. "Ethereum: A Secure Decentralized Generalized Transaction Ledger." Ethereum Project Yellow Paper, 2014.

[3] Benet, J. "IPFS - Content Addressed, Versioned, P2P File System." arXiv preprint arXiv:1407.3561, 2014.

[4] William Entriken, et al. "EIP-721: Non-Fungible Token Standard." Ethereum Improvement Proposals, 2018.

[5] Z. Wang, Q. Wang, and G. Chen, "A survey on blockchain for digital rights management," Peer-to-Peer Networking and Applications, vol. 14, pp. 1-18, 2021.

[6] A. G. G. Ferreira, L. F. P. Oliveira, and W. S. L. de Sousa, "A Blockchain-Based Platform for Digital Content Management," in 2021 IEEE International Conference on Systems, Man, and Cybernetics (SMC), pp. 1234-1239, 2021.

[7] M. Ma, S. Shi, and Y. Gao, "A Decentralized Digital Copyright Management System Based on Blockchain and Smart Contracts," in 2020 IEEE 4th Information Technology, Networking, Electronic and Automation Control Conference (ITNEC), pp. 567-571, 2020.

PAGE 43
REFERENCES
[8] L. A. D. C. de Castro, and A. L. L. de Oliveira, "Using NFTs to Represent Digital Content Ownership: A Systematic Review," Journal of Network and Computer Applications, vol. 199, p. 103311, 2022.

[9] S. M. Ali, M. S. Obaidat, and P. Shah, "A survey on the application of blockchain in publishing and digital libraries," Journal of Information Science, vol. 47, no. 5, pp. 547-563, 2021.

[10] R. Sharma, S. Tanwar, and N. Kumar, "A Decade of Blockchain: A Systematic Literature Review," IEEE Access, vol. 8, pp. 67458-67481, 2020.
Department of Technology, SPPU 2023-2025 

