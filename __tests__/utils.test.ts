import {
  getDepartmentName,
  getNames,
  getEmails,
  getQueriesByNumber,
  getOrganizationsFilter,
  getOrganizationName,
  getOrganizationId,
  getOrganizationNameById,
  getStatusClassName,
  formatDate,
  formatDateRu,
  formatDateToServer,
  getAllUserLikes,
  getDirectionName,
  getDirections,
  getStatus,
  checkExpert,
  getRouteTranslation,
  getUserName,
  getAuthor,
  statusClassName,
  fetchData,
} from "../utils/utils";
import { getGraphicLabels } from "../utils/consts";
import {
  getMonth,
  getYear,
  daysInMonth,
  getAnalyticsForGraphic,
  getAnalyticsForPieChart,
  filterAnalytics,
  AnalyticType,
} from "../utils/getAnalytics";
import { getMenu } from "../utils/getMenu";
import {
  getQueryFilterByArchive,
  getQueryFilterByExpert,
} from "../utils/getQueryFilter";
import { getSettings } from "../utils/getSettings";
import { getUser } from "../utils/getUser";
import { QueryStatus } from "../models/response/QueriesResponse";

const mockDepartments = [
  { id: 1, name: "Department 1", organization: 1 },
  { id: 2, name: "Department 2", organization: 2 },
];

const mockUsers = [
  { id: 1, name: "User 1", email: "user1@example.com", likes: [1, 2] },
  { id: 2, name: "User 2", email: "user2@example.com", likes: [3] },
];

const mockQueries = [
  { id: 1, status: "registered" },
  { id: 2, status: "done" },
];

const mockOrganizations = [
  { id: 1, name: "Org 1" },
  { id: 2, name: "Org 2" },
];

const mockDirections = [
  { id: 1, name: "Direction 1" },
  { id: 2, name: "Direction 2" },
];

describe("Функции Utils", () => {
  describe("getDepartmentName", () => {
    it("должен возвращать название отдела, если найдено", () => {
      expect(getDepartmentName(1, mockDepartments)).toBe("Department 1");
    });

    it("должен возвращать \"Неизвестно\", если не найдено", () => {
      expect(getDepartmentName(3, mockDepartments)).toBe("Неизвестно");
    });

    it("должен возвращать \"Неизвестно\", если depId не определён", () => {
      expect(getDepartmentName(undefined, mockDepartments)).toBe("Неизвестно");
    });
  });

  describe("getNames", () => {
    it("должен возвращать уникальные имена", () => {
      const users = [
        { name: "User 1" },
        { name: "User 2" },
        { name: "User 1" },
      ];
      expect(getNames(users as any)).toEqual(["User 1", "User 2"]);
    });
  });

  describe("getEmails", () => {
    it("должен возвращать уникальные email", () => {
      const users = [
        { email: "user1@example.com" },
        { email: "user2@example.com" },
        { email: "user1@example.com" },
      ];
      expect(getEmails(users as any)).toEqual([
        "user1@example.com",
        "user2@example.com",
      ]);
    });
  });

  describe("getQueriesByNumber", () => {
    it("должен возвращать запросы с префиксом №", () => {
      expect(getQueriesByNumber(mockQueries as any)).toEqual(["№1", "№2"]);
    });
  });

  describe("getOrganizationsFilter", () => {
    it("должен возвращать уникальные названия организаций", () => {
      expect(getOrganizationsFilter(mockOrganizations as any)).toEqual([
        "Org 1",
        "Org 2",
      ]);
    });
  });

  describe("getOrganizationName", () => {
    it("должен возвращать название организации, если найдено", () => {
      expect(getOrganizationName(1, mockOrganizations as any)).toBe("Org 1");
    });

    it("должен возвращать \"Неизвестно\", если не найдено", () => {
      expect(getOrganizationName(3, mockOrganizations as any)).toBe(
        "Неизвестно"
      );
    });
  });

  describe("getOrganizationId", () => {
    it("должен возвращать id организации, если найдено", () => {
      expect(getOrganizationId(1, mockOrganizations)).toBe(1);
    });

    it("должен возвращать undefined, если не найдено", () => {
      expect(getOrganizationId(3, mockOrganizations)).toBeUndefined();
    });
  });

  describe("getOrganizationNameById", () => {
    it("должен возвращать id организации, если найдено", () => {
      expect(getOrganizationNameById("Org 1", mockOrganizations as any)).toBe(
        1
      );
    });

    it("должен возвращать undefined, если не найдено", () => {
      expect(
        getOrganizationNameById("Org 3", mockOrganizations as any)
      ).toBeUndefined();
    });
  });

  describe("getStatusClassName", () => {
    const mockStyles = {
      statusRegistered: "registered",
      statusCheck: "check",
      statusAnalysis: "analysis",
      statusAccepted: "accepted",
      statusImplementation: "implementation",
      statusRejected: "rejected",
      statusDone: "done",
    };

    it("должен возвращать правильный класс для REGISTERED", () => {
      expect(getStatusClassName(mockStyles, QueryStatus.REGISTERED)).toBe(
        "registered"
      );
    });

    it("должен возвращать пустую строку для неизвестного статуса", () => {
      expect(getStatusClassName(mockStyles, "unknown" as any)).toBe("");
    });
  });

  describe("formatDate", () => {
    it("должен правильно форматировать дату", () => {
      expect(formatDate("2023-01-01T00:00:00")).toBe("01.01.2023");
    });
  });

  describe("formatDateRu", () => {
    it("должен форматировать дату на русском", () => {
      expect(formatDateRu("2023-01-01T00:00:00")).toBe("01 января 2023 г.");
    });

    it("должен возвращать пустую строку при ошибке", () => {
      expect(formatDateRu("invalid")).toBe("");
    });
  });

  describe("formatDateToServer", () => {
    it("должен форматировать дату в серверный формат", () => {
      const date = new Date(2023, 0, 1); // Jan 1, 2023
      expect(formatDateToServer(date)).toBe("2023.01.01");
    });
  });

  describe("getAllUserLikes", () => {
    it("должен возвращать лайки пользователя, если найден", () => {
      expect(getAllUserLikes(mockUsers as any, 1)).toEqual([1, 2]);
    });

    it("должен возвращать пустой массив, если пользователь не найден", () => {
      expect(getAllUserLikes(mockUsers as any, 3)).toEqual([]);
    });
  });

  describe("getDirectionName", () => {
    it("должен возвращать название направления, если найдено", () => {
      expect(getDirectionName(1, mockDirections as any)).toBe("Direction 1");
    });

    it("должен возвращать \"Неизвестно\", если не найдено", () => {
      expect(getDirectionName(3, mockDirections as any)).toBe("Неизвестно");
    });
  });

  describe("getDirections", () => {
    it("должен возвращать уникальные направления", () => {
      const directions = [
        { id: 1, name: "Dir 1" },
        { id: 2, name: "Dir 2" },
        { id: 1, name: "Dir 1" },
      ];
      expect(getDirections(directions as any)).toEqual([
        { id: 1, name: "Dir 1" },
        { id: 2, name: "Dir 2" },
      ]);
    });
  });

  describe("getStatus", () => {
    it("должен возвращать уникальные статусы", () => {
      expect(getStatus(mockQueries as any)).toEqual([
        "Зарегистрирована",
        "Выполнена",
      ]);
    });
  });

  describe("checkExpert", () => {
    beforeEach(() => {
      // Mock localStorage
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => "{\"user_id\": 1}"),
        },
        writable: true,
      });
    });

    it("должен возвращать true, если пользователь эксперт", () => {
      const query = { expert_users: [1] } as any;
      expect(checkExpert(query)).toBe(true);
    });

    it("должен возвращать false, если пользователь не эксперт", () => {
      const query = { expert_users: [2] } as any;
      expect(checkExpert(query)).toBe(false);
    });
  });

  describe("getRouteTranslation", () => {
    it("должен правильно переводить маршрут", () => {
      expect(getRouteTranslation("queries", "", 0)).toBe("Таблица инициатив");
    });

    it("должен возвращать пустую строку для неизвестного маршрута", () => {
      expect(getRouteTranslation("unknown", "", 0)).toBe("");
    });
  });

  describe("getUserName", () => {
    it("должен возвращать имя пользователя, если найдено", () => {
      expect(getUserName(1, mockUsers as any)).toBe("User 1");
    });

    it("должен возвращать \"Аноним\", если не найдено", () => {
      expect(getUserName(3, mockUsers as any)).toBe("Аноним");
    });
  });

  describe("getAuthor", () => {
    it("должен возвращать имя автора, если найдено", () => {
      expect(getAuthor([1], mockUsers as any)).toBe("User 1");
    });

    it("должен возвращать \"Не назначено\", если не найдено", () => {
      expect(getAuthor([3], mockUsers as any)).toBe("Не назначено");
    });
  });

  describe("statusClassName", () => {
    it("должен возвращать объект с классами статусов", () => {
      const mockStyles = {
        statusRegistered: "registered",
        statusCheck: "check",
        statusAnalysis: "analysis",
        statusAccepted: "accepted",
        statusImplementation: "implementation",
        statusRejected: "rejected",
        statusDone: "done",
      };
      expect(statusClassName(mockStyles)).toEqual({
        registered: "registered",
        check: "check",
        analysis: "analysis",
        accepted: "accepted",
        implementation: "implementation",
        rejected: "rejected",
        done: "done",
      });
    });
  });

  describe("fetchData", () => {
    it("должен успешно загружать данные", async () => {
      const mockSetIsLoading = jest.fn();
      const mockSetData = jest.fn();
      const mockGetData = jest
        .fn()
        .mockResolvedValue({ data: { data: "test data" } });

      await fetchData(mockSetIsLoading, mockSetData, mockGetData);

      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      expect(mockGetData).toHaveBeenCalled();
      expect(mockSetData).toHaveBeenCalledWith("test data");
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });

    it("должен обрабатывать ошибки", async () => {
      const mockSetIsLoading = jest.fn();
      const mockSetData = jest.fn();
      const mockGetData = jest.fn().mockRejectedValue(new Error("Test error"));
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      await fetchData(mockSetIsLoading, mockSetData, mockGetData);

      expect(mockSetIsLoading).toHaveBeenCalledWith(true);
      expect(mockGetData).toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(new Error("Test error"));
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);

      consoleSpy.mockRestore();
    });
  });

  describe("getGraphicLabels", () => {
    it("должен возвращать массив дней для одного дня", () => {
      const result = getGraphicLabels("2023-01-01", "2023-01-01", 0, 0);
      expect(result).toEqual([
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ]);
    });

    it("должен возвращать массив месяцев для нескольких месяцев", () => {
      const result = getGraphicLabels("2023-01-01", "2023-03-01", 2, 0);
      expect(result).toEqual(["Jan", "Feb", "Mar"]);
    });

    it("должен возвращать массив лет для нескольких лет", () => {
      const result = getGraphicLabels("2021-01-01", "2023-01-01", 0, 2);
      expect(result).toEqual(["2021", "2022", "2023"]);
    });
  });

  describe("getMonth", () => {
    it("должен возвращать месяц из даты", () => {
      expect(getMonth("2023-05-15")).toBe(4);
    });
  });

  describe("getYear", () => {
    it("должен возвращать год из даты", () => {
      expect(getYear("2023-05-15")).toBe(2023);
    });
  });

  describe("daysInMonth", () => {
    it("должен возвращать количество дней в месяце", () => {
      expect(daysInMonth(2, 2023)).toBe(28); // Non-leap year
      expect(daysInMonth(2, 2024)).toBe(29); // Leap year
      expect(daysInMonth(1, 2023)).toBe(31);
    });
  });

  describe("getAnalyticsForGraphic", () => {
    it("должен возвращать статистику для графиков", () => {
      const mockQueries = [
        { date: "2023-01-15", status: "registered" },
        { date: "2023-01-20", status: "done" },
      ] as any;
      const result = getAnalyticsForGraphic(
        mockQueries,
        "2023-01-01",
        "2023-01-31"
      );
      expect(result.has("В процессе")).toBe(true);
      expect(result.has("Отклонены")).toBe(true);
      expect(result.has("Выполнены")).toBe(true);
    });
  });

  describe("getAnalyticsForPieChart", () => {
    it("должен возвращать статистику для круговой диаграммы", () => {
      const initiativeValues = [1, 2, 1];
      const statisticItems = [
        { id: 1, name: "Direction 1" },
        { id: 2, name: "Direction 2" },
      ];
      const result = getAnalyticsForPieChart(
        initiativeValues,
        statisticItems as any,
        AnalyticType.DIRECTION
      );
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Direction 1");
      expect(result[0].count).toBe(2);
    });
  });

  describe("filterAnalytics", () => {
    it("должен фильтровать запросы по дате", () => {
      const mockQueries = [
        { date: "2023-01-15" },
        { date: "2023-02-15" },
      ] as any;
      const result = filterAnalytics("2023-01-01", "2023-01-31", mockQueries);
      expect(result).toHaveLength(1);
      expect(result[0].date).toBe("2023-01-15");
    });
  });

  describe("getMenu", () => {
    beforeEach(() => {
      Object.defineProperty(window, "sessionStorage", {
        value: {
          getItem: jest.fn((key) => {
            if (key === "is_collapsed_menu") return "false";
            if (key === "current_page_menu") return "[\"/queries\"]";
            if (key === "selectedTag") return "Инициативы";
            if (key === "isStaff") return "true";
            return null;
          }),
        },
        writable: true,
      });
    });

    it("должен возвращать состояние меню", () => {
      const result = getMenu();
      expect(result).toEqual({
        isCollapsed: false,
        currentPage: ["/queries"],
        selectedTag: "Инициативы",
        isStaff: true,
      });
    });
  });

  describe("getQueryFilterByArchive", () => {
    it("должен фильтровать архивные запросы", () => {
      const mockQueries = [
        { status: QueryStatus.REJECTED },
        { status: QueryStatus.DONE },
        { status: QueryStatus.REGISTERED },
      ] as any;
      const result = getQueryFilterByArchive(mockQueries, true);
      expect(result).toHaveLength(2);
    });

    it("должен фильтровать неархивные запросы", () => {
      const mockQueries = [
        { status: QueryStatus.REJECTED },
        { status: QueryStatus.DONE },
        { status: QueryStatus.REGISTERED },
      ] as any;
      const result = getQueryFilterByArchive(mockQueries, false);
      expect(result).toHaveLength(1);
    });
  });

  describe("getQueryFilterByExpert", () => {
    it("должен фильтровать запросы для эксперта", () => {
      const mockQueries = [
        { expert_users: [1], status: QueryStatus.REGISTERED },
        { expert_users: [2], status: QueryStatus.REGISTERED },
      ] as any;
      const result = getQueryFilterByExpert(mockQueries, true, 1);
      expect(result).toHaveLength(1);
    });
  });

  describe("getSettings", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(() => "{\"id\": 1, \"allow_file_attachment\": true}"),
        },
        writable: true,
      });
    });

    it("должен возвращать настройки из localStorage", () => {
      const result = getSettings();
      expect(result.id).toBe(1);
      expect(result.allow_file_attachment).toBe(true);
    });
  });

  describe("getUser", () => {
    beforeEach(() => {
      Object.defineProperty(window, "localStorage", {
        value: {
          getItem: jest.fn(
            () => "{\"user_id\": 123, \"email\": \"test@example.com\"}"
          ),
        },
        writable: true,
      });
    });

    it("должен возвращать пользователя из localStorage", () => {
      const result = getUser();
      expect(result.user.user_id).toBe(123);
      expect(result.user.email).toBe("test@example.com");
    });
  });
});
