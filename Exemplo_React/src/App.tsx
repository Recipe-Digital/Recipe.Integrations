import { useEffect, useState } from "react";
import "./App.css";
import dotenv from "dotenv";
dotenv.config();

declare function fazerRequisicao(request: any): void;

type RequestDTO = {
  ApiKey: string;
  numeroDoMedico: string;
  tipoPrescricao: number;
  paciente?: Paciente;
};
type Paciente = {
  nomeCompleto?: string;
  documento: string;
  telefone?: string;
  email?: string;
  endereco?: Endereco;
};
type Endereco = {
  logradouro: string;
  numeroEndereco: string;
  complemento: string;
  estado: string;
  cidade: string;
  bairro: string;
  cep: string;
};

function App() {
  const [formValues, setFormValues] = useState({
    nomeCompleto: "",
    documento: "",
    telefone: "",
    email: "",
    logradouro: "",
    numero: "",
    complemento: "",
    estado: "",
    cidade: "",
    bairro: "",
    cep: "",
    numeroDoMedico: "",
    tipoPrescricao: 100, // Default value
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/javascript";
    script.src = "embeded/src/recipe-integration-dev.min.js";
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const requestDTO: RequestDTO = {
      ApiKey: process.env.APP_API_KEY || "", // Replace with your actual API key
      numeroDoMedico: formValues.numeroDoMedico,
      tipoPrescricao: formValues.tipoPrescricao,
    };
    if (formValues.documento) {
      requestDTO["paciente"] = {
        nomeCompleto: formValues.nomeCompleto,
        documento: formValues.documento,
        telefone: formValues.telefone,
        email: formValues.email,
      };

      if (
        formValues.logradouro !== "" &&
        formValues.numero !== "" &&
        formValues.complemento !== "" &&
        formValues.estado !== "" &&
        formValues.cidade !== "" &&
        formValues.bairro !== "" &&
        formValues.cep !== ""
      ) {
        requestDTO["paciente"]["endereco"] = {
          logradouro: formValues.logradouro,
          numeroEndereco: formValues.numero,
          complemento: formValues.complemento,
          estado: formValues.estado,
          cidade: formValues.cidade,
          bairro: formValues.bairro,
          cep: formValues.cep,
        };
      }
    }
    fazerRequisicao(requestDTO);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="wrapper">
      <header className="header"> Aplicação Web Simulando integração</header>
      <main className="contaneir">
        <form onSubmit={handleSubmitForm}>
          <div className="paciente">
            <div className="paciente-c">
              <p className="header-form">Paciente</p>

              <div className="input-paciente">
                <label>Nome: </label>
                <input
                  id="nomeCompleto"
                  name="nomeCompleto"
                  placeholder="Nome do Paciente"
                  value={formValues.nomeCompleto}
                  onChange={handleChange}
                />
              </div>
              <div className="input-paciente">
                <label>CPF: </label>
                <input
                  id="documento"
                  name="documento"
                  placeholder="Cpf do Paciente"
                  value={formValues.documento}
                  onChange={handleChange}
                />
              </div>
              <div className="input-paciente">
                <label>Telefone: </label>
                <input
                  id="telefone"
                  name="telefone"
                  placeholder="Telefone do Paciente"
                  value={formValues.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-paciente">
                <label>Email: </label>
                <input
                  id="email"
                  name="email"
                  placeholder="Telefone do Paciente"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="endereco-c">
              <p className="header-form">Endereco</p>
              <div className="input-endereco">
                <label>Logradouro: </label>
                <input
                  id="logradouro"
                  name="logradouro"
                  placeholder="Lougradouro"
                  value={formValues.logradouro}
                  onChange={handleChange}
                />
              </div>
              <div className="sub">
                <div className="input-endereco">
                  <label>Numero: </label>
                  <input
                    id="numero"
                    name="numero"
                    placeholder="Numero"
                    value={formValues.numero}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-endereco">
                  <label>Complemento: </label>
                  <input
                    id="complemento"
                    name="complemento"
                    placeholder="Complemento"
                    value={formValues.complemento}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="sub">
                <div className="input-endereco">
                  <label>Estado: </label>
                  <input
                    id="estado"
                    name="estado"
                    placeholder="Estado"
                    value={formValues.estado}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-endereco">
                  <label>Cidade: </label>
                  <input
                    id="cidade"
                    name="cidade"
                    placeholder="Cidade"
                    value={formValues.cidade}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-endereco">
                  <label className="bairro">Bairro: </label>
                  <input
                    id="bairro"
                    name="bairro"
                    placeholder="Bairro"
                    value={formValues.bairro}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-endereco">
                <label>CEP: </label>
                <input
                  id="cep"
                  name="cep"
                  placeholder="CEP"
                  value={formValues.cep}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="medico">
            <div className="input-paciente">
              <label className="numeroDoMedico">Numero do Medico: </label>
              <input
                id="numeroDoMedico"
                name="numeroDoMedico"
                placeholder="Numero do medico"
                value={formValues.numeroDoMedico}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="prescricao">
            <div className="select">
              <label> Tipo de prescriição</label>
              <select
                id="tipoPrescricao"
                name="tipoPrescricao"
                value={formValues.tipoPrescricao}
                onChange={handleChange}
              >
                <option value="100">Nenhum</option>
                <option value="1">Receita</option>
                <option value="2">Exame</option>
                <option value="3">Atestado</option>
              </select>
            </div>
          </div>
          <div>
            <button className="submit-btn">Escrever Prescrição</button>
          </div>
        </form>
      </main>
      <footer className="footer">
        <p>Recipe Digital</p>
        <p>© Copyright - 2024</p>
      </footer>
    </div>
  );
}

export default App;
