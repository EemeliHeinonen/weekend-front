import { render, fireEvent, getByTestId } from '@testing-library/react';
import ThresholdInput from '../ThresholdInput';

describe('ThresholdInput', () => {
  const priceThreshold = 3000;
  const setPriceThreshold = vitest.fn();
  let component: HTMLElement;

  beforeEach(() => {
    const { baseElement } = render(
      <ThresholdInput
        priceThreshold={priceThreshold}
        setPriceThreshold={setPriceThreshold}
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
        fireEvent.change(
          getByTestId(component, `ThresholdInput.${inputType}`),
          {
            target: { value: expectedValue },
          }
        );

        expect(setPriceThreshold).toBeCalledWith(expectedValue);
      });

      it('should call setPriceThreshold with 0 when given value is negative', () => {
        fireEvent.change(
          getByTestId(component, `ThresholdInput.${inputType}`),
          {
            target: { value: -100 },
          }
        );

        expect(setPriceThreshold).toBeCalledWith(0);
      });
    });
  });
});
