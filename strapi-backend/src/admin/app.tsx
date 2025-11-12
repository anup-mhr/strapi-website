export default {
  config: {
    translations: {
      en: {
        "Auth.form.welcome.title": "Welcome to Heirloom!",
        "Auth.form.welcome.subtitle": "Log in to your Heirloom account",
      },
    },
  },

  bootstrap(app: any) {
    document.title = "Heirloom Admin";

    // CLEAN PASTE HANDLER
    const cleanElement = (element: HTMLElement) => {
      element.querySelectorAll("*").forEach((el: any) => {
        const tagName = el.tagName.toLowerCase();

        if (tagName === "a" && el.hasAttribute("href")) {
          const href = el.getAttribute("href");
          const attrs = Array.from(el.attributes);
          attrs.forEach((attr: any) => el.removeAttribute(attr.name));
          el.setAttribute("href", href);
        } else {
          const attrs = Array.from(el.attributes);
          attrs.forEach((attr: any) => el.removeAttribute(attr.name));
        }
      });
    };

    const addPasteHandler = () => {
      const editors = document.querySelectorAll(".ck-editor__editable");

      editors.forEach((editor: any) => {
        if (!editor.dataset.pasteFixed) {
          editor.dataset.pasteFixed = "true";

          editor.addEventListener("paste", () => {
            setTimeout(() => {
              cleanElement(editor);
              editor.dispatchEvent(new Event("input", { bubbles: true }));
            }, 100);
          });

          editor.addEventListener("input", () => {
            setTimeout(() => {
              cleanElement(editor);
            }, 50);
          });
        }
      });
    };

    // Run periodically to catch new editors
    setInterval(addPasteHandler, 500);

    // BODY OBSERVER (for editors)
    const observer = new MutationObserver(addPasteHandler);
    observer.observe(document.body, { childList: true, subtree: true });

    // OBSERVER for <title> changes (fix "Homepage | Strapi")
    const titleEl = document.querySelector("title");
    if (titleEl) {
      const titleObserver = new MutationObserver(() => {
        if (document.title.includes("| Strapi")) {
          document.title = document.title.replace("| Strapi", "| Heirloom");
        }
      });

      titleObserver.observe(titleEl, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  },
};
