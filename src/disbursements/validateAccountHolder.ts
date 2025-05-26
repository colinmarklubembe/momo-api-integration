import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "./generateAccessToken";

const validateAccountHolder = async (
  accessToken: string,
  accountHolderIdType: "MSISDN" | "EMAIL" | "PARTY_CODE",
  accountHolderId: string
) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/disbursement/v1_0/accountholder/${accountHolderIdType}/${accountHolderId}/active`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
        },
      }
    );
    console.log("Account Holder Status:", response.data);
  } catch (error: any) {
    console.error(
      "Error validating account holder:",
      error.response?.data || error.message
    );
  }
};

getAccessToken().then((token: string) => {
  if (token) {
    const accountHolderIdType = "MSISDN";
    const accountHolderId = "256759525561";
    validateAccountHolder(token, accountHolderIdType, accountHolderId);
  }
});
