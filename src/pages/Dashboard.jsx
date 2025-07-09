import Header from '@components/Header'
import TransactionForm from '@components/TransactionForm'
import TransactionList from '@components/TransactionList'
import Charts from '@ui/Charts'
import { useState, useMemo, useEffect } from 'react'
import { formatCurrency } from '@utils/formatters'

function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const dataSalva = localStorage.getItem("transactions");
    return dataSalva ? JSON.parse(dataSalva) : [];
  });

  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [filtroMes, setFiltroMes] = useState("");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleRemoveTransaction = (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir?");
    if (confirmacao) {
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const transacoesFiltradas = useMemo(() => {
    return transactions.filter((t) => {
      const tipoOK = filtroTipo === "todos" || t.type === filtroTipo;
      const mesOK = filtroMes === "" || t.date.startsWith(filtroMes);
      return tipoOK && mesOK;
    });
  }, [transactions, filtroTipo, filtroMes]);

  const totalEntrada = useMemo(
    () =>
      transacoesFiltradas
        .filter((t) => t.type === "entrada")
        .reduce((acc, curr) => acc + curr.amount, 0),
    [transacoesFiltradas]
  );

  const totalSaida = useMemo(
    () =>
      transacoesFiltradas
        .filter((t) => t.type === "saida")
        .reduce((acc, curr) => acc + curr.amount, 0),
    [transacoesFiltradas]
  );

  const saldoTotal = totalEntrada - totalSaida;

  return (
    <div>
      <Header />
      <main className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Painel Financeiro
        </h2>

        {/* FILTROS */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border rounded p-2 dark:bg-gray-800 dark:text-white"
          >
            <option value="todos">Todos</option>
            <option value="entrada">Entradas</option>
            <option value="saida">Saídas</option>
          </select>

          <input
            type="month"
            value={filtroMes}
            onChange={(e) => setFiltroMes(e.target.value)}
            className="border rounded p-2 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <TransactionForm onAdd={handleAddTransaction} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Saldo Total</h3>
            <p className="text-xl font-bold text-green-600">
              {formatCurrency(saldoTotal)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Entradas</h3>
            <p className="text-xl font-bold text-blue-600">
              {formatCurrency(totalEntrada)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500 dark:text-gray-400">Saídas</h3>
            <p className="text-xl font-bold text-red-600">
              {formatCurrency(totalSaida)}
            </p>
          </div>
        </div>

        <Charts entrada={totalEntrada} saida={totalSaida} />

        <TransactionList
          transactions={transacoesFiltradas}
          onRemove={handleRemoveTransaction}
        />
      </main>
    </div>
  );
}

export default Dashboard;