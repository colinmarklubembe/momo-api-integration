import { getAccessToken, checkRefundStatus } from "../../../disbursements";

export const checkRefundStatusMenu = async (input: string[]) => {
  const level = input.length;

  if (level === 2) {
    return "CON Enter refund reference ID to check status:";
  }

  const refundReferenceId = input[2]?.trim();
  if (!refundReferenceId || refundReferenceId.length < 5) {
    return "CON Invalid reference ID. Please enter a valid refund reference ID:";
  }

  try {
    const token = await getAccessToken();
    const status = await checkRefundStatus(token, refundReferenceId);

    return `END Refund Status:\nStatus: ${status.status}\nAmount: UGX ${
      status.amount
    }\nReason: ${status.reason || "N/A"}`;
  } catch (err: any) {
    console.error("checkRefundStatus error:", err.message || err);
    return "END Failed to check refund status. Try again later.";
  }
};
