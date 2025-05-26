import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const checkTransferStatus = async (
  accessToken: string,
  referenceId: string
) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/disbursement/v1_0/transfer/${referenceId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
        },
      }
    );
    console.log("Transfer Status:", response.data);
  } catch (error: any) {
    console.error(
      "Error checking transfer status:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    const referenceId = "885453c4-4e0b-4a90-acde-0fb52714fc58";
    checkTransferStatus(token, referenceId);
  }
});
