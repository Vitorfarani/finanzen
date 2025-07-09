import Header from "../components/Header";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import { useState, useMemo } from "react";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const totalEntrada = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "entrada")
        .reduce((acc, curr) => acc + curr.amount, 0),
    [transactions]
  );

  const totalSaida = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "saida")
        .reduce((acc, curr) => acc + curr.amount, 0),
    [transactions]
  );

  const saldoTotal = totalEntrada - totalSaida;

  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Painel Financeiro
        </h2>

        {/* Formulário */}
        <TransactionForm onAdd={handleAddTransaction} />

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500">Saldo Total</h3>
            <p className="text-xl font-bold text-green-600">
              R$ {saldoTotal.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500">Entradas</h3>
            <p className="text-xl font-bold text-blue-600">
              R$ {totalEntrada.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-sm text-gray-500">Saídas</h3>
            <p className="text-xl font-bold text-red-600">
              R$ {totalSaida.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Lista de transações */}
        <TransactionList transactions={transactions} />
      </main>
    </div>
  );
}

export default Dashboard;
