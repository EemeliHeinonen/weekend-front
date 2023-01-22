import { render, fireEvent, getByTestId } from '@testing-library/react';
import NumberInput from '../NumberInput';

describe('NumberInput', () => {
  const inputValue = 3000;
  const setInputValue = vitest.fn();
  let component: HTMLElement;

  beforeEach(() => {
    const { baseElement } = render(
      <NumberInput
        label="Test input"
        value={inputValue}
        setValue={setInputValue}
      />
    );

    component = baseElement;
  });

  it('should render successfully', () => {
    expect(component).toBeTruthy();
  });

  ['numberInput', 'rangeInput'].forEach((inputType) => {
    describe(`when ${inputType} value is changed`, () => {
      it('should call setPriceThreshold with given value', () => {
        const expectedValue = 1000;
        fireEvent.change(getByTestId(component, `NumberInput.${inputType}`), {
          target: { value: expectedValue },
        });

        expect(setInputValue).toBeCalledWith(expectedValue);
      });

      it('should call setPriceThreshold with 0 when given value is negative', () => {
        fireEvent.change(getByTestId(component, `NumberInput.${inputType}`), {
          target: { value: -100 },
        });

        expect(setInputValue).toBeCalledWith(0);
      });
    });
  });
});
