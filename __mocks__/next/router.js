const mockPush = jest.fn();

const mockRouter = {
  push: mockPush,
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  reload: jest.fn(),
  beforePopState: jest.fn(),
  asPath: "/queries",
  pathname: "/queries",
  query: {},
  isReady: true,
  route: "/queries",
  basePath: "",
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
};

module.exports = {
  __esModule: true,
  default: mockRouter,
  useRouter: () => mockRouter,
};
