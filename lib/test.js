const OpenAI = require("openai");

const endpoint = process.env.ENDPOINT || "seret-key-1234";
const azureApiKey = process.env.API_KEY || "key";
const apiVersion = "2023-06-01-preview";
const defaultDeploymentId = "a"; // Default deployment ID

function createOpenAIInstance(deploymentId = defaultDeploymentId) {
  return new OpenAI({
    apiKey: azureApiKey,
    baseURL: `${endpoint}/deployments/${deploymentId}`,
    defaultQuery: { "api-version": apiVersion },
    defaultHeaders: {
      "api-key": azureApiKey,
    },
  });
}

module.exports = createOpenAIInstance;
