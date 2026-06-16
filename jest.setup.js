require("@testing-library/jest-dom");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const { getComputedStyle: originalGetComputedStyle } = window;

const createFallbackComputedStyle = () => ({
  getPropertyValue: () => "",
  pointerEvents: "auto",
  display: "block",
  visibility: "visible",
  width: "0px",
  height: "0px",
});

window.getComputedStyle = (element, pseudoElement) => {
  if (pseudoElement) {
    return createFallbackComputedStyle();
  }

  try {
    return originalGetComputedStyle(element, pseudoElement);
  } catch {
    return createFallbackComputedStyle();
  }
};
