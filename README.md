# Projeto Tião Carreiro (Frontend)

Este é o **frontend** do projeto _Tião Carreiro_, uma aplicação web que exibe as músicas mais populares da dupla **Tião Carreiro & Pardinho** e permite que usuários sugiram novos links de vídeos do YouTube.

> A aplicação consome dados de uma **API REST** externa e entrega uma experiência moderna, responsiva e intuitiva.

🔗 Confira também o repositório do [**backend em Laravel**](https://github.com/viniblack/tiao-carreiro-be)

---

## 🧪 Tecnologias & Ferramentas

- ⚛️ **React + Vite**
- 🎨 **Tailwind CSS** + **Material UI**
- 🔗 **Axios** para requisições HTTP
- 🌐 **React Router DOM** para rotas SPA
- 🧪 **Vitest** para testes automatizados
  
---

## 🧑‍💻 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/viniblack/tiao-carreiro-fe.git
cd tiao-carreiro-fe
```

### 2. Instale as dependências

Certifique-se de ter o **Node.js v20+** e **pnpm** instalado.

```bash
pnpm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz com:

```env
VITE_API_URL=http://127.0.0.1:8000/api/
```

> 💡 Altere a URL se estiver utilizando outro backend ou domínio.

### 4. Inicie o servidor de desenvolvimento

```bash
pnpm run dev
```

Acesse via navegador: [http://localhost:5173](http://localhost:5173)

---

## 🧭 Estrutura de Pastas

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

## 🧪 Testes

Execute todos os testes da aplicação com:

```bash
pnpm test
```

---

## 🙌 Contribuições

Este projeto foi desenvolvido como parte de um desafio técnico individual.
Sinta-se à vontade para explorar, clonar ou dar sugestões!

--- 

Desenvolvido com 💻 por Vinicius — ao som de modão raiz 🎧
