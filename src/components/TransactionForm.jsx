import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select } from "./ui/select";


function TransactionForm({ onAdd }) {
  const [type, setType] = useState("entrada");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !date) {
      alert("Preencha todos os campos!");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type,
      description,
      amount: parseFloat(amount),
      date,
    };

    onAdd(newTransaction);

    // Resetar o formulário
    setType("entrada");
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-lg font-semibold mb-2">Adicionar Transação</h3>

      <div className="flex flex-col gap-2">
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </Select>

        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Valor (R$)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button type="submit" className="mt-2">
          Adicionar
        </Button>
      </div>
    </form>
  );
}

export default TransactionForm;
