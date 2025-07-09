import { formatCurrency, formatDate } from '@utils/formatters'

function TransactionList({ transactions, onRemove }) {
  if (transactions.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400">
        Nenhuma transação cadastrada ainda.
      </p>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Transações
      </h3>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {transactions.map((tx) => (
          <li key={tx.id} className="py-2 flex justify-between items-center">
            <div>
              <span className="text-gray-800 dark:text-gray-100">{tx.description}</span>
              <span className="block text-sm text-gray-500 dark:text-gray-400">
                {formatDate(tx.date)}
              </span>
            </div>

            <div className="text-right">
              <span
                className={`font-bold block ${
                  tx.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {tx.type === 'saida' ? '- ' : '+ '}
                {formatCurrency(tx.amount)}
              </span>
              <button
                onClick={() => onRemove(tx.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList