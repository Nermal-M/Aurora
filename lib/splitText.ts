/**
 * Custom text splitter for GSAP staggered reveals without requiring Club GreenSock SplitText
 */

export interface SplitResult {
  chars: HTMLElement[];
  words: HTMLElement[];
}

export function splitTextElement(element: HTMLElement, mode: "chars" | "words" = "chars"): SplitResult {
  const text = element.textContent || "";
  element.innerHTML = "";
  element.setAttribute("aria-label", text);

  const words: HTMLElement[] = [];
  const chars: HTMLElement[] = [];

  const wordStrings = text.split(" ");

  wordStrings.forEach((wordStr, wordIdx) => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "inline-block whitespace-nowrap overflow-hidden align-top";
    wordSpan.setAttribute("aria-hidden", "true");

    if (mode === "chars") {
      Array.from(wordStr).forEach((char) => {
        const charWrapper = document.createElement("span");
        charWrapper.className = "inline-block overflow-hidden";
        
        const charInner = document.createElement("span");
        charInner.className = "inline-block will-change-transform";
        charInner.textContent = char;

        charWrapper.appendChild(charInner);
        wordSpan.appendChild(charWrapper);
        chars.push(charInner);
      });
    } else {
      const wordInner = document.createElement("span");
      wordInner.className = "inline-block will-change-transform";
      wordInner.textContent = wordStr;
      wordSpan.appendChild(wordInner);
      words.push(wordInner);
    }

    element.appendChild(wordSpan);

    if (wordIdx < wordStrings.length - 1) {
      // Space between words
      const space = document.createTextNode(" ");
      element.appendChild(space);
    }
  });

  return { chars, words };
}
