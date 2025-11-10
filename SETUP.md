# Setup do Projeto - To-Do List com Atomic Design

## Pré-requisitos

- Node.js 18+
- Conta no Supabase
- Conta na OpenAI (para geração de descrições com IA)

## Configuração do Ambiente

1. Clone o repositório e instale as dependências:
\`\`\`bash
npm install
\`\`\`

2. Copie o arquivo de exemplo e configure suas variáveis de ambiente:
\`\`\`bash
cp .env.example .env.local
\`\`\`

3. Configure as variáveis no arquivo `.env.local`:

### Supabase
- Acesse [https://supabase.com](https://supabase.com)
- Crie um novo projeto
- Vá em Settings > API
- Copie a `URL` e cole em `NEXT_PUBLIC_SUPABASE_URL`
- Copie a `anon/public key` e cole em `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### OpenAI
- Acesse [https://platform.openai.com](https://platform.openai.com)
- Vá em API Keys
- Crie uma nova chave
- Cole em `OPENAI_API_KEY`

## Configuração do Banco de Dados

Execute o script SQL localizado em `scripts/001_create_tables.sql` no seu projeto Supabase:

1. Acesse o Supabase Dashboard
2. Vá em SQL Editor
3. Cole o conteúdo do arquivo `scripts/001_create_tables.sql`
4. Execute o script

Isso criará:
- Tabela `users` (para armazenar usuários)
- Tabela `tasks` (para armazenar tarefas com relacionamento ao usuário)
- Políticas RLS (Row Level Security) para proteção dos dados

## Executar o Projeto

\`\`\`bash
npm run dev
\`\`\`

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

### Frontend (Atomic Design)
\`\`\`
components/
├── atoms/          # Componentes básicos (Checkbox, IconButton, TextInput)
├── molecules/      # Combinação de atoms (TodoItem, AddTodoForm, FilterTabs)
└── organisms/      # Módulos complexos (TodoList, TodoHeader)
\`\`\`

### Backend
\`\`\`
backend/
└── db/
    ├── supabase-client.ts    # Cliente Supabase
    ├── types.ts              # Tipos TypeScript
    ├── repositories/         # Camada de acesso ao banco
    └── services/             # Lógica de negócio
\`\`\`

### API Endpoints

Todos os endpoints estão em `app/api/`:

- **POST** `/api/users` - Criar/buscar usuário por email
- **GET** `/api/tasks?userId={id}` - Listar todas as tarefas do usuário
- **POST** `/api/tasks` - Criar nova tarefa
- **PUT** `/api/tasks/[id]` - Atualizar tarefa
- **DELETE** `/api/tasks/[id]` - Deletar tarefa
- **POST** `/api/generate-description` - Gerar descrição com IA

### Integração com Automação (n8n, Zapier, etc)

Os endpoints da API podem ser facilmente integrados com ferramentas de automação:

\`\`\`json
// Exemplo de requisição para criar tarefa
POST /api/tasks
Content-Type: application/json

{
  "user_id": "uuid-do-usuario",
  "title": "Minha tarefa",
  "description": "Descrição opcional",
  "completed": false
}
\`\`\`

## Features Implementadas

✅ Login/Identificação por email  
✅ CRUD completo de tarefas (Create, Read, Update, Delete)  
✅ Persistência em banco de dados Supabase  
✅ Edição inline de tarefas  
✅ Filtros (All, Active, Completed)  
✅ Contador de tarefas  
✅ Geração automática de descrições com IA  
✅ Design responsivo com tema escuro  
✅ Arquitetura Atomic Design  
✅ API RESTful para integrações externas  
✅ Padrão Controller-Service-Repository
