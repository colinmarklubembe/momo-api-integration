import { getAccessToken, getTransactionStatus } from "../../../collections";
import { formatTransactionStatus } from "../../../utils";

export const checkPaymentStatusMenu = async (input: string[]) => {
  const level = input.length;
  let response = "";

  if (level === 1) {
    response = "CON Enter Transaction ID to check status:";
  } else if (level === 2) {
    const [_, transactionId] = input;

    if (!transactionId || transactionId.trim().length < 5) {
      return "CON Invalid Transaction ID. Please enter a valid one:";
    }

    try {
      const token = await getAccessToken();
      if (!token) {
        return "END Could not authenticate. Try again later.";
      }

      const status = await getTransactionStatus(token, transactionId.trim());

      response = `END Transaction Status:\n \n ${formatTransactionStatus(
        status
      )}`;
    } catch (err) {
      console.error("getTransactionStatus error:", err);
      response = "END Failed to check status. Try again later.";
    }
  } else {
    response = "END Invalid input. Please start again.";
  }

  return response;
};
