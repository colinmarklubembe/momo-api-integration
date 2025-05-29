import { getAccessToken, initiateRefund } from "../../../disbursements";
import { v4 as uuidv4 } from "uuid";

export const initiateRefundMenu = async (input: string[]) => {
  const level = input.length;

  if (level === 2) {
    return "CON Enter original payment reference ID:";
  }

  const referenceIdToRefund = input[2]?.trim();
  if (!referenceIdToRefund) {
    return "CON Invalid reference ID. Please enter again:";
  }

  if (level === 3) {
    return "CON Enter amount to refund (UGX):";
  }

  const amountStr = input[3]?.trim() || "";
  const amount = parseFloat(amountStr);
  if (isNaN(amount) || amount <= 0) {
    return "CON Invalid amount. Enter a positive number:";
  }

  if (level === 4) {
    return "CON Enter message to payer (e.g. Duplicate charge):";
  }

  const payerMessage = input[4]?.trim();
  if (!payerMessage || payerMessage.length < 2) {
    return "CON Message too short. Please enter a valid payer message:";
  }

  if (level === 5) {
    return "CON Enter note to payee (e.g. Refunded successfully):";
  }

  const payeeNote = input[5]?.trim();
  if (!payeeNote || payeeNote.length < 2) {
    return "CON Note too short. Please enter a valid payee note:";
  }

  if (level === 6) {
    try {
      const token = await getAccessToken();
      const externalId = uuidv4();
      const currency = "EUR";

      await initiateRefund(
        token,
        amount.toFixed(2),
        currency,
        externalId,
        referenceIdToRefund,
        payerMessage,
        payeeNote
      );

      return `END Refund of UGX ${amount.toFixed(
        2
      )} initiated.\nReference: ${referenceIdToRefund}`;
    } catch (err) {
      console.error("initiateRefund error:", err);
      return "END Failed to initiate refund. Try again later.";
    }
  }

  return "END Invalid refund flow.";
};
