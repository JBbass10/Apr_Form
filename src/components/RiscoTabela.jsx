import React from 'react';

export default function RiscoTabela({ titulo, riscos, medidas }) {
  return (
    <div className="border rounded mb-4 p-4">
      <h3 className="text-xl font-semibold mb-2">{titulo}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold">Riscos</h4>
          <ol className="list-decimal list-inside">
            {riscos.map((risco, index) => (
              <li key={index}>{risco}</li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="font-semibold">Medidas de Controle</h4>
          <ul className="list-disc list-inside">
            {medidas.map((medida, index) => (
              <li key={index}>{medida}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
