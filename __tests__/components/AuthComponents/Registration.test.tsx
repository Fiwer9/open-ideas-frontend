import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Registration } from "../../../components/AuthComponents/Registration";
import authSlice from "../../../redux/authSlice/slice";
import organizationsSlice, {
  setOrganizations,
} from "../../../redux/organizationsSlice/slice";

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      organizations: organizationsSlice,
    },
  });
};

describe("Компонент Регистрации", () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();

    store.dispatch(
      setOrganizations([
        {
          id: 1,
          name: "Организация 1",
        },
      ])
    );
  });

  it("отображает форму регистрации", () => {
    render(
      <Provider store={store}>
        <Registration />
      </Provider>
    );

    expect(screen.getByText("Введите своё Ф. И. О.")).toBeInTheDocument();
    expect(screen.getByText("Выберите свою организацию")).toBeInTheDocument();
    expect(screen.getByText("Зарегистрироваться")).toBeInTheDocument();
  });

  it("позволяет пользователю заполнить форму", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <Registration />
      </Provider>
    );

    const nameInput = screen.getByPlaceholderText(
      "Напишите фамилию, имя и отчество"
    );
    await user.type(nameInput, "Иванов Иван Иванович");

    expect(nameInput).toHaveValue("Иванов Иван Иванович");
  });

  it("включает кнопку отправки, когда все поля заполнены", async () => {
    const user = userEvent.setup();

    const component = render(
      <Provider store={store}>
        <Registration />
      </Provider>
    );

    const selectElement = screen.getByTestId("organizationSelect");

    const inputElement = selectElement.querySelector("input");
    const inputFIOElement = screen.getByTestId("inputFIO");

    await user.type(inputFIOElement, "Иванов Иван Иванович");

    await user.click(inputElement);

    const submitButton = component.getByTestId("registrationButton");
    expect(submitButton).toBeEnabled();
  });
});
