import { ColumnDef } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';
import Table from 'src/app/components/Table';

export interface StockEvent {
  symbol: string;
  price: number;
}

function MainView() {
  const [stockEvents, setStockEvents] = useState<StockEvent[]>([]);
  const decoder = new TextDecoder();

  useSubscription('/topic/message', (message) => {
    console.log('Message received');
    const decodedMessage = decoder.decode(message.binaryBody);
    const eventUpdates = JSON.parse(decodedMessage);
    setStockEvents((previousEvents) => [...eventUpdates, ...previousEvents.slice(0, 450)]);
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
      <Table data={data} columns={columns} />
    </div>
  );
}

export default MainView;
