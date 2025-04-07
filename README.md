# Top 5 musicas Tião Carreiro & Pardinho - Frontend

Este é o frontend do projeto **Tião Carreiro**. A aplicação consome dados de uma API externa e apresenta uma interface interativa construída com tecnologias modernas do ecossistema web.
Veja tambem o backend do projeto:
https://github.com/viniblack/tiao-carreiro-be

## 🚀 Tecnologias Utilizadas

- **React**
- **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Axios**
- **React Router DOM**

## 🧑‍💻 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/viniblack/tiao-carreiro-fe.git
cd tiao-carreiro-fe
```

### 2. Instale as dependências

Certifique-se de ter o **Node.js** (versão 22 ou superior) instalado.

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com a seguinte variável:

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

> 📌 Substitua a URL pela base da sua API se necessário.

### 4. Rode o servidor de desenvolvimento

```bash
pnpm run dev
```

A aplicação estará disponível em: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Estrutura do Projeto

```bash
tiao-carreiro-fe/
├── public/
├── src/
│   ├── api/            
│   ├── assets/         
│   ├── components/      
│   ├── context/        
│   ├── hooks/          
│   ├── pages/           
│   ├── routes/         
│   ├── services/        
│   ├── App.tsx          
│   ├── index.css       
│   └── main.tsx        
├── .env.example  
├── .gitignore
├── eslint.config.js
├── index.html     
├── package.json
├── pnpm-lock.yaml
└── vite.config.ts
```

---

## 📦 Build para produção

Se quiser gerar os arquivos otimizados para produção:

```bash
pnpm run build
```

E para pré-visualizar o build localmente:

```bash
pnpm run preview
```
