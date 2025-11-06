import { cleanHtml } from "../../../../libs/helper";

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;

    if (data.description) {
      data.description = cleanHtml(data.description);
    }
  },

  async beforeUpdate(event: any) {
    const { data } = event.params;

    if (data.description) {
      data.description = cleanHtml(data.description);
    }
  },
};
