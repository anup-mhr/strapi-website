const toTitleCase = (str: string) =>
  str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export default {
  beforeCreate(event: any) {
    const { data } = event.params;
    if (data.title && typeof data.title === "string") {
      data.title = toTitleCase(data.title);
    }
  },

  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data.title && typeof data.title === "string") {
      data.title = toTitleCase(data.title);
    }
  },
};
