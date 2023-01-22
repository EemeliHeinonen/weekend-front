import { memo, useCallback } from 'react';

interface ThresholdInputProps {
  priceThreshold: number;
  setPriceThreshold: React.Dispatch<React.SetStateAction<number>>;
}

const ThresholdInput = memo(
  ({ priceThreshold, setPriceThreshold }: ThresholdInputProps) => {
    const minValue = 0;
    const maxValue = 10000;
    const inputStep = 500;

    const handleThresholdChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setPriceThreshold(Math.max(Number(event.target.value), 0));
      },
      [setPriceThreshold]
    );

    return (
      <>
        <div>
          <label htmlFor="thresholdInput">Price threshold:</label>
          <input
            data-testid="ThresholdInput.numberInput"
            id="thresholdInput"
            style={{ width: '5rem', marginLeft: 5 }}
            type="number"
            min={minValue}
            step={inputStep}
            value={priceThreshold}
            onChange={handleThresholdChange}
          />
        </div>
        <input
          data-testid="ThresholdInput.rangeInput"
          type="range"
          min={minValue}
          max={maxValue}
          step={inputStep}
          value={priceThreshold}
          onChange={handleThresholdChange}
        />
      </>
    );
  }
);

export default ThresholdInput;
