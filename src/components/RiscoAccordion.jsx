
import React from 'react';

export default function RiscoAccordionExpandido({ titulo, opcoes, selecionados, onToggle }) {
  return (
    <div className="border border-gray-300 rounded-lg bg-gray-50 shadow-sm mb-6">
      <div className="w-full text-center px-4 py-3 bg-blue-100 text-blue-800 font-semibold rounded-t text-2xl">
        {titulo}
      </div>
      <div className="px-4 py-3 space-y-3">
        {Array.isArray(opcoes) && typeof opcoes[0] === 'string' ? (
          opcoes.map((opcao, index) => (
            <div key={opcao} className="flex items-start gap-2 mb-2">
              <input
                type="checkbox"
                checked={selecionados.includes(opcao)}
                onChange={() => onToggle(opcao)}
              />
              <span className="block text-red-700 leading-snug">{index + 1}. {opcao}</span>
            </div>
          ))
        ) : (
          opcoes.map((grupo) => {
            const isMedida = grupo.subtitulo.toLowerCase().includes('medida');
            const corTexto = isMedida ? 'text-blue-700' : 'text-red-700';

            return (
              <div key={grupo.subtitulo}>
                <h4 className="font-semibold mt-2">{grupo.subtitulo}</h4>
                {grupo.itens.map((item, index) => (
                  <div key={item} className="flex items-start gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selecionados.includes(item)}
                      onChange={() =>
                        onToggle(isMedida ? 'medidas' : 'riscos', item)
                      }
                    />
                    <span className={`block leading-snug ${corTexto}`}>
                      {index + 1}. {item}
                    </span>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
