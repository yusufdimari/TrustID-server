import { CONTRACT_NAME, initNear } from "../config/nearConfig";
import { Contract as NearContract } from "near-api-js";
import { Router, Request, Response } from "express";
import { DIDContractMethods, DIDDocument } from "types/types";
const { v4: uuidv4 } = require("uuid");

type Contract = NearContract & DIDContractMethods;

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log(`Received request at ${req.url}`);

  try {
    const { account } = await initNear();

    const contract = new NearContract(account, CONTRACT_NAME, {
      viewMethods: ["getDID", "getAllDIDs"],
      changeMethods: ["createDID", "updateDID"],
      useLocalViewExecution: false,
    }) as Contract;

    // Call the contract method and handle the response
    try {
      const result = await contract.getAllDIDs();
      return res.status(200).json({ success: true, data: result });
    } catch (contractError) {
      console.error("Error calling getDIDs:", contractError);
      return res.status(500).json({
        success: false,
        message: "Error retrieving DIDs from contract",
        error: contractError, // Include the specific error message
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.get("/did/", async (req: Request, res: Response) => {
  console.log(`Received request at ${req.url}`);

  try {
    const { account } = await initNear();
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid ID" });
    }

    const contract = new NearContract(account, CONTRACT_NAME, {
      viewMethods: ["getDID"],
      changeMethods: ["createDID", "updateDID"],
      useLocalViewExecution: false,
    }) as Contract;

    // Call the contract method and handle the response
    try {
      const result = await contract.getDID({ id: id as string });
      return res.status(200).json({ success: true, data: result });
    } catch (contractError) {
      console.error("Error calling getDID:", contractError);
      return res.status(500).json({
        success: false,
        message: "Error retrieving DID from contract",
        error: contractError, // Include the specific error message
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  console.log(`Received request at ${req.url} with params: ${req.body}`);
  try {
    const { account, near } = await initNear();
    const { data } = req.body;

    if (!data || typeof data != "object" || Array.isArray(data)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid info" });
    }
    const uniqueId = uuidv4();

    const contract = new NearContract(account, CONTRACT_NAME, {
      viewMethods: ["getDID"],
      changeMethods: ["createDID", "updateDID"],
      useLocalViewExecution: false,
    }) as Contract;

    // Call the contract method and handle the response
    try {
      const result = await contract.createDID({
        id: uniqueId,
        ...data,
      } as DIDDocument);
      return res.status(200).json({ success: true, data: result });
    } catch (contractError) {
      console.error("Error adding a new DID:", contractError);
      return res.status(500).json({
        success: false,
        message: "Error adding a DID to the contract",
        error: contractError,
      });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export default router;
