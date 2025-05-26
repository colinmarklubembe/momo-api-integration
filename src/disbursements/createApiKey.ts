import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const getApiKey = async (userId: string) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_URL}/v1_0/apiuser/${userId}/apikey`,
      {},
      {
        headers: {
          "Ocp-Apim-Subscription-Key":
            process.env.DISBURSEMENTS_SUBSCRIPTION_KEY,
        },
      }
    );
    console.log(`API Key: ${response.data.apiKey}`);
  } catch (error: any) {
    console.error(
      "Error retrieving API key:",
      error.response?.data || error.message
    );
  }
};

getApiKey(process.env.DISBURSEMENTS_API_USER_ID as string);
