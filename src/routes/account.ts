import { createAccount } from "accounts/create-testnet-account";
import { error } from "console";
import { Router, Request, Response } from "express";

interface Account {
  newAccountId: string;
  amount?: string;
}

const router = Router();
router.post("/create-account", async (req: Request, res: Response) => {
  const { newAccountId, amount }: Account = req.body.data;
  try {
    const r = await createAccount(newAccountId, amount);
    if (r.final_execution_status != "EXECUTED") {
      return res.status(400).json({
        success: false,
        error: "Error creating account",
      });
    }
    res.status(200).json({
      success: true,
      payload: {
        receipts_outcome: r.receipts_outcome,
        transaction: r.transaction,
        transaction_outcome: r.transaction_outcome,
      },
    });
  } catch (error) {}
});
export default router;
