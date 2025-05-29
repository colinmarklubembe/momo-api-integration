import { getAccessToken, requestToPay } from "../../../collections";

export const makePaymentMenu = async (input: string[]) => {
  const level = input.length;
  let response = "";

  if (level === 1) {
    response = "CON Enter recipient phone number (e.g. 07XXXXXXXX):";
  } else if (level === 2) {
    const [_, rawPhone] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "CON Invalid phone number. Please enter a valid phone number (e.g. 07XXXXXXXX):";
    }

    response = "CON Enter amount to pay:";
  } else if (level === 3) {
    const [_, rawPhone, amountStr] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "END Invalid phone number. Please start over.";
    }

    if (typeof amountStr !== "string" || amountStr.trim() === "") {
      return "CON Amount is required. Please enter amount to pay:";
    }

    const amount = parseFloat(amountStr.trim());
    if (isNaN(amount) || amount <= 0) {
      return "CON Invalid amount. Please enter a valid amount (positive number):";
    }

    response = "CON Enter payment reference (e.g. Order123):";
  } else if (level === 4) {
    const [_, rawPhone, amountStr, reference] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "END Invalid phone number. Please start over.";
    }

    const amount = parseFloat(amountStr?.trim() || "");
    if (isNaN(amount) || amount <= 0) {
      return "END Invalid amount. Please start over.";
    }

    if (!reference || reference.trim().length === 0) {
      return "CON Payment reference is required. Please enter payment reference (e.g. Order123):";
    }

    const msisdn = `256${rawPhone.slice(1)}`;

    try {
      const token = await getAccessToken();
      if (!token) {
        return "END Unable to authenticate. Please try again later.";
      }

      await requestToPay(token, msisdn, amount, reference.trim());
      response = `END Payment of UGX ${amount.toFixed(
        2
      )} requested from ${msisdn}.\n \n Reference: ${reference.trim()}`;
    } catch (err) {
      console.error("requestToPay error:", err);
      response = "END Failed to process payment. Please try again later.";
    }
  } else {
    response = "END Something went wrong. Please start over.";
  }

  return response;
};
