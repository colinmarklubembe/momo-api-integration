import { getAccessToken, validateAccountHolder } from "../../../collections";

export const validateAccountMenu = async (input: string[]) => {
  const level = input.length;
  let response = "";

  if (level === 1) {
    response = "CON Enter phone number to validate (e.g. 07XXXXXXXX):";
  } else if (level === 2) {
    const [_, rawPhone] = input;

    if (!rawPhone || !/^0\d{9}$/.test(rawPhone)) {
      return "CON Invalid phone number. Please enter again (e.g. 07XXXXXXXX):";
    }

    const msisdn = `256${rawPhone.slice(1)}`;

    try {
      const token = await getAccessToken();
      if (!token) {
        return "END Could not authenticate. Try again later.";
      }

      const active = await validateAccountHolder(token, msisdn);

      if (active) {
        response = `END ${msisdn} is an active account holder.`;
      } else {
        response = `END ${msisdn} is not an active account holder.`;
      }
    } catch (err) {
      console.error("validateAccountHolder error:", err);
      response = `END ${msisdn} is not active or could not be validated.`;
    }
  } else {
    response = "END Invalid input. Please start again.";
  }

  return response;
};
