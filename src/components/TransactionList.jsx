function TransactionList({ transactions }) {
  if (transactions.length === 0) {
    return <p className="text-gray-500">Nenhuma transação cadastrada ainda.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Transações</h3>
      <ul className="divide-y divide-gray-200">
        {transactions.map((tx) => (
          <li key={tx.id} className="py-2 flex justify-between">
            <span className="text-gray-800">
              {tx.description} -{" "}
              <span className="text-sm text-gray-500">{tx.date}</span>
            </span>
            <span
              className={`font-bold ${
                tx.type === "entrada" ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.type === "saida" ? "- " : "+ "} R$ {tx.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
