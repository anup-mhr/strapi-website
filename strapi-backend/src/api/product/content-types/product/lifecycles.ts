import { errors } from "@strapi/utils";
import { cleanHtml } from "../../../../libs/helper";
const { ApplicationError } = errors;

const validateShopifyFields = async (event: any) => {
  const { data } = event.params;

  if (event.action === "beforeUpdate") {
    const existingEntry = await strapi.db
      .query("api::product.product")
      .findOne({
        where: { id: event.params.where.id },
      });
    Object.assign(existingEntry, data);
    data.shopifyBuyButton = existingEntry.shopifyBuyButton;
    data.shopifyProductId = existingEntry.shopifyProductId;
  }

  if (data.shopifyBuyButton && !data.shopifyProductId) {
    throw new ApplicationError(
      "shopifyProductId is required when shopifyBuyButton is true."
    );
  }
};

export default {
  async beforeCreate(event: any) {
    await validateShopifyFields(event);

    const { data } = event.params;

    if (data.description) {
      data.description = cleanHtml(data.description);
    }
  },
  async beforeUpdate(event: any) {
    await validateShopifyFields(event);
    const { data } = event.params;

    if (data.description) {
      data.description = cleanHtml(data.description);
    }
  },
};
