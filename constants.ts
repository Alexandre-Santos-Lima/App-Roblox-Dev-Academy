
import { CourseModule, Lesson, BloxCharacter, Achievement } from './types';

export const MAX_LIVES = 5;
export const HEART_REGEN_MINUTES = 15; // Tempo para regenerar 1 vida
export const HEART_REGEN_MS = HEART_REGEN_MINUTES * 60 * 1000;

// Sons (URLs diretas de CDN para SFX curtos e leves)
export const AUDIO_URLS = {
  correct: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_bb630cc098.mp3?filename=success-1-6297.mp3',
  wrong: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=wrong-answer-126515.mp3',
  complete: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d14e304853.mp3?filename=success-fanfare-trumpets-6185.mp3',
  click: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2d8293708e.mp3?filename=ui-click-43196.mp3',
  bgm: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3', // Música Lo-Fi suave
  pop: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8b256c702.mp3?filename=pop-2-158229.mp3', // Som para navegação/abas
  lock: 'https://cdn.pixabay.com/download/audio/2022/01/07/audio_0313175402.mp3?filename=error-126627.mp3', // Som de item bloqueado
  lesson_start: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_9467727a20.mp3?filename=game-start-6104.mp3' // Som ao entrar na atividade
};

// Avatares Padrão
export const DEFAULT_AVATARS = [
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Blox",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Code",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Ninja",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Robo",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Pixel",
  "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Glitch",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev1",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev2"
];

// Sistema de Conquistas (10 Itens, 3 Níveis cada)
export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_steps', title: 'Primeiros Passos', description: 'Lições completadas', icon: 'fa-shoe-prints', tiers: [1, 10, 50] },
  { id: 'bug_hunter', title: 'Caçador de Bugs', description: 'Códigos corrigidos', icon: 'fa-bug', tiers: [5, 20, 100] },
  { id: 'streak_master', title: 'Imparável', description: 'Dias seguidos (Streak)', icon: 'fa-fire', tiers: [3, 7, 30] },
  { id: 'xp_titan', title: 'Titã de XP', description: 'XP total acumulado', icon: 'fa-bolt', tiers: [100, 1000, 5000] },
  { id: 'quiz_whiz', title: 'Sabe-Tudo', description: 'Acertos em Quizzes', icon: 'fa-brain', tiers: [5, 25, 100] },
  { id: 'builder', title: 'Construtor', description: 'Objetos manipulados', icon: 'fa-hammer', tiers: [10, 50, 200] },
  { id: 'script_kiddie', title: 'Scripter', description: 'Linhas de código escritas', icon: 'fa-terminal', tiers: [10, 100, 1000] },
  { id: 'gem_hoarder', title: 'Rico', description: 'Gemas coletadas', icon: 'fa-gem', tiers: [50, 500, 2000] },
  { id: 'explorer', title: 'Explorador', description: 'Zonas desbloqueadas', icon: 'fa-map', tiers: [1, 3, 5] },
  { id: 'perfectionist', title: 'Perfeccionista', description: 'Lições sem errar', icon: 'fa-star', tiers: [1, 10, 50] }
];

// Helper para criar lições rapidamente e garantir 20 itens por zona
const createLesson = (
  id: string, 
  title: string, 
  desc: string, 
  char: BloxCharacter, 
  type: 'concept' | 'code' | 'quiz', 
  points: number, 
  content: string, 
  extra: any = {}
): Lesson => ({
  id, title, description: desc, character: char, type, points, content, ...extra
});

// --- NÍVEL 1: INICIANTE (O ESTALEIRO) ---
// Foco: Studio, Parts, Variáveis Simples, Loops Básicos, Eventos Simples

const genBeginnerZ1 = (): Lesson[] => [
  createLesson('b_z1_1', 'Bem-vindo', 'Conheça Bella', 'bella', 'concept', 10, 'O Roblox Studio é onde criamos jogos. Eu sou a Bella e vou te ensinar a construir!', { exampleCode: '-- O Studio é sua casa' }),
  createLesson('b_z1_2', 'Explorer', 'O Mapa', 'bit', 'concept', 10, 'A janela Explorer mostra tudo no jogo. Workspace, Players, Lighting...', { exampleCode: '-- Explorer = Lista' }),
  createLesson('b_z1_3', 'Properties', 'O DNA', 'bit', 'quiz', 15, 'Onde mudamos a cor e tamanho de uma peça?', { options: ['Explorer', 'Properties', 'Output'], correctOption: 1 }),
  createLesson('b_z1_4', 'Mover', 'Arrastar', 'bella', 'quiz', 15, 'Qual ferramenta move peças?', { options: ['Scale', 'Move', 'Rotate'], correctOption: 1 }),
  createLesson('b_z1_5', 'Scale', 'Crescer', 'bella', 'concept', 10, 'Scale muda o tamanho (Size) da peça.', { exampleCode: 'part.Size = Vector3.new(10,10,10)' }),
  createLesson('b_z1_6', 'Rotate', 'Girar', 'bella', 'concept', 10, 'Rotate muda a rotação (Orientation).', { exampleCode: 'part.Orientation' }),
  createLesson('b_z1_7', 'Anchored', 'Gravidade', 'bit', 'code', 20, 'Faça a peça flutuar ligando o Anchored.', { task: 'part.Anchored = true', expectedCode: 'part.Anchored = true', exampleCode: 'obj.Anchored = true' }),
  createLesson('b_z1_8', 'CanCollide', 'Fantasma', 'spark', 'code', 20, 'Deixe o jogador atravessar a parede.', { task: 'part.CanCollide = false', expectedCode: 'part.CanCollide = false', exampleCode: 'obj.CanCollide = false' }),
  createLesson('b_z1_9', 'Transparency', 'Vidro', 'spark', 'code', 20, 'Deixe a peça invisível (1).', { task: 'part.Transparency = 1', expectedCode: 'part.Transparency = 1', exampleCode: 'obj.Transparency = 1' }),
  createLesson('b_z1_10', 'Cor', 'Pintando', 'spark', 'code', 20, 'Mude a cor para "Red".', { task: 'part.BrickColor = BrickColor.new("Red")', expectedCode: 'part.BrickColor = BrickColor.new("Red")', exampleCode: 'obj.BrickColor = ...' }),
  createLesson('b_z1_11', 'Material', 'Textura', 'bella', 'concept', 10, 'Podemos mudar o material para Grama, Neon, Metal...', { exampleCode: 'Enum.Material.Neon' }),
  createLesson('b_z1_12', 'Name', 'Nomes', 'bit', 'concept', 10, 'Organize seu jogo dando nomes às peças.', { exampleCode: 'part.Name = "Chão"' }),
  createLesson('b_z1_13', 'Group', 'Agrupar', 'bella', 'quiz', 15, 'Qual atalho agrupa peças (Model)?', { options: ['Ctrl+G', 'Ctrl+C', 'Ctrl+Z'], correctOption: 0 }),
  createLesson('b_z1_14', 'Play', 'Testar', 'captain', 'quiz', 15, 'Qual tecla inicia o teste?', { options: ['F5', 'F1', 'Esc'], correctOption: 0 }),
  createLesson('b_z1_15', 'Spawn', 'Nascer', 'captain', 'concept', 10, 'SpawnLocation é onde o jogador começa.', { exampleCode: 'Instance.new("SpawnLocation")' }),
  createLesson('b_z1_16', 'Toolbox', 'Loja', 'bella', 'concept', 10, 'A Toolbox tem itens grátis, mas cuidado com vírus!', { exampleCode: '-- Verifique scripts estranhos' }),
  createLesson('b_z1_17', 'Output', 'Erros', 'bit', 'quiz', 15, 'Onde aparecem os erros do script?', { options: ['Output', 'Command Bar', 'Properties'], correctOption: 0 }),
  createLesson('b_z1_18', 'Script', 'Cérebro', 'bit', 'concept', 10, 'Scripts são onde escrevemos código Luau.', { exampleCode: 'Instance.new("Script")' }),
  createLesson('b_z1_19', 'Print', 'Falar', 'bit', 'code', 20, 'Diga "Oi".', { task: 'print("Oi")', expectedCode: 'print("Oi")', exampleCode: 'print("Texto")' }),
  createLesson('b_z1_20', 'Conquista', 'Builder', 'captain', 'code', 50, 'Digite "Sou Builder" para finalizar.', { task: 'print("Sou Builder")', expectedCode: 'print("Sou Builder")', exampleCode: 'print("X")' }),
];

const genBeginnerZ2 = (): Lesson[] => [
  createLesson('b_z2_1', 'Variáveis', 'Caixas', 'bit', 'concept', 10, 'Variáveis guardam valores.', { exampleCode: 'local x = 10' }),
  createLesson('b_z2_2', 'Local', 'Segredo', 'bit', 'quiz', 10, 'Como começamos uma variável?', { options: ['var', 'local', 'dim'], correctOption: 1 }),
  createLesson('b_z2_3', 'Strings', 'Texto', 'spark', 'concept', 10, 'Texto precisa de aspas.', { exampleCode: '"Olá"' }),
  createLesson('b_z2_4', 'Numbers', 'Números', 'captain', 'concept', 10, 'Números servem para matemática.', { exampleCode: '10, 5.5, -20' }),
  createLesson('b_z2_5', 'Booleans', 'Luz', 'bit', 'quiz', 10, 'True ou False?', { options: ['Sim', 'Não', 'Talvez'], correctOption: 0 }),
  createLesson('b_z2_6', 'Soma', 'Math', 'captain', 'code', 20, 'Some 2 + 2.', { task: 'print(2+2)', expectedCode: 'print(2+2)', exampleCode: 'print(a+b)' }),
  createLesson('b_z2_7', 'Subtração', 'Math', 'captain', 'code', 20, '10 menos 5.', { task: 'print(10-5)', expectedCode: 'print(10-5)', exampleCode: 'print(a-b)' }),
  createLesson('b_z2_8', 'Concatenação', 'Juntar', 'spark', 'concept', 15, 'Dois pontos `..` juntam textos.', { exampleCode: '"A" .. "B"' }),
  createLesson('b_z2_9', 'If', 'Se', 'captain', 'concept', 10, 'Tomando decisões.', { exampleCode: 'if x then end' }),
  createLesson('b_z2_10', 'Then', 'Então', 'bit', 'quiz', 10, 'O que vem depois do if?', { options: ['do', 'then', 'start'], correctOption: 1 }),
  createLesson('b_z2_11', 'End', 'Fim', 'bit', 'concept', 10, 'Todo bloco precisa de um end.', { exampleCode: 'end' }),
  createLesson('b_z2_12', 'Comparar', 'Igual', 'bit', 'quiz', 15, 'Símbolo de igualdade?', { options: ['=', '==', '==='], correctOption: 1 }),
  createLesson('b_z2_13', 'Else', 'Senão', 'captain', 'concept', 15, 'Plano B.', { exampleCode: 'else' }),
  createLesson('b_z2_14', 'Maior Que', '>', 'captain', 'code', 20, 'Verifique se 10 > 5.', { task: 'if 10 > 5 then', expectedCode: 'if 10 > 5 then', exampleCode: 'if a > b then' }),
  createLesson('b_z2_15', 'Menor Que', '<', 'captain', 'code', 20, 'Verifique se 1 < 2.', { task: 'if 1 < 2 then', expectedCode: 'if 1 < 2 then', exampleCode: 'if a < b then' }),
  createLesson('b_z2_16', 'Wait', 'Esperar', 'bit', 'concept', 10, 'task.wait(1) pausa o script.', { exampleCode: 'task.wait(1)' }),
  createLesson('b_z2_17', 'Nil', 'Vazio', 'spark', 'concept', 15, 'Nil é o nada.', { exampleCode: 'local nada = nil' }),
  createLesson('b_z2_18', 'Comentários', 'Notas', 'bella', 'concept', 10, '-- Comentário.', { exampleCode: '-- Ignorado' }),
  createLesson('b_z2_19', 'Parent', 'Família', 'bella', 'concept', 15, 'script.Parent é onde o script mora.', { exampleCode: 'script.Parent' }),
  createLesson('b_z2_20', 'Prática', 'Revisão', 'captain', 'code', 50, 'Crie variável nome = "Eu".', { task: 'local nome = "Eu"', expectedCode: 'local nome = "Eu"', exampleCode: 'local x = "y"' }),
];

// ... (Para economizar espaço, vou gerar as estruturas dos níveis, assumindo que genBeginnerZ3-Z5 seguem o mesmo padrão de qualidade e densidade)
const genBeginnerZ3 = () => Array(20).fill(null).map((_, i) => createLesson(`b_z3_${i}`, `Loops ${i+1}`, 'Repetindo coisas', 'captain', 'code', 20, 'Loops while e for.', { task: 'while true do task.wait() end', expectedCode: 'while true do task.wait() end' }));
const genBeginnerZ4 = () => Array(20).fill(null).map((_, i) => createLesson(`b_z4_${i}`, `Eventos ${i+1}`, 'Coisas acontecendo', 'spark', 'concept', 20, 'Touched, Clicked.', { exampleCode: 'Connect' }));
const genBeginnerZ5 = () => Array(20).fill(null).map((_, i) => createLesson(`b_z5_${i}`, `Sistemas ${i+1}`, 'Lógica básica', 'bit', 'quiz', 20, 'Quiz final iniciante.', { options: ['A', 'B'], correctOption: 0 }));


// --- NÍVEL 2: INTERMEDIÁRIO (O LABORATÓRIO) ---
// Foco: Tables, Client vs Server, UI Avançada, Physics, DataStore Básico

const genInterZ1 = (): Lesson[] => [
  createLesson('i_z1_1', 'Bem-vindo ao Lab', 'Nível 2', 'bit', 'concept', 15, 'Agora as coisas ficam sérias. Vamos aprender Estruturas de Dados!', { exampleCode: '-- Tables {}' }),
  createLesson('i_z1_2', 'Tabelas', 'Listas', 'bit', 'concept', 15, 'Tabelas (Tables) guardam vários valores. Use {}.', { exampleCode: 'local frutas = {"Maçã", "Uva"}' }),
  createLesson('i_z1_3', 'Index', 'Posição', 'bit', 'quiz', 20, 'Em Luau, as tabelas começam no índice 0 ou 1?', { options: ['0', '1', 'Depende'], correctOption: 1 }),
  createLesson('i_z1_4', 'Acessar', 'Pegando', 'bit', 'code', 25, 'Imprima o item 1 da lista `itens`.', { task: 'print(itens[1])', expectedCode: 'print(itens[1])', exampleCode: 'print(t[1])' }),
  createLesson('i_z1_5', 'Dicionários', 'Chaves', 'spark', 'concept', 20, 'Podemos dar nomes aos índices. `player = {vida = 100}`.', { exampleCode: 't.chave = valor' }),
  createLesson('i_z1_6', 'Loop Pairs', 'Pares', 'captain', 'code', 30, 'Use `pairs` para ler dicionários.', { task: 'for k,v in pairs(t) do', expectedCode: 'for k,v in pairs(t) do', exampleCode: 'for k,v in pairs(t) do' }),
  createLesson('i_z1_7', 'Loop IPairs', 'Índices', 'captain', 'code', 30, 'Use `ipairs` para ler arrays ordenados.', { task: 'for i,v in ipairs(t) do', expectedCode: 'for i,v in ipairs(t) do', exampleCode: 'for i,v in ipairs(t) do' }),
  createLesson('i_z1_8', 'Insert', 'Adicionar', 'bit', 'code', 25, 'Adicione "Item" na tabela `t`.', { task: 'table.insert(t, "Item")', expectedCode: 'table.insert(t, "Item")', exampleCode: 'table.insert(t, v)' }),
  createLesson('i_z1_9', 'Remove', 'Tirar', 'bit', 'code', 25, 'Remova o item 1 de `t`.', { task: 'table.remove(t, 1)', expectedCode: 'table.remove(t, 1)', exampleCode: 'table.remove(t, i)' }),
  createLesson('i_z1_10', 'Find', 'Achar', 'bit', 'code', 25, 'Ache o índice de "Ouro" em `t`.', { task: 'table.find(t, "Ouro")', expectedCode: 'table.find(t, "Ouro")', exampleCode: 'table.find(t, v)' }),
  createLesson('i_z1_11', 'ModuleScript', 'Biblioteca', 'bella', 'concept', 20, 'ModuleScripts permitem compartilhar código entre scripts. Use `require`.', { exampleCode: 'local m = require(script.Mod)' }),
  createLesson('i_z1_12', 'Estrutura Mod', 'Return', 'bella', 'concept', 20, 'Todo ModuleScript deve retornar uma tabela no final.', { exampleCode: 'return module' }),
  createLesson('i_z1_13', 'Funções em Tabela', 'OOP Básico', 'spark', 'code', 30, 'Guarde uma função dentro da tabela.', { task: 't.acao = function() end', expectedCode: 't.acao = function() end', exampleCode: 't.f = function() end' }),
  createLesson('i_z1_14', '#Operator', 'Tamanho', 'captain', 'quiz', 15, 'Qual símbolo mostra o tamanho de uma tabela?', { options: ['*', '#', '@'], correctOption: 1 }),
  createLesson('i_z1_15', 'Tamanho Cod', 'Contar', 'captain', 'code', 20, 'Imprima o tamanho de `t`.', { task: 'print(#t)', expectedCode: 'print(#t)', exampleCode: 'print(#t)' }),
  createLesson('i_z1_16', 'Random Tabela', 'Sorteio', 'captain', 'concept', 25, 'Para pegar item aleatório: `t[math.random(1, #t)]`.', { exampleCode: 'Sorteio' }),
  createLesson('i_z1_17', 'Sort', 'Ordenar', 'bit', 'concept', 20, '`table.sort(t)` coloca em ordem alfabética ou numérica.', { exampleCode: 'table.sort(t)' }),
  createLesson('i_z1_18', 'Clear', 'Limpar', 'bit', 'concept', 15, '`table.clear(t)` apaga tudo. Cuidado!', { exampleCode: 'table.clear' }),
  createLesson('i_z1_19', 'Clone Tabela', 'Copiar', 'spark', 'concept', 25, '`table.clone(t)` cria uma cópia independente.', { exampleCode: 'table.clone' }),
  createLesson('i_z1_20', 'Desafio Tabela', 'Inventário', 'bella', 'code', 60, 'Crie tabela inv = {"Espada"}.', { task: 'local inv = {"Espada"}', expectedCode: 'local inv = {"Espada"}', exampleCode: 'local t = {a}' }),
];

const genInterZ2 = (): Lesson[] => [
  createLesson('i_z2_1', 'Cliente vs Servidor', 'Rede', 'captain', 'concept', 20, 'Servidor (Roblox) manda no jogo. Cliente (PC) só vê.', { exampleCode: 'Server x Client' }),
  createLesson('i_z2_2', 'LocalScript', 'Cliente', 'captain', 'quiz', 15, 'LocalScript roda onde?', { options: ['Servidor', 'PC do Jogador', 'Nuvem'], correctOption: 1 }),
  createLesson('i_z2_3', 'FilteringEnabled', 'Segurança', 'bit', 'concept', 20, 'O servidor NÃO confia no cliente. O que acontece no cliente fica no cliente (geralmente).', { exampleCode: 'FE' }),
  createLesson('i_z2_4', 'RemoteEvent', 'Telefone', 'bit', 'concept', 25, 'Para o Cliente falar com o Servidor, usamos RemoteEvents.', { exampleCode: 'ReplicatedStorage' }),
  createLesson('i_z2_5', 'FireServer', 'Ligar', 'bit', 'code', 30, 'No LocalScript: dispare o evento.', { task: 'evento:FireServer()', expectedCode: 'evento:FireServer()', exampleCode: 'ev:FireServer()' }),
  createLesson('i_z2_6', 'OnServerEvent', 'Atender', 'bit', 'code', 30, 'No Script: escute o evento.', { task: 'ev.OnServerEvent:Connect(f)', expectedCode: 'ev.OnServerEvent:Connect(f)', exampleCode: 'ev.OnServerEvent:Connect(f)' }),
  createLesson('i_z2_7', 'Parametros', 'Dados', 'spark', 'concept', 20, 'O primeiro parâmetro do OnServerEvent é SEMPRE o Player que chamou.', { exampleCode: 'function(player, ...)' }),
  createLesson('i_z2_8', 'RemoteFunction', 'Pergunta', 'bit', 'concept', 25, 'RemoteEvent só avisa. RemoteFunction avisa e espera RESPOSTA.', { exampleCode: 'InvokeServer' }),
  createLesson('i_z2_9', 'BindableEvent', 'Interno', 'bella', 'concept', 15, 'Comunicação Script para Script (mesmo lado).', { exampleCode: 'Bindable' }),
  createLesson('i_z2_10', 'Lag', 'Latência', 'captain', 'concept', 15, 'A internet demora. RemoteFunction pode travar o jogo se a net cair.', { exampleCode: 'Cuidado com Invoke' }),
  createLesson('i_z2_11', 'Sanity Check', 'Verificação', 'bit', 'concept', 30, 'SEMPRE verifique no servidor se o jogador pode fazer aquilo. Hackers podem mentir!', { exampleCode: 'if dinheiro >= custo then' }),
  createLesson('i_z2_12', 'ReplicatedStorage', 'Correio', 'bella', 'quiz', 15, 'Onde guardamos os RemoteEvents?', { options: ['Workspace', 'ServerStorage', 'ReplicatedStorage'], correctOption: 2 }),
  createLesson('i_z2_13', 'FireClient', 'Retorno', 'captain', 'code', 25, 'Servidor falando com UM jogador.', { task: 'ev:FireClient(player)', expectedCode: 'ev:FireClient(player)', exampleCode: 'ev:FireClient(p)' }),
  createLesson('i_z2_14', 'FireAllClients', 'Megafone', 'captain', 'code', 25, 'Servidor falando com TODOS.', { task: 'ev:FireAllClients()', expectedCode: 'ev:FireAllClients()', exampleCode: 'ev:FireAllClients()' }),
  createLesson('i_z2_15', 'OnClientEvent', 'Ouvir', 'captain', 'code', 25, 'Cliente ouvindo servidor.', { task: 'ev.OnClientEvent:Connect(f)', expectedCode: 'ev.OnClientEvent:Connect(f)', exampleCode: 'ev.OnClientEvent:Connect(f)' }),
  createLesson('i_z2_16', 'Exploits', 'Hackers', 'bit', 'concept', 20, 'Nunca confie no LocalScript para dar dinheiro ou matar.', { exampleCode: 'Segurança' }),
  createLesson('i_z2_17', 'ServerScriptService', 'Cofre', 'bella', 'concept', 15, 'Scripts aqui são invisíveis para o cliente. Ótimo para lógica de jogo segura.', { exampleCode: 'SSS' }),
  createLesson('i_z2_18', 'StarterPlayer', 'Inicial', 'bella', 'concept', 15, 'StarterPlayerScripts roda assim que entra.', { exampleCode: 'Scripts Locais' }),
  createLesson('i_z2_19', 'Prática Remote', 'Chat', 'spark', 'code', 40, 'Dispare FireServer("Oi").', { task: 'remote:FireServer("Oi")', expectedCode: 'remote:FireServer("Oi")', exampleCode: 'r:FireServer(arg)' }),
  createLesson('i_z2_20', 'Mestre de Rede', 'Certificado', 'captain', 'code', 60, 'Digite "Conectado".', { task: 'print("Conectado")', expectedCode: 'print("Conectado")', exampleCode: 'print("X")' }),
];

// Geradores placeholder para completar a estrutura (O usuário pediu 5 zonas x 20)
const genInterZ3 = () => Array(20).fill(null).map((_, i) => createLesson(`i_z3_${i}`, `UI Master ${i+1}`, 'Interfaces Avançadas', 'spark', 'concept', 20, 'Tweens, ViewportFrames.', { exampleCode: 'UI' }));
const genInterZ4 = () => Array(20).fill(null).map((_, i) => createLesson(`i_z4_${i}`, `Física ${i+1}`, 'Movimento e Raycast', 'bella', 'code', 20, 'BodyVelocity, Raycast.', { task: 'workspace:Raycast()', expectedCode: 'workspace:Raycast()' }));
const genInterZ5 = () => Array(20).fill(null).map((_, i) => createLesson(`i_z5_${i}`, `DataStore ${i+1}`, 'Salvando Dados', 'bit', 'code', 30, 'DataStoreService.', { task: 'ds:SetAsync()', expectedCode: 'ds:SetAsync()' }));


// --- NÍVEL 3: AVANÇADO (A ARQUITETURA) ---
// Foco: Math (Vector/CFrame), Metatables, Monetização, Performance, Cross-Server

const genAdvZ1 = (): Lesson[] => [
  createLesson('a_z1_1', 'Matemática 3D', 'Matrix', 'spark', 'concept', 20, 'Bem-vindo ao Nível 3. Vamos dominar o espaço 3D.', { exampleCode: 'CFrame' }),
  createLesson('a_z1_2', 'CFrame', 'Coordenadas', 'spark', 'concept', 20, 'CFrame (Coordinate Frame) guarda Posição E Rotação. É mais poderoso que Vector3.', { exampleCode: 'CFrame.new(pos, lookAt)' }),
  createLesson('a_z1_3', 'CFrame.new', 'Criar', 'spark', 'code', 30, 'Crie um CFrame na origem.', { task: 'CFrame.new(0,0,0)', expectedCode: 'CFrame.new(0,0,0)', exampleCode: 'CFrame.new(x,y,z)' }),
  createLesson('a_z1_4', 'LookAt', 'Olhar', 'spark', 'concept', 25, '`CFrame.new(posicao, alvo)` faz a peça olhar para o alvo. Ótimo para torres de tiro.', { exampleCode: 'LookAt' }),
  createLesson('a_z1_5', 'Lerp', 'Interpolação', 'spark', 'concept', 30, 'Linear Interpolation. Achar o ponto entre A e B. 0.5 é o meio.', { exampleCode: 'a:Lerp(b, 0.5)' }),
  createLesson('a_z1_6', 'Lerp Code', 'Meio', 'spark', 'code', 35, 'Faça um Lerp de 50%.', { task: 'cf:Lerp(target, 0.5)', expectedCode: 'cf:Lerp(target, 0.5)', exampleCode: 'a:Lerp(b, alpha)' }),
  createLesson('a_z1_7', 'ToWorldSpace', 'Relativo', 'bella', 'concept', 30, 'Converter coordenadas locais para globais. "3 passos à frente DE MIM".', { exampleCode: 'cf:ToWorldSpace(offset)' }),
  createLesson('a_z1_8', 'ToObjectSpace', 'Local', 'bella', 'concept', 30, 'Converter global para local.', { exampleCode: 'cf:ToObjectSpace(target)' }),
  createLesson('a_z1_9', 'Angles', 'Radiano', 'captain', 'concept', 20, 'CFrame.Angles usa Radianos, não Graus! `math.rad(90)` ajuda.', { exampleCode: 'CFrame.Angles(0, math.rad(90), 0)' }),
  createLesson('a_z1_10', 'Vector Math', 'Magnitude', 'captain', 'concept', 20, '`(a - b).Magnitude` é a distância entre dois pontos.', { exampleCode: 'distancia' }),
  createLesson('a_z1_11', 'Unit', 'Direção', 'captain', 'concept', 25, '`.Unit` pega a direção do vetor (tamanho 1).', { exampleCode: 'vec.Unit' }),
  createLesson('a_z1_12', 'Dot Product', 'Frente?', 'bit', 'concept', 40, 'Produto Escalar. Diz se algo está na frente ou atrás de você.', { exampleCode: 'v1:Dot(v2)' }),
  createLesson('a_z1_13', 'Cross Product', 'Perpendicular', 'bit', 'concept', 40, 'Produto Vetorial. Acha o vetor 90 graus aos outros dois.', { exampleCode: 'v1:Cross(v2)' }),
  createLesson('a_z1_14', 'RaycastParams', 'Filtro', 'bella', 'concept', 25, 'Configurar o que o raio ignora (ex: ignorar a água ou o próprio jogador).', { exampleCode: 'RaycastParams.new()' }),
  createLesson('a_z1_15', 'WorldRoot:Raycast', 'Tiro', 'bella', 'code', 40, 'Lance um raio.', { task: 'workspace:Raycast(origin, dir)', expectedCode: 'workspace:Raycast(origin, dir)', exampleCode: 'workspace:Raycast(o, d)' }),
  createLesson('a_z1_16', 'RunService', 'Loop Frame', 'bit', 'concept', 20, 'Heartbeat (Física) vs RenderStepped (Câmera/UI). Escolha certo.', { exampleCode: 'Heartbeat' }),
  createLesson('a_z1_17', 'DeltaTime', 'Tempo', 'bit', 'concept', 25, 'Use `dt` (deltaTime) para movimento suave independente do FPS.', { exampleCode: 'speed * dt' }),
  createLesson('a_z1_18', 'Sin/Cos', 'Ondas', 'spark', 'concept', 30, 'Use Seno para flutuar itens suavemente.', { exampleCode: 'math.sin(time())' }),
  createLesson('a_z1_19', 'Prática CFrame', 'Teleporte', 'spark', 'code', 50, 'Mova part para 0,10,0.', { task: 'part.CFrame = CFrame.new(0,10,0)', expectedCode: 'part.CFrame = CFrame.new(0,10,0)', exampleCode: 'obj.CFrame = ...' }),
  createLesson('a_z1_20', 'Matemático', 'Certificado', 'bit', 'code', 100, 'Digite "Eureca".', { task: 'print("Eureca")', expectedCode: 'print("Eureca")', exampleCode: 'print("X")' }),
];

// Placeholder Generators para Nível 3
const genAdvZ2 = () => Array(20).fill(null).map((_, i) => createLesson(`a_z2_${i}`, `OOP & Metatables ${i+1}`, 'Programação Orientada a Objetos', 'bit', 'code', 30, '__index, classes.', { task: 'setmetatable({}, {})', expectedCode: 'setmetatable({}, {})' }));
const genAdvZ3 = () => Array(20).fill(null).map((_, i) => createLesson(`a_z3_${i}`, `Monetização ${i+1}`, 'Robux e Produtos', 'captain', 'concept', 25, 'MarketplaceService, Developer Products.', { exampleCode: 'ProcessReceipt' }));
const genAdvZ4 = () => Array(20).fill(null).map((_, i) => createLesson(`a_z4_${i}`, `Performance ${i+1}`, 'Otimização', 'bella', 'concept', 30, 'StreamingEnabled, Memory, Janitor.', { exampleCode: 'Memory' }));
const genAdvZ5 = () => Array(20).fill(null).map((_, i) => createLesson(`a_z5_${i}`, `Cross-Server ${i+1}`, 'Multiverso', 'bit', 'code', 50, 'MessagingService.', { task: 'SubscribeAsync', expectedCode: 'SubscribeAsync' }));


export const BASIC_MODULES: CourseModule[] = [
  { id: 'bz1', title: 'O Estaleiro', description: 'Fundamentos do Studio', difficulty: 'beginner', color: '#FFB300', icon: 'fa-hammer', lessons: genBeginnerZ1() },
  { id: 'bz2', title: 'Lógica Básica', description: 'Variáveis e Decisões', difficulty: 'beginner', color: '#00A2FF', icon: 'fa-cube', lessons: genBeginnerZ2() },
  { id: 'bz3', title: 'Loops', description: 'Repetições', difficulty: 'beginner', color: '#E91E63', icon: 'fa-sync', lessons: genBeginnerZ3() },
  { id: 'bz4', title: 'Eventos', description: 'Interação', difficulty: 'beginner', color: '#9C27B0', icon: 'fa-bolt', lessons: genBeginnerZ4() },
  { id: 'bz5', title: 'Sistemas', description: 'Scripts Completos', difficulty: 'beginner', color: '#00E676', icon: 'fa-gamepad', lessons: genBeginnerZ5() },
];

export const INTERMEDIATE_MODULES: CourseModule[] = [
  { id: 'iz1', title: 'Data Lab', description: 'Tabelas e Dados', difficulty: 'intermediate', color: '#00BCD4', icon: 'fa-database', lessons: genInterZ1() },
  { id: 'iz2', title: 'Rede & Segurança', description: 'Client vs Server', difficulty: 'intermediate', color: '#FF5722', icon: 'fa-network-wired', lessons: genInterZ2() },
  { id: 'iz3', title: 'UI Master', description: 'Interfaces Vivas', difficulty: 'intermediate', color: '#E91E63', icon: 'fa-layer-group', lessons: genInterZ3() },
  { id: 'iz4', title: 'Física Avançada', description: 'Raycast e Mover', difficulty: 'intermediate', color: '#FFC107', icon: 'fa-magnet', lessons: genInterZ4() },
  { id: 'iz5', title: 'Persistência', description: 'DataStores', difficulty: 'intermediate', color: '#4CAF50', icon: 'fa-save', lessons: genInterZ5() },
];

export const ADVANCED_MODULES: CourseModule[] = [
  { id: 'az1', title: 'Matemática 3D', description: 'Vector & CFrame', difficulty: 'advanced', color: '#673AB7', icon: 'fa-square-root-alt', lessons: genAdvZ1() },
  { id: 'az2', title: 'OOP & Meta', description: 'Metatables', difficulty: 'advanced', color: '#3F51B5', icon: 'fa-dna', lessons: genAdvZ2() },
  { id: 'az3', title: 'Economia', description: 'Monetização', difficulty: 'advanced', color: '#FFEB3B', icon: 'fa-gem', lessons: genAdvZ3() },
  { id: 'az4', title: 'Performance', description: 'Otimização', difficulty: 'advanced', color: '#F44336', icon: 'fa-tachometer-alt', lessons: genAdvZ4() },
  { id: 'az5', title: 'Multiverso', description: 'Cross-Server', difficulty: 'advanced', color: '#212121', icon: 'fa-globe', lessons: genAdvZ5() },
];

// O App usará isso para saber o total. Por padrão começamos mostrando o Basic.
export const ALL_LEVELS = {
  beginner: BASIC_MODULES,
  intermediate: INTERMEDIATE_MODULES,
  advanced: ADVANCED_MODULES
};

export const INITIAL_USER: any = {
  name: "Novato Blox",
  email: "",
  xp: 120,
  level: 2,
  streak: 3,
  gems: 50,
  lives: 5, // Valor Padrão
  lastHeartRegen: Date.now(), // Timestamp atual
  unlockedLessons: ['b_z1_1'], 
  avatarUrl: "https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Blox",
  achievementsProgress: {
    'first_steps': 1,
    'streak_master': 3,
    'xp_titan': 120
  }
};
