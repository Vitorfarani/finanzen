import { useState } from 'react'
import { Input } from '@ui/Input'
import { Select } from '@ui/Select'
import { Button } from '@ui/Button'

function TransactionForm({ onAdd }) {
  const [type, setType] = useState('entrada')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!description || !amount || !date) {
      setError('Preencha todos os campos.')
      return
    }

    if (parseFloat(amount) <= 0) {
      setError('O valor deve ser maior que zero.')
      return
    }

    const newTransaction = {
      id: Date.now(),
      type,
      description,
      amount: parseFloat(amount),
      date,
    }

    onAdd(newTransaction)

    // Limpar
    setDescription('')
    setAmount('')
    setDate('')
    setError('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6"
    >
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
        Adicionar Transação
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </Select>

        <Input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={40}
        />

        <Input
          type="number"
          placeholder="Valor (ex: 100.00)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0.01"
          step="0.01"
        />

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      <Button type="submit" className="mt-4">
        Adicionar
      </Button>
    </form>
  )
}

export default TransactionForm