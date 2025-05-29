import { getAccessToken, checkTransferStatus } from "../../../disbursements";

export const checkTransferStatusMenu = async (input: string[]) => {
  const level = input.length;

  // Step 1: Ask for transfer reference ID
  if (level === 2) {
    return "CON Enter transfer reference ID to check status:";
  }

  // Step 2: Validate and fetch status
  const referenceId = input[2]?.trim();
  if (!referenceId || referenceId.length < 5) {
    return "CON Invalid reference ID. Please enter a valid transfer reference ID:";
  }

  try {
    const token = await getAccessToken();
    const status = await checkTransferStatus(token, referenceId);

    return `END Transfer Status:\nStatus: ${status.status}\nAmount: UGX ${
      status.amount
    }\nReason: ${status.reason || "N/A"}`;
  } catch (err: any) {
    console.error("checkTransferStatus error:", err.message || err);
    return "END Failed to check transfer status. Try again later.";
  }
};

// 46ffa471-e5f5-4d8b-bc5b-b8bef1d0715a
