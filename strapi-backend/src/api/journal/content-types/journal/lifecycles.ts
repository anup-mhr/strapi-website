import { cleanHtml } from '../../../../libs/helper'

export default {
  async beforeCreate(event: any) {
    const { data } = event.params;
    console.log("Data",data.content);

    if (data.content) {
      data.content = cleanHtml(data.content);
    }
  },

  async beforeUpdate(event: any) {
    const { data } = event.params;

    if (data.content) {
      data.content = cleanHtml(data.content);
    }
  },
};