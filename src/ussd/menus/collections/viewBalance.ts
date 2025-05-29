import { getAccessToken, getAccountBalance } from "../../../collections";

export const viewBalanceMenu = async () => {
  try {
    const token = await getAccessToken();
    if (!token) {
      return "END Could not authenticate. Try again later.";
    }

    const balance = await getAccountBalance(token);
    return `END Your current balance is ${balance.currency} ${balance.availableBalance}. Thank you for using our services.`;
  } catch (err) {
    console.error("getAccountBalance error:", err);
    return "END Failed to retrieve balance. Try again later.";
  }
};
