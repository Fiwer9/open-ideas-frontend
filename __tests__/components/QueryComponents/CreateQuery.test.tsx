import React from "react";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import NewCreateQuery from "../../../components/QueryComponents/CreateQuery";
import authSlice from "../../../redux/authSlice/slice";
import organizationsSlice, {
  setOrganizations,
  setStatusOrganizations,
} from "../../../redux/organizationsSlice/slice";
import directionsSlice, {
  setStatusDirections,
} from "../../../redux/directionsSlice/slice";
import queriesSlice from "../../../redux/queriesSlice/slice";
import settingsSlice from "../../../redux/settingsSlice/slice";
import headerSlice, {
  setUserName,
  setUserStatus,
} from "../../../redux/headerSlice/slice";
import modalsSlice from "../../../redux/modalsSlice/slice";
import filesSlice from "../../../redux/filesSlice/slice";

import { Status } from "@/redux/queriesSlice/types";

function getElementByText(text) {
  const xpath = `//node()[normalize-space(text())='${text.trim()}']`;
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue;
}

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
    },
  });
};

describe("CreateQuery", () => {
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
    store.dispatch(setUserName("userName"));
    store.dispatch(setUserStatus(Status.SUCCESS));
    store.dispatch(setStatusDirections(Status.SUCCESS));
    store.dispatch(setStatusOrganizations(Status.SUCCESS));
  });

  it("Рендер компонента создания инициативы", async () => {
    const component = render(
      <Provider store={store}>
        <NewCreateQuery />
      </Provider>
    );
    new Promise((resolve) => setTimeout(resolve, 2000));
    await waitFor(() => {
      expect(component.getByText("Создание инициативы")).toBeInTheDocument();
    });
  });

  it("Тест заполнения поля названия", async () => {
    const user = userEvent.setup();

    const component = render(
      <Provider store={store}>
        <NewCreateQuery />
      </Provider>
    );

    await waitFor(() => {
      expect(component.getByText("Создание инициативы")).toBeInTheDocument();
    });

    const nameInput = component.getByPlaceholderText(
      "Напишите название инициативы"
    );
    await user.type(nameInput, "Тестовая инициатива");

    expect(nameInput).toHaveValue("Тестовая инициатива");
  });

  it("Тест отображения ошибки валидации", async () => {
    const user = userEvent.setup();

    const component = render(
      <Provider store={store}>
        <NewCreateQuery />
      </Provider>
    );

    await waitFor(() => {
      expect(component.getByText("Создание инициативы")).toBeInTheDocument();
    });

    const submitButton1 = component.getByTestId("submit1");
    await user.click(submitButton1);
    new Promise((resolve) => setTimeout(resolve, 2000));
    const submitButton2 = component.getByTestId("submit2");
    await user.click(submitButton2);
    await waitFor(() => {
      expect(component.getByTestId("initiativeName")).toHaveClass(
        "ant-input-status-error"
      );
    });
  });

  it("Тест открытия confirm окна", async () => {
    const user = userEvent.setup();

    const component = render(
      <Provider store={store}>
        <NewCreateQuery />
      </Provider>
    );

    await waitFor(() => {
      expect(component.getByText("Создание инициативы")).toBeInTheDocument();
    });

    const submitButton1 = component.getByTestId("submit1");
    await user.click(submitButton1);

    const findComfirmText = getElementByText(
      "Вы уверены, что хотите зарегистрировать инициативу и внесли все необходимые данные? После регистрации внесение изменений невозможно"
    );

    await waitFor(() => {
      expect(!!findComfirmText).toBe(true);
    });
  });
});
