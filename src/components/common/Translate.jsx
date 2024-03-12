import React, { useEffect } from "react";

function Translate() {
  useEffect(() => {
    // Initialize Google Translate widget
    function googleTranslateElementInit() {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout:
            window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
        },
        "google_translate_element"
      );
    }

    // Load Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="flex justify-center">
      <div
        id="google_translate_element"
        className="mt-8 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  h-16 px-4 py-2 bg-white text-black  "
      >
        {/* This div will be replaced by the Google Translate widget */}
      </div>
    </div>
  );
}

export default Translate;
