# ☀️ ClimaHoje - Previsão do Tempo em Tempo Real

Uma aplicação web moderna, rápida e responsiva para consulta da previsão do tempo em qualquer lugar do mundo. Desenvolvida com **React**, **Vite** e **Tailwind CSS**, consumindo dados em tempo real da API gratuita **Open-Meteo**.

---

## 🚀 Funcionalidades

- 🔍 **Busca Inteligente com Autocomplete**: Encontre qualquer cidade do mundo com sugestões dinâmicas conforme digita.
- 📍 **Geolocalização (GPS)**: Detecte automaticamente sua localização atual com um clique.
- 🌡️ **Previsão Atual Completa**:
  - Temperatura atual e sensação térmica.
  - Umidade relativa do ar com barra de progresso.
  - Velocidade do vento.
  - Índice UV com classificação (Baixo, Moderado, Alto, Extremo).
  - Pressão atmosférica (hPa) e precipitação atual (mm).
  - Horários exatos de nascer e pôr do sol.
- ⏱️ **Previsão Hora a Hora**: Carrossel deslizável com as próximas 24 horas detalhando temperatura, ícone e probabilidade de chuva.
- 📅 **Previsão de 7 Dias**: Visualização da semana com barras proporcionais de amplitude térmica (mínima e máxima).
- 🎨 **Visual Dinâmico & Atmosfera Reativa**:
  - O gradiente de fundo e as partículas visuais mudam dinamicamente de acordo com o clima e período do dia:
    - Céu limpo durante o dia (raios de sol e calor).
    - Céu limpo à noite (estrelas cintilantes e luar).
    - Chuva e garoa (gotas de chuva caindo suavemente).
    - Tempestade (raios e pulsos eletrizantes).
    - Nublado, neblina e neve.
- ⭐ **Favoritos & Cidades Rápidas**: Salve suas cidades preferidas no armazenamento local (`localStorage`).
- 🔄 **Alternador de Unidades**: Alterne instantaneamente entre Celsius (°C) e Fahrenheit (°F).

---

## 🛠️ Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Ícones modernos)
- [Open-Meteo API](https://open-meteo.com/) (Dados meteorológicos gratuitos e sem necessidade de chaves pagas)
- [BigDataCloud API](https://www.bigdatacloud.com/) (Reverse geocoding para GPS)

---

## 💻 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/IkkiMachado/weather-app.git
   cd weather-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Acesse no navegador:
   ```
   http://localhost:5173
   ```

---

## 📦 Como Gerar a Versão de Produção

```bash
npm run build
```

Os arquivos otimizados para deploy serão gerados na pasta `dist/`.

---

## 📄 Licença

Este projeto é de código aberto sob a licença [MIT](LICENSE).
