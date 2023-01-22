import { memo, useCallback } from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
  inputStep?: number;
}

const NumberInput = memo(
  ({
    label,
    value,
    setValue,
    minValue = 0,
    maxValue = 10000,
    inputStep = 500,
  }: NumberInputProps) => {
    const handleValueChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Math.max(Number(event.target.value), 0));
      },
      [setValue]
    );

    return (
      <div>
        <div>
          <label htmlFor="numberInput">{label}:</label>
          <input
            data-testid="NumberInput.numberInput"
            id="numberInput"
            style={{ width: '5rem', marginLeft: 5 }}
            type="number"
            min={minValue}
            step={inputStep}
            value={value}
            onChange={handleValueChange}
          />
        </div>
        <input
          data-testid="NumberInput.rangeInput"
          type="range"
          min={minValue}
          max={maxValue}
          step={inputStep}
          value={value}
          onChange={handleValueChange}
        />
      </div>
    );
  }
);

export default NumberInput;
