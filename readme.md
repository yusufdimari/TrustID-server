# TrustID Backend

## Overview

The TrustID backend is a Node.js application designed to manage Decentralized Identifiers (DIDs) on the NEAR blockchain. This backend service interacts with the NEAR smart contract to handle DID creation, updates, and retrieval. It provides a REST API for the frontend to communicate with the NEAR contract.

## Features

- **Create DID Document:** Endpoint to create a new DID document on the NEAR blockchain.
- **Update DID Document:** Endpoint to update an existing DID document.
- **Retrieve DID Document:** Endpoint to fetch details of a specific DID document.
- **List All DIDs:** Endpoint to retrieve all DID documents.

## Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).
- **NEAR Account:** Set up a NEAR account and obtain testnet credentials. You can create an account at [NEAR Wallet](https://wallet.testnet.near.org).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repository/trustid-backend.git
   cd trustid-backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure NEAR API**

   Create a `.env` file in the root directory of the project and add your NEAR testnet configuration:

   ```plaintext
   NEAR_NETWORK_ID=testnet
   NEAR_NODE_URL=https://rpc.testnet.near.org
   NEAR_CONTRACT_NAME=your-contract-name.testnet
   ```

4. **Start the Server**

   ```bash
   npm start
   ```

   The backend server will start on port 5005 by default. You can change the port in the `.env` file if needed.

## API Endpoints

### Create DID Document

- **Endpoint:** `POST /TrustID/v1/documents/`
- **Request Body:**

  ```json
  {
    "publicKey": "ed25519:...",
    "serviceEndpoint": "https://..."
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "id": "unique-did-id",
      "publicKey": "ed25519:...",
      "serviceEndpoint": "https://..."
    }
  }
  ```

### Update DID Document

- **Endpoint:** `PUT /TrustID/v1/documents/`
- **Request Body:**

  ```json
  {
    "id": "unique-did-id",
    "publicKey": "ed25519:...",
    "serviceEndpoint": "https://..."
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "id": "unique-did-id",
      "publicKey": "ed25519:...",
      "serviceEndpoint": "https://..."
    }
  }
  ```

### Retrieve DID Document

- **Endpoint:** `GET /TrustID/v1/documents/:id`
- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "id": "unique-did-id",
      "publicKey": "ed25519:...",
      "serviceEndpoint": "https://..."
    }
  }
  ```

### List All DIDs

- **Endpoint:** `GET /TrustID/v1/documents/`
- **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "id": "unique-did-id1",
        "publicKey": "ed25519:...",
        "serviceEndpoint": "https://..."
      },
      {
        "id": "unique-did-id2",
        "publicKey": "ed25519:...",
        "serviceEndpoint": "https://..."
      }
    ]
  }
  ```

## Code Structure

- **`src/`** - Contains the source code for the backend.
  - **`routes/`** - API route handlers.
    - **`documents.ts`** - Handles endpoints for DID documents.
  - **`services/`** - NEAR API integration and service-related code.
    - **`nearService.ts`** - Manages NEAR contract interactions.
  - **`config/`** - Configuration files and constants.
  - **`index.ts`** - Main entry point of the server application.

## Contributing

If you want to contribute to the development of this backend, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [dimarijnr@gmail.com](mailto:dimarijnr@gmail.com).

---
