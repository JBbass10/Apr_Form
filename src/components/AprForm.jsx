
import React, { useState } from 'react';
import RiscoAccordionExpandido from './RiscoAccordionExpandido';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { generatePdfTabela } from "./PdfTabela";

export default function AprForm() {
 const [form, setForm] = useState({
  atividade: '',
  data: '',
  local: '',
  responsaveis: [''], // substitui "responsavel"
  riscos: [],
  medidas: [],
  epi: [],
  declaracao: false,
  seguranca: '',
  linhaViva: false,
  linhaMorta: false
});

const handleResponsavelChange = (index, value) => {
  const novos = [...form.responsaveis];
  novos[index] = value;
  setForm({ ...form, responsaveis: novos });
};

const adicionarResponsavel = () => {
  setForm({ ...form, responsaveis: [...form.responsaveis, ''] });
};

const removerResponsavel = (index) => {
  const novos = form.responsaveis.filter((_, i) => i !== index);
  setForm({ ...form, responsaveis: novos });
};


  const riscosDisponiveis = [
    'Contato acidental com barramento/cabo energizado',
    'Curto-circuito (Fase-Terra / Fase-Fase)',
    'Descarga Atmosférica',
    'Erro de manobra',
    'Indução por circuitos energizados próximos',
    'Presença de tensão elétrica indevida',
    'Reenergização Indevida',
    'Tensão de Passo, Toque e Transferência'
  ];

  const riscosdeQueda = [
    'Queda com diferença de nível',
    'Queda em mesmo nível',
    'Queda de andaime',
    'Queda de escada',
    'Queda de material / ferramenta',
    'Queda do cesto aéreo / Sky'
  ];

  const riscosRelacionadosaFerrementas = [
    'Ferramenta indisponível',
    'Ferramenta danificada',
    'Ferramenta inadequada'
  ];

  const riscosdeMovimentação = [
    'Existência de outros trabalhos no local da movimentação',
    'Queda de material - ferramenta',
    'Carga além do limite de capacidade do equipamento',
    'Transporte inadequado de equipamentos (escada, outros)',
    'Tombamento do veículo, equipamento.',
    'Acessórios com problemas (cintas, cordas, gancho, outros)',
    'Postura inadequada (movimentação manual)'
  ];

  const riscoTransitoVeiculo = [
    'Atropelamento',
    'Colisão com veículos',
    'Contato de carga/lança (guindauto) em parte energizada',
    'Deslocamento acidental do veículo',
    'Queda de Carga',
    'Solo Irregular ou escorregadio',
    'Tombamento de veiculo'
  ];

  const riscosTraumas = [
    'Lesão muscular / articulação (ombro, lombar, pescoço)',
    'Pancada, machucado, lesão leve e fraturas',
  ];

  const medidasdePrevenção = [
    'Manusear corretamente e adequadamente as ferramentas e equipamentos',
    'Utilizar os EPIs especificos'
  ];

  const riscosLinhaViva = [
    'Arco elétrico (equalização, abertura/fechamento de pulos e bypass',
    'Curto-circuito entre fase e terra não protegidos',
    'Curto-circuito entre ponto de fases diferentes não protegida',
    'Fuga de corrente pelo sky, escada ou andaime'
  ];

  const demaisRiscos = [
    'Ataque de animais, insetos ou animais peçonhentos',
    'Radiação Solar'
  ];

  const medidasDisponiveis = [
    'Verificar ausência de tensão',
    'Usar EPI específico',
    'Sinalizar área de trabalho',
    'Checklist do veículo',
    'Aterrar equipamentos',
    'Amarrar escada',
    'Isolar área de risco',
    'Utilizar ferramentas adequadas'
  ];

  const episDisponiveis = [
    'Capacete de segurança',
    'Óculos de proteção',
    'Luvas de segurança',
    'Detector de tensão',
    'Cobertura isolante',
    'Conjunto de resgate',
    'Linha de vida',
    'Manga de proteção',
    'Protetor facial'
  ];

  const toggleCheckbox = (listName, value) => {
    setForm((prev) => {
      const list = prev[listName];
      const updatedList = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [listName]: updatedList };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const salvarApr = async () => {
    try {
      await addDoc(collection(db, 'aprs'), form);
      alert('APR salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar APR:', error);
      alert('Erro ao salvar APR.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'apr'), form);
      generatePdfTabela(form);
    } catch (error) {
      console.error('Erro ao salvar ou gerar PDF:', error);
    }
  };

  return (
    <div className="container">
      {/* Seção 1: Dados iniciais */}
      <section className="section">
        <div className="form-section">
          <h2>APR - Escola de Eletricistas</h2>
          <div className="input-group">
            <input name="atividade" placeholder="Atividade" onChange={handleChange} />
            <input name="data" type="date" onChange={handleChange} />
            <input name="local" placeholder="Local" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>
              <input
                type="checkbox"
                name="linhaViva"
                checked={form.linhaViva}
                onChange={handleChange}
              />
              Linha Viva
            </label>
            <label style={{ marginLeft: '1rem' }}>
              <input
                type="checkbox"
                name="linhaMorta"
                checked={form.linhaMorta}
                onChange={handleChange}
              />
              Linha Morta
            </label>
          </div>
        </div>
      </section>

      {/* Seções de risco */}
      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCO ELÉTRICO"
          opcoes={[
            { subtitulo: "Riscos", itens: riscosDisponiveis },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Sinalizar e delimitar a área de trabalho',
              'Abrir com corte visível',
              'Limitar mec.- Instalar placa de sinal.',
              'Verificar ausência de tensão',
              'Aterrar (lado Fonte - lado carga)',
              'Bloquear religamento automático',
              'Manter distância de segurança',
              'Proteger os pontos vivos.',
              'Utilizar do loadbuster (manobra)',
              'Utilizar EPCs específicos',
              'Utilizar EPIs específicos',
              'Utilizar placa de sinalização'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCO DE QUEDAS"
          opcoes={[
            { subtitulo: "Riscos", itens: riscosdeQueda },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Amarrar escada(topo e centro)',
              'Analisar integridade da estrutura',
              'Apoiar no solo a sapata da escada',
              'Estaiar Andaime',
              'Estaiar poste',
              'Estabilizar com sapatas a base do andaime',
              'Instalar conjunto de resgate',
              'Utilizar a bolsa pra içar materiais',
              'Utilizar a corda de serviço',
              'Utilizar a linha de vida'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCO RELACIONADOS ÀS FERRAMENTAS DE TRABALHO"
          opcoes={[
            { subtitulo: "Riscos", itens: riscosRelacionadosaFerrementas },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Verificar tipo/dimensionamento adequado da ferramenta',
              'Realizar check-list antes de sair',
              'Verificar / testar ferramentas',
              'Verificar validade dos testes de isolamento',
              'Limpar e retirar a umidade das ferramentas isoladas, bastões e varas de manobra'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCO DE MOVIMENTAÇÃO DE CARGAS"
          opcoes={[
            { subtitulo: "Riscos", itens: riscosdeMovimentação },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Acionar freio.',
              'Analisar ambiente.',
              'Calçar o veículo (fixar).',
              'Isolar a área.',
              'Sinalizar área.',
              'Não transitar SOB cargas içadas.',
              'Utilizar cintas de içamento com capacidade para suportar a carga.',
              'Inspecionar integridade das cintas de içamento.', 
              'Instalar Aterramento no guindauto e Sky.'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCO DE TRÂNSITO DE VEICULOS E PEDESTRES"
          opcoes={[
            { subtitulo: "Riscos", itens: riscoTransitoVeiculo },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Acionar freio de mão do veículo.',
              'Analisar ambiente de trabalho.',
              'Calçar o veículo.',
              'Isolar a área de trabalho.',
              'Sinalizar área de trabalho.',
              'Não transitar SOB cargas içadas.',
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCO ERGONÔMICOS / TRAUMAS"
          opcoes={[
            { subtitulo: "Riscos", itens: riscosTraumas },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Manusear corretamente e adequadamente as ferramentas e equipamentos',
              'Utilizar os EPIs especificos'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="RISCOS DE TRABALHO COM LINHA VIVA - MT e AT"
          opcoes={[
            { subtitulo: "Riscos", itens: riscosLinhaViva },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Sinalizar a área de trabalho',
              'Abrir com corte visível.',
              'Limitar - Instalar placa de sinal.',
              'Ausência de tensão',
              'Aterrar ',
              'Bloquear religamento',
              'Manter distância',
              'Proteger os pontos vivos',
              'Utilizar do loadbuster',
              'Utilizar EPCs específicos.',
              'Utilizar EPIs específicos.',
              'Utilizar placa de sinalização.'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
        <RiscoAccordionExpandido
          titulo="ESPAÇO DESTINADO A DEMAIS RISCOS ENCONTRADOS E MEDIDAS ADOTADAS"
          opcoes={[
            { subtitulo: "Riscos", itens: demaisRiscos },
            { subtitulo: "Medidas de Prevenção", itens: [
              'Utilizar perneiras e vestimentas específicas',
              'Realizar checklist do veículo',
              'Utilizar apoios de sapata adequados.',
              'Certificar-se que o By-pass suporta a corrente ao qual será submetido.',
              'Acompanhar corrente de fulga do Sky',
              'Limpar e retirar humidade da lança e do cesto isolado'
            ]}
          ]}
          selecionados={[...form.riscos, ...form.medidas]}
          onToggle={(campo, valor) => toggleCheckbox(campo, valor)}
        />
      </section>

      <section className="section">
  <div>
    <h3 className="font-semibold text-center text-gray-800 mb-4">
      Equipamentos de Proteção
    </h3>
    <ul className="space-y-2">
      {episDisponiveis.map((epi) => (
        <li key={epi} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.epi.includes(epi)}
            onChange={() => toggleCheckbox('epi', epi)}
          />
          <span className="text-green-700">{epi}</span>
        </li>
      ))}
    </ul>
  </div>

        <div>
          <p className="text-gray-800">Após a análise, o serviço oferece segurança?</p>
          <label className="mr-4">
            <input type="radio" name="seguranca" value="sim" onChange={handleChange} /> Sim
          </label>
          <label>
            <input type="radio" name="seguranca" value="nao" onChange={handleChange} /> Não
          </label>
        </div>

        <div className="mb-4">
  <p className="text-gray-800 font-semibold mb-2">Responsáveis:</p>
  {form.responsaveis.map((nome, index) => (
    <div key={index} className="flex items-center gap-2 mb-2">
      <input
        type="text"
        value={nome}
        onChange={(e) => handleResponsavelChange(index, e.target.value)}
        placeholder={`Responsável ${index + 1}`}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      {form.responsaveis.length > 1 && (
        <button
          type="button"
          onClick={() => removerResponsavel(index)}
          className="text-red-500 hover:text-red-700"
        >
          Remover
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={adicionarResponsavel}
    className="text-blue-600 hover:underline mt-2"
  >
    + Adicionar responsável
  </button>
</div>

        <div className="flex gap-4">
          <button onClick={salvarApr} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow">Salvar</button>
          <button
            onClick={() => generatePdfTabela(form)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded shadow"
          >
            Exportar PDF
          </button>
        </div>
      </section>
    </div>
  );
}
