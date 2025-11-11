export default {
  config: {
    // locales: ['en'],
  },
  bootstrap(app: any) {
    const cleanElement = (element: HTMLElement) => {
      // Remove all attributes from all elements
      element.querySelectorAll("*").forEach((el: any) => {
        const tagName = el.tagName.toLowerCase();

        // Keep href for links only
        if (tagName === "a" && el.hasAttribute("href")) {
          const href = el.getAttribute("href");
          const attrs = Array.from(el.attributes);
          attrs.forEach((attr: any) => el.removeAttribute(attr.name));
          el.setAttribute("href", href);
        } else {
          // Remove ALL attributes
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

          // Let paste happen normally, then clean it
          editor.addEventListener("paste", () => {
            setTimeout(() => {
              cleanElement(editor);
              editor.dispatchEvent(new Event("input", { bubbles: true }));
            }, 100); // Give CKEditor time to process the paste
          });

          // Also clean on input (as backup)
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

    // Also observe DOM changes
    const observer = new MutationObserver(addPasteHandler);
    observer.observe(document.body, { childList: true, subtree: true });
  },
};