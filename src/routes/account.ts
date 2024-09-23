import { WalletConnection } from "near-api-js";
import { initNear } from "../config/nearConfig";
import { Router, Request, Response } from "express";
import { createAccount } from "accounts/create-testnet-account";
import { createUserAccount } from "accounts/initAccount";

interface Account {
  username: string;
  amount?: string;
  email: string;
  password: string;
}

const router = Router();
router.post("/create-account", async (req: Request, res: Response) => {
  const { username, email, password }: Account = req.body;
  try {
    const { data, error } = await createAccount(username, "0");
    if (data?.final_execution_status != "EXECUTED" || error) {
      return res.status(400).json({
        success: false,
        message: "Error creating account",
        error: error,
      });
    }
    const user = await createUserAccount({
      email: email,
      password: password,
      displayName: username,
    });

    res.status(200).json({
      success: true,
      payload: {
        user: user,
        wallet: {
          receipts_outcome: data.receipts_outcome,
          transaction: data.transaction,
          transaction_outcome: data.transaction_outcome,
        },
      },
    });
  } catch (error: any) {
    const errorMessage =
      error.kind?.kind?.FunctionCallError.ExecutionError ||
      error.message ||
      error;
    console.error("couldd not create account", errorMessage);
    return res.status(400).json({
      success: false,
      message: "Error creating account",
      error: errorMessage,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  console.log("Trying to Login");
  const { account, near } = await initNear();
  try {
    const wallet = new WalletConnection(near, "trustID");
    const response = await wallet.requestSignIn({ keyType: "ed25519" });
    res.status(200).json({
      success: true,
      payload: response,
    });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      success: false,
      error: error,
    });
  }
});
export default router;
