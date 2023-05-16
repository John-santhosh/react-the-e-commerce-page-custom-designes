const Airtable = require("airtable-node");
const dotenv = require("dotenv");
dotenv.config();

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters;
  // console.log(id);
  let product = await airtable.retrieve(id);
  try {
    if (product.error) {
      return {
        statusCode: 404,
        body: `No product with id: ${id}`,
      };
    }
    const { name, description, image, colors } = product.fields;
    const { url } = image[0];
    const item = { id, name, description, url, colors };
    // console.log(item);
    return {
      statusCode: 200,
      body: JSON.stringify(item),
    };
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: "please provide id ",
  };
};
