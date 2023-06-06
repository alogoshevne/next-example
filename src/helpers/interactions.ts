import { userEvent, within } from '@storybook/testing-library';

export const typeToInput = async (
  canvas: any,
  testId: string,
  text: string,
) => {
  await userEvent.type(canvas.getByTestId(testId), text, {
    delay: 100,
  });
};

export const selectOptionAutocomplete = async (
  canvas: any,
  testId: string,
  text: string,
) => {
  const selectInput = canvas.getByTestId(testId);
  const select = within(selectInput).getByRole('combobox');
  await userEvent.type(select, text, {
    delay: 100,
  });
  await userEvent.keyboard('{arrowdown}', {
    delay: 100,
  });
  await userEvent.keyboard('{enter}', {
    delay: 100,
  });
};
export const selectOption = async (canvas: any, testId: string) => {
  const selectInput = canvas.getByTestId(testId);
  await userEvent.click(selectInput);
  await userEvent.keyboard('{arrowdown}', {
    delay: 100,
  });
  await userEvent.keyboard('{enter}', {
    delay: 100,
  });
};

export const clickRadio = async (
  canvas: any,
  testId: string,
  index: number,
) => {
  const radioButton = canvas.getByTestId(testId);
  const option = radioButton.children[index]!;
  await userEvent.click(option);
};

export const clickElement = async (canvas: any, testId: string) => {
  const elem = canvas.getByTestId(testId);
  await userEvent.click(elem);
};

export const clickSubmit = async (canvas: any) => {
  const submitButton = canvas.getByRole('submit');

  await userEvent.click(submitButton, undefined, {
    skipPointerEventsCheck: true,
  });
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const interactions = {
  typeToInput,
  selectOptionAutocomplete,
  selectOption,
  clickRadio,
  clickSubmit,
  clickElement,
  sleep,
};

export default interactions;
