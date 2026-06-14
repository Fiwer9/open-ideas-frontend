import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

import { IdeasList } from "../../../components/IdeasComponents/IdeasList";

import * as slices from "../../../redux/exports";

import authSlice from "@/redux/authSlice/slice";
import { setOrganizations } from "@/redux/organizationsSlice/slice";
import organizationsSlice from "@/redux/organizationsSlice/slice";
import directionsSlice from "@/redux/directionsSlice/slice";
import queriesSlice from "@/redux/queriesSlice/slice";
import settingsSlice from "@/redux/settingsSlice/slice";
import headerSlice from "@/redux/headerSlice/slice";
import filesSlice from "@/redux/filesSlice/slice";
import modalsSlice from "@/redux/modalsSlice/slice";
import usersSlice from "@/redux/usersSlice/slice";

import { changeSelectedTag } from "@/redux/menuSlice/slice";
import menuSlice from "@/redux/menuSlice/slice";

const mockStore = configureStore({
  reducer: {
    ...slices,
  },
});

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      organizations: organizationsSlice,
      directions: directionsSlice,
      queries: queriesSlice,
      settings: settingsSlice,
      header: headerSlice,
      modals: modalsSlice,
      files: filesSlice,
      menu: menuSlice,
      users: usersSlice,
    },
  });
};

describe("Компонент IdeasList", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
    store.dispatch({
      type: "auth/setCurrentUser",
      payload: { user_id: 1 },
    });
    store.dispatch(
      setOrganizations([
        {
          id: 1,
          name: "org",
        },
      ])
    );
    store.dispatch(changeSelectedTag("Панель администратора"));
  });

  it("отображает список идей с таблицей", async () => {
    const component = render(
      <Provider store={store}>
        <IdeasList />
      </Provider>
    );

    await waitFor(() => {
      expect(component.getByTestId("table")).toBeInTheDocument();
    });
  });

  it("отображает пример данных в таблице", () => {
    const component = render(
      <Provider store={store}>
        <IdeasList />
      </Provider>
    );

    expect(
      component.getByText("Сделать так, чтобы не скрипела дверь в кабинете 203")
    ).toBeInTheDocument();
    expect(
      component.getByText("Нужно, чтобы был диван на третьем этаже")
    ).toBeInTheDocument();
  });

  it("позволяет пользователю искать идеи", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <IdeasList />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText("Поиск по идеям");
    await user.type(searchInput, "дверь");

    expect(searchInput).toHaveValue("дверь");
  });

  it("отображает компоненты фильтров", () => {
    render(
      <Provider store={store}>
        <IdeasList />
      </Provider>
    );

    expect(screen.getByText("Создать идею")).toBeInTheDocument();
    expect(screen.getByText("Я эксперт")).toBeInTheDocument();
    expect(screen.getByText("Архив")).toBeInTheDocument();
  });
});
