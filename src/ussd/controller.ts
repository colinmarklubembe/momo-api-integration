import type { Request, Response } from "express";
import {
  mainMenu,
  makePaymentMenu,
  viewBalanceMenu,
  disbursementsMenu,
  validateAccountMenu,
  checkPaymentStatusMenu,
  sendPaymentMenu,
  initiateRefundMenu,
  checkRefundStatusMenu,
  checkTransferStatusMenu,
  viewDisbursementBalanceMenu,
} from "./menus";

export const handleUssdRequests = async (req: Request, res: Response) => {
  const { sessionId, phoneNumber, text } = req.body;
  const input = text.split("*");
  const choice = input[0];
  let response = "";

  try {
    if (text === "") {
      response = mainMenu();
    } else if (choice === "1") {
      response = await makePaymentMenu(input);
    } else if (choice === "2") {
      response = await checkPaymentStatusMenu(input);
    } else if (choice === "3") {
      response = await viewBalanceMenu();
    } else if (choice === "4") {
      response = await validateAccountMenu(input);
    } else if (choice === "5") {
      if (input.length === 1) {
        response = disbursementsMenu();
      } else {
        const subChoice = input[1];
        switch (subChoice) {
          case "1":
            response = await sendPaymentMenu(input);
            break;
          case "2":
            response = await checkTransferStatusMenu(input);
            break;
          case "3":
            response = await initiateRefundMenu(input);
            break;
          case "4":
            response = await checkRefundStatusMenu(input);
            break;
          case "5":
            response = await viewDisbursementBalanceMenu(input);
            break;
          case "6":
            response = await validateAccountMenu(input);
            break;
          case "7":
            response = "END Thank you for using Pinkapple Services.";
            break;
          default:
            response = "END Invalid disbursement option.";
            break;
        }
      }
    } else if (choice === "6") {
      response = "END Thank you for using Pinkapple Services.";
    } else {
      response = "END Invalid option. Try again.";
    }
  } catch (err) {
    console.error("USSD Error:", err);
    response = "END Something went wrong. Try again.";
  }

  return res.send(response);
};
