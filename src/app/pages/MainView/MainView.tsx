import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useMemo, useState } from 'react';
import { useSubscription, useStompClient } from 'react-stomp-hooks';
import Table from 'src/app/components/Table';
import NumberInput from 'src/app/components/NumberInput';

export interface StockEvent {
  symbol: string;
  price: number;
}

function MainView() {
  const [stockEvents, setStockEvents] = useState<StockEvent[]>([]);
  const [priceThreshold, setPriceThreshold] = useState(4000);
  const [updateFrequencyInMs, setUpdateFrequencyInMs] = useState(100);
  const client = useStompClient();
  const decoder = new TextDecoder();

  const updateUpdateFrequency = useCallback(() => {
    if (client) {
      client.publish({
        destination: '/app/update-frequency',
        body: JSON.stringify({ updateFrequencyInMs }),
      });
    }
  }, [client, updateFrequencyInMs]);

  useSubscription('/topic/message', (message) => {
    const decodedMessage = decoder.decode(message.binaryBody);
    const eventUpdates = JSON.parse(decodedMessage);
    setStockEvents((previousEvents) => [
      ...eventUpdates,
      ...previousEvents.slice(0, 450),
    ]);
  });

  const data = useMemo(() => stockEvents, [stockEvents]);
  const columns = useMemo<ColumnDef<StockEvent>[]>(
    () => [
      {
        accessorKey: 'symbol',
        cell: (info) => info.getValue(),
        header: () => 'Symbol',
      },
      {
        accessorKey: 'price',
        cell: (info) => info.getValue(),
        header: () => 'Price',
      },
    ],
    []
  );

  return (
    <div>
      <p>stock events length: {stockEvents.length}</p>
      <NumberInput
        label="Update frequency"
        value={updateFrequencyInMs}
        setValue={setUpdateFrequencyInMs}
        minValue={5}
        maxValue={5000}
        inputStep={5}
      />
      <button
        style={{ marginBottom: '2rem' }}
        type="button"
        onClick={updateUpdateFrequency}
      >
        Set update frequency
      </button>
      <NumberInput
        label="Price threshold"
        value={priceThreshold}
        setValue={setPriceThreshold}
      />
      <Table data={data} columns={columns} priceThreshold={priceThreshold} />
    </div>
  );
}

export default MainView;
