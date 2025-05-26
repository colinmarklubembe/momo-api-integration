import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const createApiUser = async () => {
  const userId = uuidv4();
  console.log(
    `Creating API user with ID: ${userId} and the COLLECTIONS_SUBSCRIPTION_KEY is: ${process.env.COLLECTIONS_SUBSCRIPTION_KEY}`
  );
  try {
    await axios.post(
      `${process.env.BASE_URL}/v1_0/apiuser`,
      {
        providerCallbackHost:
          process.env.CALLBACK_URL ||
          "https://d990-41-210-143-214.ngrok-free.app/",
      },
      {
        headers: {
          "X-Reference-Id": userId,
          "Ocp-Apim-Subscription-Key": process.env.COLLECTIONS_SUBSCRIPTION_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`API User created with ID: ${userId}`);
  } catch (error: any) {
    console.error(
      "Error creating API user:",
      error.response?.data || error.message
    );
  }
};

createApiUser();
