const dotenv = require("dotenv");
dotenv.config();
const Airtable = require("airtable-node");

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE);

exports.handler = async (event, context, cb) => {
  const res = await airtable.list({ maxRecords: 200 });
  // console.log("####");

  const products = res.records.map((product) => {
    const { id, fields } = product;
    const { name, description, image, colors } = fields;
    const { url } = image[0];
    return { id, name, description, url, colors };
  });

  try {
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 200,
      body: "products route",
    };
  }
};
