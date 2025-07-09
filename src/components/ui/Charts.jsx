import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function Charts({ entrada, saida }) {
  const data = [
    { name: "Entradas", value: entrada },
    { name: "Saídas", value: saida },
  ];

  const cores = ["#22c55e", "#ef4444"]; // verde e vermelho

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {/* Gráfico de Pizza */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100">Distribuição</h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={60}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={cores[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de Barras */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <h4 className="text-md font-semibold mb-2 text-gray-800 dark:text-gray-100">Comparativo</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6">
              {data.map((_, index) => (
                <Cell key={index} fill={cores[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
