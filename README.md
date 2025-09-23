# PicBoard — Front-end (parcial)
Aplicação **React + Vite** para visualização e análise de métricas financeiras da **PicMoney**.  
Este projeto entrega um **dashboard analítico** com visões para **CEO** e **CFO**, incluindo KPIs, gráficos e textos explicativos.

---

## 🌐 Demonstração (Azure Static Web Apps)

- **CEO:** <https://black-desert-0ae1e2a0f.2.azurestaticapps.net/ceo/dashboard>  
- **CFO:** <https://black-desert-0ae1e2a0f.2.azurestaticapps.net/cfo/dashboard>

---

## 📊 O que o dashboard entrega
- **Ticket médio**
- **Margem operacional**
- **Receita líquida**
- **Performance por tipo de cupom** (métricas + fórmula)
- **Análise temporal e performance por período do dia**
- **Participação diária**
- **Ticket médio diário**
- **Distribuição por período**
- **Top categorias de estabelecimentos**
- **Categorias de estabelecimentos** (participação e receita)
- **Validações** (tipos de cupom, receitas por tipo, repasses)

---

## 🧩 Tecnologias e bibliotecas

- **React** + **Vite** (HMR, build para `dist/`) 
- **Axios** (requisições HTTP)
- **Chart.js** + **react-chartjs-2** (gráficos de barras e pizza)
- **SCSS** (estilização modular)
- **react-icons**
- **Azure Static Web Apps** (deploy do front)
- **Azure App Service** (backend)
- Linguagens principais no repo: JavaScript/SCSS/HTML/CSS.

---

## 📁 Estrutura do projeto

```

front-end-picboard/
├─ .github/workflows/          # CI/CD (Azure SWA)
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ Sidebar/
│  │  ├─ KpiCard/
│  │  ├─ ChartBar/             # BarChart (genérico) e variações (duplo)
│  │  ├─ PieChart.jsx          # PieChart reutilizável (percent, currency, number)
│  │  └─ modal/KpiHelp.jsx     # Modal explicativo (resumo/completo)
│  ├─ hooks/
│  │  └─ useMediaQuery.js
│  ├─ pages/
│  │  ├─ CEOHome.jsx
│  │  └─ CFOHome.jsx
│  ├─ services/
│  │  ├─ api.js                # instancia Axios com baseURL derivada do VITE\_APIURL
│  │  ├─ ceoServices.js
│  │  └─ cfoServices.js
│  ├─ utils/
│  │  └─ formatters.js         # dinheiro, percentuais, números
│  ├─ styles/
│  │  └─ variables.scss
│  ├─ main.jsx / App.jsx / routes
│  └─ ...
├─ index.html
├─ vite.config.js
├─ staticwebapp.config.json    # fallback SPA no Azure SWA
└─ package.json

````

---

## 🔧 Configuração local

### Pré-requisitos
- **Node.js 18+** (recomendado 20+)
- **npm** ou **pnpm/yarn**

### 1) Clonar e instalar
```bash
git clone https://github.com/lipeoe/front-end-picboard.git
cd front-end-picboard
npm ci
````

### 2) Variáveis de ambiente (frontend)

Crie um arquivo `.env.local` na raiz do projeto:

```bash
VITE_APIURL=https://<SEU_BACKEND_APP_SERVICE>.azurewebsites.net/api
```

### 3) Executar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

### 4) Build de produção

```bash
npm run build
```

Saída em `dist/`.
Para pré-visualizar:

```bash
npm run preview
```

---

## ☁️ Deploy (Azure Static Web Apps)

O repositório já contém um workflow do **Azure SWA**. Para funcionar:

1. **Secrets no GitHub (repo → Settings → Secrets → Actions)**

   * `VITE_APIURL` → `https://<SEU_BACKEND_APP_SERVICE>.azurewebsites.net/api`
   * `AZURE_STATIC_WEB_APPS_API_TOKEN_*` → gerado ao conectar o repo no SWA

2. **Workflow**

   * `app_location: "/"` (ajuste se o app estiver em subpasta)
   * `output_location: "dist"` (Vite gera `dist/`, não `build/`)
   * `env` com `VITE_APIURL` no **job** ou no passo de deploy

3. **Fallback de SPA**

   * `staticwebapp.config.json` inclui `navigationFallback` para reescrever 404 → `index.html`.

---

## 🔌 Integração com o backend 

O front consome um backend (Express no App Service) sob `VITE_APIURL + "/api"`.
Endpoints utilizados:

* `GET /api/kpis/receita-total` → `{ total_valor_cupom: number }`
* `GET /api/kpis/receita-liquida` → `{ receita_liquida: number }`
* `GET /api/kpis/total-seguimentos` → `{ seguimentos: [{ categoria_estabelecimento, total_ocorrencias, total_valor_cupom }] }`
* `GET /api/kpis/total-parceiros` → `{ parceiros: [{ nome_estabelecimento, total_valor_cupom }] }`
* `GET /api/kpis/receita-por-cupom` → `{ dados_cupons: [{ tipo_cupom, quantidade, ticket_medio, total_repasse, receita_liquida, participacao_percentual }] }`
* **Temporal (exemplos)**

  * por dia da semana: `[{ dia_semana, ticket_medio, total_por_dia, participacao_percentual }]`
  * por período do dia: `[{ periodo, quantidade, total_valor_cupom, ticket_medio, participacao_percentual }]`

> Ajuste os nomes conforme o seu backend. O front espera **JSON** nos formatos acima.

---

## 🧠 Padrões e decisões de UI

* **Componentes reutilizáveis de gráfico**

  * `BarChart`: aceita `data`, `labelKey`, `valueKey`, `titulo`
  * `BarChartDuplo`: aceita **dois datasets** (ex.: `ticket_medio` e `total_por_dia`)
  * `PieChart`: recebe `data`, `labelKey`, `valueKey` e `format` (`percent|currency|number`)
* **Cards de KPI**: `KpiCard` usa utilitário `formatDisplay` (dinheiro, número, percent).
* **KpiHelp (modal)**: modo **resumo** ou **completo** com título, explicação e fórmula.
* **Responsividade**: uso de `useMediaQuery` para ajustar layout e conteúdo (ex.: variação de `KpiHelp` conforme largura).


---

## 📜 Licença

Não definida neste repositório.

---

[1]: https://github.com/lipeoe/front-end-picboard "GitHub - lipeoe/front-end-picboard"
