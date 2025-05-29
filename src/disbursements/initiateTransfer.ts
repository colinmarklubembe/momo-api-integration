// import axios from "axios";
// import dotenv from "dotenv";
// import { v4 as uuidv4 } from "uuid";
// dotenv.config();

// import { getAccessToken } from "./generateAccessToken";

// const initiateTransfer = async (accessToken: string) => {
//   const transactionId = uuidv4();
//   try {
//     await axios.post(
//       `${process.env.BASE_URL}/disbursement/v1_0/transfer`,
//       {
//         amount: "1000",
//         currency: "EUR",
//         externalId: "123456",
//         payee: {
//           partyIdType: "MSISDN",
//           partyId: "256759525561",
//         },
//         payerMessage: "Salary Payment",
//         payeeNote: "Monthly Salary",
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "X-Reference-Id": transactionId,
//           "X-Target-Environment": process.env.TARGET_ENVIRONMENT,
//           "Ocp-Apim-Subscription-Key":
//             process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     console.log(`Transfer initiated with Transaction ID: ${transactionId}`);
//   } catch (error: any) {
//     console.error(
//       "Error initiating transfer:",
//       error.response?.data || error.message
//     );
//   }
// };

// getAccessToken().then((token: string) => {
//   if (token) {
//     initiateTransfer(token);
//   }
// });

import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
dotenv.config();

export const initiateDisbursement = async (
  accessToken: string,
  msisdn: string,
  amount: number,
  reference: string
): Promise<string> => {
  const transactionId = uuidv4();

  try {
    await axios.post(
      `${process.env.BASE_URL}/disbursement/v1_0/transfer`,
      {
        amount: amount.toString(),
        currency: "EUR",
        externalId: transactionId,
        payee: {
          partyIdType: "MSISDN",
          partyId: msisdn,
        },
        payerMessage: reference,
        payeeNote: reference,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Reference-Id": transactionId,
          "X-Target-Environment": process.env.TARGET_ENVIRONMENT!,
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY!,
          "Content-Type": "application/json",
        },
      }
    );

    console.table({
      Message: "Success",
      TransactionId: transactionId,
      Amount: amount,
      MSISDN: msisdn,
      Reference: reference,
    });

    return transactionId;
  } catch (error: any) {
    console.error(
      "Error initiating transfer:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Transfer failed");
  }
};
