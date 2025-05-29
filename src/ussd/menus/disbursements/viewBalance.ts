import { getAccessToken, getAccountBalance } from "../../../disbursements";

export const viewDisbursementBalanceMenu = async (input: string[]) => {
  try {
    const token = await getAccessToken();
    const balanceData = await getAccountBalance(token);

    const amount = balanceData.availableBalance || "0";
    const currency = balanceData.currency || "UGX";

    return `END Disbursement Balance:\n${currency} ${amount}`;
  } catch (err: any) {
    console.error("getAccountBalance error:", err.message || err);
    return "END Failed to fetch balance. Try again later.";
  }
};
