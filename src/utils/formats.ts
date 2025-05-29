export const formatTransactionStatus = (data: any): string => {
  return [
    `Status: ${data.status}`,
    data.amount ? `Amount: UGX ${data.amount}` : null,
    data.payer?.partyId ? `Payer: ${data.payer.partyId}` : null,
    data.payerMessage ? `Message: ${data.payerMessage}` : null,
  ]
    .filter(Boolean)
    .join("\n");
};
