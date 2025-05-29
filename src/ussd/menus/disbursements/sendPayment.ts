import { getAccessToken, initiateDisbursement } from "../../../disbursements";

export const sendPaymentMenu = async (input: string[]) => {
  const level = input.length;
  let response = "";

  if (level === 2) {
    response = "CON Enter recipient phone number (e.g. 07XXXXXXXX):";
  } else if (level === 3) {
    const [_, __, rawPhone] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "CON Invalid phone number. Please enter a valid phone number (e.g. 07XXXXXXXX):";
    }

    response = "CON Enter amount (UGX):";
  } else if (level === 4) {
    const [_, __, rawPhone, amountStr] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "END Invalid phone number. Please start over.";
    }

    if (typeof amountStr !== "string" || amountStr.trim() === "") {
      return "CON Amount is required. Please enter amount (UGX):";
    }

    const amount = parseFloat(amountStr.trim());
    if (isNaN(amount) || amount <= 0) {
      return "CON Invalid amount. Please enter a valid amount (positive number):";
    }

    response = "CON Enter reference note (e.g. Rent, Salary):";
  } else if (level === 5) {
    const [_, __, rawPhone, amountStr, reference] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "END Invalid phone number. Please start over.";
    }

    const amount = parseFloat(amountStr?.trim() || "");
    if (isNaN(amount) || amount <= 0) {
      return "END Invalid amount. Please start over.";
    }

    if (!reference || reference.trim().length === 0) {
      return "CON Reference note is required. Please enter reference note (e.g. Rent, Salary):";
    }

    const msisdn = `256${rawPhone.slice(1)}`;

    try {
      const token = await getAccessToken();
      if (!token) {
        return "END Unable to authenticate. Please try again later.";
      }

      await initiateDisbursement(token, msisdn, amount, reference.trim());
      response = `END UGX ${amount.toFixed(
        2
      )} sent to ${msisdn}.\nReference: ${reference.trim()}`;
    } catch (err) {
      console.error("initiateDisbursement error:", err);
      response = "END Failed to send payment. Please try again later.";
    }
  } else {
    response = "END Something went wrong. Please start over.";
  }

  return response;
};
