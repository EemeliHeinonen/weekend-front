import { ColumnDef } from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import Table from 'src/app/components/Table';
import ThresholdInput from 'src/app/components/ThresholdInput';

export interface StockEvent {
  symbol: string;
  price: number;
}

function MainView() {
  const [stockEvents, setStockEvents] = useState<StockEvent[]>([]);
  const [priceThreshold, setPriceThreshold] = useState(4000);
  const decoder = new TextDecoder();

  useSubscription('/topic/message', (message) => {
    console.log('Message received');
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
      <ThresholdInput
        priceThreshold={priceThreshold}
        setPriceThreshold={setPriceThreshold}
      />
      <Table data={data} columns={columns} priceThreshold={priceThreshold} />
    </div>
  );
}

export default MainView;
