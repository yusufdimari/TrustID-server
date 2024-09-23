import { CONTRACT_NAME, initNear } from "config/nearConfig";
import { Router, Request, Response } from "express";
import { Contract as NearContract } from "near-api-js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

interface Contract extends NearContract {
  nft_mint(data: NFT): Promise<NFT>;
  nft_tokens_for_owner({ account_id }: { account_id: string }): Promise<NFT[]>;
}

interface NFT {
  token_id: string;
  metadata: string;
  receiver_id: string;
  perpetual_royalties: { [key: string]: number };
}

router.post("/", async (req: Request, res: Response) => {
  console.log("request received at ", req.url);
  const { account } = await initNear();
  const { data }: { data: NFT } = req.body;
  const contract = new NearContract(account, CONTRACT_NAME, {
    viewMethods: ["getDID"],
    changeMethods: ["nft_mint"],
    useLocalViewExecution: false,
  }) as Contract;

  // Call the contract method and handle the response
  try {
    const result = await contract.nft_mint({
      ...data,
      token_id: account.accountId + "-tcg-team-token",
      receiver_id: account.accountId,
      perpetual_royalties: {
        "yusufdimari.testnet": 500, // 5% royalties
      },
    } as NFT);
    return res.status(200).json({ success: true, data: result });
  } catch (contractError) {
    console.error("Error adding a new NFT:", contractError);
    return res.status(500).json({
      success: false,
      message: "Error adding a DID to the contract",
      error: contractError,
    });
  }
});

router.post("/mint", async (req: Request, res: Response) => {
  console.log("request received at ", req.url);
  const { account } = await initNear();
  const data: NFT = req.body;
  const contract = new NearContract(account, CONTRACT_NAME, {
    viewMethods: [""],
    changeMethods: ["nft_mint"],
    useLocalViewExecution: false,
  }) as Contract;
  const depositAmount = "1000000000000000000000000";
  const tokenID = uuidv4();
  console.log(data);
  // Call the contract method and handle the response
  try {
    const result = await account.functionCall({
      contractId: CONTRACT_NAME,
      methodName: "nft_mint",
      args: {
        ...data,
        token_id: tokenID + "-tcg-team-token",
        receiver_id: data.receiver_id + ".testnet",
        // perpetual_royalties: {
        //   "yusufdimari1.testnet": 500, // 5% royalties
        // },
      },
      gas: BigInt("300000000000000"), // Adjust the gas limit as needed
      attachedDeposit: BigInt(depositAmount), // Attach the deposit here
    });
    // Handle success response
    res.json({ success: true, payload: result });
  } catch (contractError: any) {
    console.error("Error adding a new NFT:", contractError);
    return res.status(500).json({
      success: false,
      message: "Error adding a new NFT",
      error: contractError.message,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  console.log("request received", req.url);
  const { id } = req.query;
  const account_id = id?.toString() + ".testnet";
  const { account } = await initNear();
  const contract = new NearContract(account, CONTRACT_NAME, {
    viewMethods: ["nft_tokens_for_owner"],
    changeMethods: ["nft_mint"],
    useLocalViewExecution: false,
  }) as Contract;
  console.log(account_id);
  // Call the contract method and handle the response
  try {
    const result = await contract.nft_tokens_for_owner({
      account_id: account_id,
    });
    console.log("success", result);
    return res.status(200).json({ success: true, data: result });
  } catch (contractError) {
    console.error("Error getting NFT:", contractError);
    return res.status(500).json({
      success: false,
      message: "Error getting NFT",
      error: contractError,
    });
  }
});

export default router;
