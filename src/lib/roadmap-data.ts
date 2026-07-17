// AI Software Engineering Roadmap — dominios, temas, prerequisitos.
// Todo el contenido es estático y en español.

export type DomainId =
  | "foundations"
  | "cs"
  | "math"
  | "languages"
  | "backend"
  | "frontend"
  | "databases"
  | "distributed"
  | "cloud-devops"
  | "architecture"
  | "ml"
  | "deep-learning"
  | "llm-eng"
  | "ai-systems"
  | "mlops"
  | "projects"
  | "interview"
  | "career";

export type Level = "Fundamentals" | "Intermediate" | "Advanced" | "Expert";

export type CareerPath =
  | "backend"
  | "fullstack"
  | "ai-engineer"
  | "ml-engineer"
  | "research"
  | "founding";

export type ResourceKind = "book" | "course" | "docs" | "video" | "article" | "repo";

export interface Resource {
  label: string;
  url: string;
  kind: ResourceKind;
}
export interface Paper {
  title: string;
  url: string;
  year: number;
}
export interface ProjectRef {
  title: string;
  brief: string;
}

export interface Topic {
  id: string;
  title: string;
  domain: DomainId;
  level: Level;
  summary: string;
  description: string;
  prerequisites: string[];
  relatedTo?: string[];
  implementation?: string;
  project?: ProjectRef;
  interviewQuestions?: string[];
  resources?: Resource[];
  papers?: Paper[];
  realWorldUse?: string;
  careerPaths: CareerPath[];
  wizybotMapping?: string;
}

export interface Domain {
  id: DomainId;
  title: string;
  short: string;
  tagline: string;
  color: string; // hex
  order: number;
}

export const CAREER_PATHS: { id: CareerPath; label: string; tagline: string }[] = [
  { id: "backend", label: "Backend Engineer", tagline: "Servicios, datos, escala" },
  { id: "fullstack", label: "Full Stack", tagline: "Producto de punta a punta" },
  { id: "ai-engineer", label: "AI Engineer", tagline: "LLMs en producción" },
  { id: "ml-engineer", label: "ML Engineer", tagline: "Modelos y pipelines" },
  { id: "research", label: "Research Engineer", tagline: "Papers → prototipos" },
  { id: "founding", label: "Founding Engineer", tagline: "0 → 1 de producto" },
];

export const DOMAINS: Domain[] = [
  { id: "foundations", title: "Engineering Foundations", short: "Foundations", tagline: "Cómo se construye software profesional", color: "#8b7355", order: 1 },
  { id: "cs", title: "Computer Science", short: "CS", tagline: "Algoritmos, estructuras, sistemas", color: "#4a6741", order: 2 },
  { id: "math", title: "Mathematics for AI", short: "Math", tagline: "Álgebra, cálculo, probabilidad", color: "#5c2018", order: 3 },
  { id: "languages", title: "Programming Languages", short: "Lang", tagline: "TypeScript y Python en profundidad", color: "#2d5a3d", order: 4 },
  { id: "backend", title: "Backend Engineering", short: "Backend", tagline: "APIs, auth, colas, patrones", color: "#0c2340", order: 5 },
  { id: "frontend", title: "Frontend Engineering", short: "Frontend", tagline: "React moderno y performance web", color: "#c17c74", order: 6 },
  { id: "databases", title: "Databases", short: "DB", tagline: "SQL, NoSQL, vector, modelado", color: "#6b3a2a", order: 7 },
  { id: "distributed", title: "Distributed Systems", short: "Dist", tagline: "Consenso, replicación, streaming", color: "#1e1e5a", order: 8 },
  { id: "cloud-devops", title: "Cloud & DevOps", short: "Cloud", tagline: "Contenedores, CI/CD, observabilidad", color: "#2d8a9e", order: 9 },
  { id: "architecture", title: "Software Architecture & System Design", short: "Arch", tagline: "DDD, hexagonal, system design", color: "#4a5568", order: 10 },
  { id: "ml", title: "Machine Learning", short: "ML", tagline: "Modelos clásicos y evaluación", color: "#9b4423", order: 11 },
  { id: "deep-learning", title: "Deep Learning", short: "DL", tagline: "MLP, CNN, RNN, Transformers", color: "#c44569", order: 12 },
  { id: "llm-eng", title: "LLM Engineering", short: "LLMs", tagline: "Fine-tuning, quantization, serving", color: "#c9a84c", order: 13 },
  { id: "ai-systems", title: "AI Systems", short: "AI Sys", tagline: "RAG, agents, MCP, evals", color: "#e85d3a", order: 14 },
  { id: "mlops", title: "MLOps", short: "MLOps", tagline: "Serving, monitoring, drift", color: "#4f46e5", order: 15 },
  { id: "projects", title: "Portfolio Projects", short: "Projects", tagline: "Proyectos que demuestran nivel", color: "#0d7a5f", order: 16 },
  { id: "interview", title: "Interview Preparation", short: "Interview", tagline: "Coding, system design, ML design", color: "#574b90", order: 17 },
  { id: "career", title: "Career & Job Search", short: "Career", tagline: "Portfolio, aplicaciones, negociación", color: "#87a878", order: 18 },
];

const ALL: CareerPath[] = ["backend", "fullstack", "ai-engineer", "ml-engineer", "research", "founding"];

// Helper para reducir boilerplate
const t = (topic: Topic): Topic => topic;

export const TOPICS: Topic[] = [
  // ─────────── ENGINEERING FOUNDATIONS ───────────
  t({
    id: "found-sdlc",
    title: "Ciclo de vida del software (SDLC)",
    domain: "foundations",
    level: "Fundamentals",
    summary: "Cómo se planifica, construye, entrega y mantiene software.",
    description:
      "Comprende las fases del ciclo de vida —requisitos, diseño, implementación, verificación, despliegue y mantenimiento— y cómo Agile/Scrum/Kanban las orquestan iterativamente. Aprende a identificar dónde se pierden proyectos: requisitos difusos, feedback tardío, deuda técnica sin control.",
    prerequisites: [],
    realWorldUse: "Toda empresa opera en algún flujo SDLC. Entenderlo te permite proponer mejoras en lugar de sufrir el proceso.",
    interviewQuestions: ["¿Diferencia entre Agile y Waterfall?", "¿Qué es la definición de done?"],
    resources: [{ label: "Atlassian Agile Coach", url: "https://www.atlassian.com/agile", kind: "docs" }],
    careerPaths: ALL,
  }),
  t({
    id: "found-git",
    title: "Git y control de versiones",
    domain: "foundations",
    level: "Fundamentals",
    summary: "Ramas, merges, rebase, resolución de conflictos, flujo colaborativo.",
    description:
      "Domina git más allá de add/commit/push: rebase interactivo, cherry-pick, bisect para encontrar regresiones, reflog para recuperar trabajo perdido, y flujos como trunk-based development o GitFlow. Un ingeniero sin git sólido genera fricción constante en su equipo.",
    prerequisites: [],
    implementation: "Practica en un repo real: crea ramas de feature, hazte rebase antes de mergear, usa git bisect para encontrar el commit que rompió una prueba.",
    interviewQuestions: ["¿Diferencia entre merge y rebase?", "¿Cuándo usarías cherry-pick?", "Explica git reset --soft/mixed/hard."],
    resources: [
      { label: "Pro Git (libro gratis)", url: "https://git-scm.com/book/en/v2", kind: "book" },
      { label: "Learn Git Branching", url: "https://learngitbranching.js.org/", kind: "course" },
    ],
    realWorldUse: "Todo equipo usa git. Los flujos avanzados (trunk-based + feature flags) permiten deploys continuos sin ramas de release.",
    careerPaths: ALL,
  }),
  t({
    id: "found-testing",
    title: "Testing: unit, integration, e2e",
    domain: "foundations",
    level: "Fundamentals",
    summary: "Pirámide de testing, TDD, mocks, cobertura útil.",
    description:
      "Aprende cuándo escribir unit tests (lógica pura, rápidos, muchos), integration tests (contratos entre módulos) y e2e (flujos críticos, pocos y lentos). Entiende el trade-off entre cobertura y velocidad, y por qué 100% de cobertura sin buenas aserciones es engañoso.",
    prerequisites: ["found-git"],
    implementation: "En un proyecto TS: Vitest para unit, Playwright para e2e, snapshot testing con moderación. En Python: pytest + fixtures.",
    interviewQuestions: ["¿Qué es TDD y cuándo no aplicarlo?", "¿Cómo testeas código con dependencias externas?"],
    resources: [{ label: "Testing Trophy (Kent C. Dodds)", url: "https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications", kind: "article" }],
    careerPaths: ALL,
  }),
  t({
    id: "found-clean-code",
    title: "Clean Code y refactoring",
    domain: "foundations",
    level: "Intermediate",
    summary: "Nombres, funciones pequeñas, SOLID aplicado con criterio.",
    description:
      "Escribe código que otros pueden leer en 6 meses. Aprende principios (SOLID, DRY, YAGNI, KISS) pero también cuándo violarlos. Refactoriza en pequeños pasos con tests que respalden cada cambio.",
    prerequisites: ["found-testing"],
    resources: [
      { label: "Refactoring (Fowler)", url: "https://martinfowler.com/books/refactoring.html", kind: "book" },
      { label: "A Philosophy of Software Design (Ousterhout)", url: "https://web.stanford.edu/~ouster/cgi-bin/book.php", kind: "book" },
    ],
    interviewQuestions: ["¿Qué olores de código conoces?", "¿Cómo refactorizarías una función de 200 líneas?"],
    careerPaths: ALL,
  }),
  t({
    id: "found-code-review",
    title: "Code review efectivo",
    domain: "foundations",
    level: "Intermediate",
    summary: "Cómo dar y recibir feedback técnico sin fricción.",
    description:
      "Un buen review distingue estilo (automatizable con linters) de sustancia (arquitectura, correctness, seguridad). Aprende a proponer alternativas en lugar de imponer, y a aceptar críticas sin ego.",
    prerequisites: ["found-clean-code"],
    resources: [{ label: "Google Engineering Practices", url: "https://google.github.io/eng-practices/review/", kind: "docs" }],
    careerPaths: ALL,
  }),
  t({
    id: "found-linux-cli",
    title: "Linux y línea de comandos",
    domain: "foundations",
    level: "Fundamentals",
    summary: "Shell, procesos, permisos, pipes, herramientas de texto.",
    description:
      "grep, sed, awk, find, xargs, jq. Composición con pipes. Procesos, señales, /proc. Sin fluidez en CLI pierdes horas cada semana.",
    prerequisites: [],
    resources: [{ label: "The Missing Semester (MIT)", url: "https://missing.csail.mit.edu/", kind: "course" }],
    careerPaths: ALL,
  }),

  // ─────────── COMPUTER SCIENCE ───────────
  t({
    id: "cs-complexity",
    title: "Complejidad algorítmica (Big-O)",
    domain: "cs",
    level: "Fundamentals",
    summary: "Notación asintótica, tiempo, espacio, análisis amortizado.",
    description:
      "Aprende a razonar sobre cómo escalan tus algoritmos. Diferencia entre peor caso, caso promedio y amortizado. Reconoce cuándo O(n log n) es aceptable y cuándo necesitas O(n) o mejor.",
    prerequisites: [],
    interviewQuestions: ["¿Cuál es la complejidad de acceso en hash map?", "¿Qué es análisis amortizado? Ejemplo con dynamic array."],
    resources: [{ label: "CLRS (Introduction to Algorithms)", url: "https://mitpress.mit.edu/9780262046305/introduction-to-algorithms/", kind: "book" }],
    careerPaths: ALL,
  }),
  t({
    id: "cs-data-structures",
    title: "Estructuras de datos esenciales",
    domain: "cs",
    level: "Fundamentals",
    summary: "Arrays, listas, hash maps, árboles, heaps, tries, grafos.",
    description:
      "No memorices: entiende qué operaciones optimiza cada estructura y qué paga a cambio. Sabe cuándo un heap gana a un sorted array, cuándo un trie gana a un hash map.",
    prerequisites: ["cs-complexity"],
    project: { title: "LRU Cache", brief: "Implementa desde cero usando hash map + doubly linked list. O(1) get/put." },
    interviewQuestions: ["Implementa LRU cache.", "¿Cuándo usarías un heap vs BST?"],
    careerPaths: ALL,
  }),
  t({
    id: "cs-algorithms",
    title: "Algoritmos clásicos",
    domain: "cs",
    level: "Intermediate",
    summary: "Sorting, búsqueda, divide & conquer, greedy, DP, backtracking.",
    description:
      "Domina merge/quick sort, binary search con sus variantes, DP top-down y bottom-up, greedy con prueba de correctness, backtracking con poda. No es para el interview: es el vocabulario con el que se piensan problemas.",
    prerequisites: ["cs-data-structures"],
    interviewQuestions: ["Longest increasing subsequence (DP).", "Word break.", "Explica DP con memoización vs tabulación."],
    resources: [{ label: "NeetCode Roadmap", url: "https://neetcode.io/roadmap", kind: "course" }],
    careerPaths: ALL,
  }),
  t({
    id: "cs-graphs",
    title: "Grafos y algoritmos sobre grafos",
    domain: "cs",
    level: "Intermediate",
    summary: "BFS, DFS, Dijkstra, topological sort, MST, union-find.",
    description:
      "Los grafos modelan casi todo: dependencias, redes sociales, rutas, embeddings. Domina las representaciones (adjacency list vs matrix) y los algoritmos base para razonar sobre conectividad, caminos mínimos y ciclos.",
    prerequisites: ["cs-algorithms"],
    realWorldUse: "Los sistemas de recomendación, planners de agentes IA y knowledge graphs se apoyan en algoritmos de grafos.",
    interviewQuestions: ["Detecta ciclo en un grafo dirigido.", "Course schedule (topological sort).", "Dijkstra vs Bellman-Ford."],
    careerPaths: ALL,
  }),
  t({
    id: "cs-os",
    title: "Sistemas operativos",
    domain: "cs",
    level: "Intermediate",
    summary: "Procesos, hilos, memoria virtual, scheduling, syscalls.",
    description:
      "Entiende qué hace el kernel cuando tu proceso pide memoria, abre un socket o hace un fork. Sin esto, no puedes debuggear leaks, contención de CPU o problemas de latencia de I/O.",
    prerequisites: ["found-linux-cli"],
    resources: [{ label: "OSTEP (gratis)", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", kind: "book" }],
    interviewQuestions: ["Proceso vs hilo.", "¿Qué hace fork()?", "Deadlock: condiciones y prevención."],
    careerPaths: ["backend", "ml-engineer", "founding", "research"],
  }),
  t({
    id: "cs-networking",
    title: "Redes de computadoras",
    domain: "cs",
    level: "Intermediate",
    summary: "TCP/IP, DNS, HTTP/1.1/2/3, TLS, WebSockets.",
    description:
      "Modelo OSI/TCP. Handshake TCP, control de congestión. Cómo HTTP/2 multiplexa, cómo HTTP/3 usa QUIC/UDP. TLS 1.3 y por qué las conexiones son más rápidas hoy.",
    prerequisites: ["cs-os"],
    interviewQuestions: ["Diferencia HTTP/1.1 vs HTTP/2.", "¿Qué pasa cuando escribo una URL en el navegador?", "¿Cómo funciona TLS?"],
    resources: [{ label: "High Performance Browser Networking", url: "https://hpbn.co/", kind: "book" }],
    careerPaths: ALL,
  }),
  t({
    id: "cs-concurrency",
    title: "Concurrencia y paralelismo",
    domain: "cs",
    level: "Advanced",
    summary: "Threads, locks, async, actor model, race conditions.",
    description:
      "Diferencia concurrencia (estructura) de paralelismo (ejecución). Aprende cuándo un mutex es correcto pero lento, cuándo async I/O gana, y por qué el modelo de actores (Erlang, Akka) simplifica sistemas concurrentes.",
    prerequisites: ["cs-os"],
    interviewQuestions: ["Race condition vs deadlock.", "GIL en Python: qué implica.", "Async vs threads: cuándo cada uno."],
    careerPaths: ["backend", "ml-engineer", "research", "founding"],
  }),

  // ─────────── MATHEMATICS FOR AI ───────────
  t({
    id: "math-linalg",
    title: "Álgebra lineal",
    domain: "math",
    level: "Fundamentals",
    summary: "Vectores, matrices, productos, eigenvalues, SVD.",
    description:
      "La base de todo ML moderno. Entiende vectores como puntos y direcciones, matrices como transformaciones lineales, productos punto como similitud, SVD como descomposición fundamental. Sin esto, transformers son magia.",
    prerequisites: [],
    resources: [
      { label: "3Blue1Brown — Essence of Linear Algebra", url: "https://www.3blue1brown.com/topics/linear-algebra", kind: "video" },
      { label: "Mathematics for Machine Learning (libro)", url: "https://mml-book.github.io/", kind: "book" },
    ],
    interviewQuestions: ["¿Qué representa un eigenvector?", "¿Para qué sirve SVD en ML?"],
    realWorldUse: "Embeddings son vectores. Attention es multiplicación de matrices. PCA es SVD.",
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "math-calculus",
    title: "Cálculo multivariable",
    domain: "math",
    level: "Fundamentals",
    summary: "Derivadas, gradientes, regla de la cadena, jacobianos.",
    description:
      "Backpropagation es la regla de la cadena aplicada a millones de parámetros. Entiende el gradiente como dirección de máxima subida y por qué SGD es su reverso.",
    prerequisites: [],
    resources: [{ label: "3Blue1Brown — Calculus", url: "https://www.3blue1brown.com/topics/calculus", kind: "video" }],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "math-probability",
    title: "Probabilidad y estadística",
    domain: "math",
    level: "Fundamentals",
    summary: "Distribuciones, Bayes, esperanza, varianza, MLE.",
    description:
      "Todo modelo ML es probabilístico bajo el capó. Domina distribuciones (normal, Bernoulli, categorical), teorema de Bayes, maximum likelihood, y por qué cross-entropy es negative log-likelihood.",
    prerequisites: [],
    interviewQuestions: ["Explica Bayes con ejemplo.", "¿Por qué cross-entropy y no MSE en clasificación?"],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "math-optimization",
    title: "Optimización",
    domain: "math",
    level: "Intermediate",
    summary: "Convexidad, SGD, momentum, Adam, regularización.",
    description:
      "Entrenar una red es minimizar una loss no convexa en un espacio de millones de dimensiones. Entiende por qué SGD funciona pese al ruido, qué añade momentum, y por qué Adam es el default pero no siempre el mejor.",
    prerequisites: ["math-calculus", "math-linalg"],
    papers: [{ title: "Adam: A Method for Stochastic Optimization", url: "https://arxiv.org/abs/1412.6980", year: 2014 }],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "math-info-theory",
    title: "Teoría de la información",
    domain: "math",
    level: "Advanced",
    summary: "Entropía, KL divergence, mutual information.",
    description:
      "Entropía mide sorpresa. KL mide qué tan distinta es una distribución de otra. Mutual information mide dependencia. Aparecen en losses, en evaluación de LLMs, en compresión, en RL.",
    prerequisites: ["math-probability"],
    careerPaths: ["ml-engineer", "research", "ai-engineer"],
  }),

  // ─────────── PROGRAMMING LANGUAGES ───────────
  t({
    id: "lang-ts",
    title: "TypeScript en profundidad",
    domain: "languages",
    level: "Intermediate",
    summary: "Types avanzados, generics, inferencia, narrowing.",
    description:
      "Más allá de `any`: generics con constraints, mapped/conditional types, template literal types, type predicates. Un sistema de tipos bien usado captura bugs antes de runtime y documenta APIs.",
    prerequisites: [],
    resources: [
      { label: "Total TypeScript", url: "https://www.totaltypescript.com/", kind: "course" },
      { label: "Type Challenges", url: "https://github.com/type-challenges/type-challenges", kind: "repo" },
    ],
    interviewQuestions: ["Diferencia interface vs type.", "¿Qué es un discriminated union?", "Implementa Pick<T,K>."],
    careerPaths: ["backend", "fullstack", "ai-engineer", "founding"],
  }),
  t({
    id: "lang-python",
    title: "Python en profundidad",
    domain: "languages",
    level: "Intermediate",
    summary: "typing, async, dataclasses, decoradores, performance.",
    description:
      "Python moderno con type hints estrictos (mypy/pyright), asyncio para I/O concurrente, dataclasses/Pydantic para validación, decoradores y context managers. Conoce el GIL y cuándo usar multiprocessing o C extensions.",
    prerequisites: [],
    resources: [{ label: "Fluent Python (Ramalho)", url: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/", kind: "book" }],
    interviewQuestions: ["GIL: qué es y cuándo importa.", "generator vs iterator.", "asyncio vs threading."],
    careerPaths: ["ai-engineer", "ml-engineer", "research", "backend"],
  }),
  t({
    id: "lang-python-perf",
    title: "Python performance y C-extensions",
    domain: "languages",
    level: "Advanced",
    summary: "NumPy vectorizado, numba, Cython, profiling.",
    description:
      "Cuándo escribir loops en Python cuesta 1000×. Vectorización con NumPy, JIT con numba, o bajar a C con Cython/PyO3. Perfila con cProfile y py-spy antes de optimizar.",
    prerequisites: ["lang-python"],
    careerPaths: ["ml-engineer", "research"],
  }),

  // ─────────── BACKEND ENGINEERING ───────────
  t({
    id: "backend-http-api",
    title: "APIs HTTP: REST y sus alternativas",
    domain: "backend",
    level: "Fundamentals",
    summary: "Verbos, códigos, idempotencia, versionado, HATEOAS.",
    description:
      "REST bien hecho: recursos, verbos correctos, códigos HTTP con significado, idempotencia en PUT/DELETE, paginación cursor-based, versionado. Sabe cuándo REST no es la respuesta y usar GraphQL o gRPC.",
    prerequisites: ["cs-networking"],
    interviewQuestions: ["Idempotencia: definición y qué verbos son idempotentes.", "REST vs GraphQL vs gRPC.", "¿Cómo paginarías 10M de rows?"],
    careerPaths: ["backend", "fullstack", "ai-engineer", "founding"],
  }),
  t({
    id: "backend-auth",
    title: "Autenticación y autorización",
    domain: "backend",
    level: "Intermediate",
    summary: "Sessions, JWT, OAuth 2.1, OIDC, RBAC, ABAC.",
    description:
      "Diferencia authn (quién eres) de authz (qué puedes). JWT bien usado (corto, con refresh), sessions con cookies httpOnly, OAuth como delegación. RBAC para roles simples, ABAC para políticas complejas.",
    prerequisites: ["backend-http-api"],
    interviewQuestions: ["¿JWT o sessions? Trade-offs.", "¿Cómo revocas un JWT?", "OAuth flow authorization code + PKCE."],
    careerPaths: ["backend", "fullstack", "ai-engineer", "founding"],
  }),
  t({
    id: "backend-caching",
    title: "Caching",
    domain: "backend",
    level: "Intermediate",
    summary: "In-memory, Redis, CDN, invalidación, cache stampede.",
    description:
      "Caché mal invalidada es peor que no cachear. Aprende TTLs, cache-aside vs write-through, invalidación por eventos, single-flight/dogpile prevention. La cita clásica: 'hay dos problemas difíciles en CS: naming, cache invalidation, y off-by-one'.",
    prerequisites: ["backend-http-api"],
    interviewQuestions: ["Cache-aside vs write-through.", "¿Cómo previenes cache stampede?", "TTL y jitter."],
    careerPaths: ["backend", "ai-engineer", "founding"],
  }),
  t({
    id: "backend-queues",
    title: "Colas y procesamiento asíncrono",
    domain: "backend",
    level: "Intermediate",
    summary: "Redis/BullMQ, RabbitMQ, SQS, retries, dead-letter.",
    description:
      "Cuando una request requiere trabajo pesado, encolar. Aprende at-least-once vs exactly-once, idempotencia de workers, backoff exponencial con jitter, dead-letter queues y visibility timeouts.",
    prerequisites: ["backend-http-api", "cs-concurrency"],
    realWorldUse: "Envío de emails, generación de embeddings, procesamiento de webhooks — todo va por cola en producción.",
    careerPaths: ["backend", "ai-engineer", "founding"],
    wizybotMapping: "WizyBot encola generación de respuestas y sincronización de conocimiento por cola.",
  }),
  t({
    id: "backend-webhooks",
    title: "Webhooks: recepción y emisión",
    domain: "backend",
    level: "Intermediate",
    summary: "Firmas HMAC, retries, orden, replay attacks.",
    description:
      "Recibir webhooks robustamente: verificar firma, idempotencia por event_id, responder 2xx rápido y procesar async. Emitir webhooks: retries con backoff, dead-letter, herramienta de replay.",
    prerequisites: ["backend-queues", "backend-auth"],
    interviewQuestions: ["¿Cómo verificas un webhook de Stripe?", "¿Qué hacer si el destino tarda 30s?"],
    careerPaths: ["backend", "ai-engineer", "founding"],
  }),
  t({
    id: "backend-rate-limiting",
    title: "Rate limiting y quotas",
    domain: "backend",
    level: "Intermediate",
    summary: "Token bucket, sliding window, per-tenant limits.",
    description:
      "Sin rate limiting, un bug en un cliente puede tumbar tu API. Aprende algoritmos (token bucket, leaky bucket, sliding window), dónde aplicarlos (edge, gateway, servicio) y cómo comunicar límites (headers 429, Retry-After).",
    prerequisites: ["backend-caching"],
    careerPaths: ["backend", "ai-engineer", "founding"],
  }),

  // ─────────── FRONTEND ───────────
  t({
    id: "front-react",
    title: "React moderno",
    domain: "frontend",
    level: "Intermediate",
    summary: "Hooks, Suspense, Server Components, patrones.",
    description:
      "Componentes funcionales, reglas de hooks, useEffect bien usado (raramente). Server Components para reducir JS. Patrones: compound components, render props (aún útil), controlled vs uncontrolled.",
    prerequisites: ["lang-ts"],
    interviewQuestions: ["¿Cuándo useMemo vale la pena?", "Reglas de hooks.", "Server Components vs SSR clásico."],
    careerPaths: ["fullstack", "founding", "ai-engineer"],
  }),
  t({
    id: "front-state",
    title: "State management",
    domain: "frontend",
    level: "Intermediate",
    summary: "Local, URL, server state, Zustand/Jotai, TanStack Query.",
    description:
      "No todo es Redux. Distingue estado de UI (local/Zustand) de estado de servidor (TanStack Query). La URL es también estado — úsala para lo que sobrevive a un refresh.",
    prerequisites: ["front-react"],
    careerPaths: ["fullstack", "founding"],
  }),
  t({
    id: "front-perf",
    title: "Performance web",
    domain: "frontend",
    level: "Advanced",
    summary: "Core Web Vitals, code splitting, imágenes, RUM.",
    description:
      "LCP, INP, CLS y por qué importan. Code splitting por ruta, prefetch inteligente, imágenes responsive con formatos modernos. Mide con RUM real, no solo Lighthouse.",
    prerequisites: ["front-react"],
    resources: [{ label: "web.dev — Vitals", url: "https://web.dev/vitals/", kind: "docs" }],
    careerPaths: ["fullstack", "founding"],
  }),

  // ─────────── DATABASES ───────────
  t({
    id: "db-sql",
    title: "SQL en profundidad",
    domain: "databases",
    level: "Fundamentals",
    summary: "JOINs, window functions, CTEs, subqueries, EXPLAIN.",
    description:
      "SQL bien escrito supera a ORMs mal usados. Domina joins (inner, left, semi, anti), window functions para ranking/agregados corriendo, CTEs recursivos. Lee EXPLAIN ANALYZE para entender por qué una query es lenta.",
    prerequisites: [],
    resources: [{ label: "Use The Index, Luke!", url: "https://use-the-index-luke.com/", kind: "book" }],
    interviewQuestions: ["Diferencia INNER vs LEFT JOIN.", "N+1 query problem.", "¿Cuándo un índice no se usa?"],
    careerPaths: ["backend", "fullstack", "ai-engineer", "ml-engineer", "founding"],
  }),
  t({
    id: "db-modeling",
    title: "Modelado relacional",
    domain: "databases",
    level: "Intermediate",
    summary: "Normalización, denormalización pragmática, claves.",
    description:
      "3NF como default, denormaliza con razón y medición. Claves naturales vs surrogates, soft-delete vs hard-delete, tablas de auditoría, historización con temporal tables o event sourcing.",
    prerequisites: ["db-sql"],
    careerPaths: ["backend", "fullstack", "ai-engineer", "founding"],
  }),
  t({
    id: "db-indexes",
    title: "Índices y planes de ejecución",
    domain: "databases",
    level: "Advanced",
    summary: "B-tree, hash, GIN/GiST, cobertura, cardinalidad.",
    description:
      "Un índice mal elegido es peor que ninguno (paga escritura sin ganar lectura). Aprende cuándo un índice cubierto evita heap fetch, por qué el orden de columnas importa, y cuándo un índice parcial es la solución.",
    prerequisites: ["db-modeling"],
    interviewQuestions: ["Índice compuesto: orden de columnas.", "GIN vs B-tree para full-text.", "¿Cuándo un WHERE no usa el índice?"],
    careerPaths: ["backend", "ml-engineer", "founding"],
  }),
  t({
    id: "db-transactions",
    title: "Transacciones y aislamiento",
    domain: "databases",
    level: "Advanced",
    summary: "ACID, niveles de aislamiento, MVCC, locks.",
    description:
      "Read committed, repeatable read, serializable — y qué anomalías permite cada uno (dirty read, non-repeatable, phantom). MVCC en Postgres, deadlocks y cómo evitarlos.",
    prerequisites: ["db-indexes"],
    interviewQuestions: ["Explica niveles de aislamiento.", "¿Qué es phantom read?", "SELECT FOR UPDATE: cuándo."],
    careerPaths: ["backend", "founding", "ai-engineer"],
  }),
  t({
    id: "db-postgres",
    title: "PostgreSQL avanzado",
    domain: "databases",
    level: "Advanced",
    summary: "JSONB, LISTEN/NOTIFY, extensions, RLS.",
    description:
      "Postgres es tu Swiss army knife: JSONB para datos semi-estructurados, LISTEN/NOTIFY para pub/sub simple, extensiones como pgvector para embeddings, RLS para multi-tenancy seguro.",
    prerequisites: ["db-transactions"],
    careerPaths: ["backend", "ai-engineer", "founding"],
    wizybotMapping: "Postgres + RLS es la columna vertebral de la multi-tenancy de WizyBot.",
  }),
  t({
    id: "db-nosql",
    title: "NoSQL: cuándo y cuál",
    domain: "databases",
    level: "Intermediate",
    summary: "Key-value, document, wide-column, trade-offs vs SQL.",
    description:
      "Redis (KV en memoria), MongoDB (document), DynamoDB (wide-column con acceso por partition key), Cassandra (multi-region writes). Entiende qué modelo de acceso optimiza cada uno.",
    prerequisites: ["db-modeling"],
    careerPaths: ["backend", "ai-engineer", "founding"],
  }),
  t({
    id: "db-vector",
    title: "Vector databases y búsqueda semántica",
    domain: "databases",
    level: "Advanced",
    summary: "pgvector, Qdrant, HNSW, filtros híbridos.",
    description:
      "Almacena embeddings y busca por similitud coseno. HNSW como índice ANN dominante, trade-off recall/latency, filtros de metadata sin destruir el índice, búsqueda híbrida (vector + BM25).",
    prerequisites: ["db-postgres", "math-linalg"],
    realWorldUse: "Base de todo RAG en producción.",
    papers: [{ title: "Efficient and robust approximate nearest neighbor search using HNSW", url: "https://arxiv.org/abs/1603.09320", year: 2016 }],
    careerPaths: ["ai-engineer", "ml-engineer", "founding"],
    wizybotMapping: "WizyBot indexa el conocimiento del cliente en pgvector y filtra por tenant_id.",
  }),

  // ─────────── DISTRIBUTED SYSTEMS ───────────
  t({
    id: "dist-cap",
    title: "Teorema CAP y PACELC",
    domain: "distributed",
    level: "Intermediate",
    summary: "Consistencia, disponibilidad, tolerancia a partición.",
    description:
      "Bajo partición debes elegir C o A. PACELC extiende: sin partición eliges entre latencia y consistencia. Entiende por qué DynamoDB es AP y Spanner es CP-ish.",
    prerequisites: ["cs-networking"],
    interviewQuestions: ["Explica CAP con ejemplo real.", "PACELC vs CAP."],
    careerPaths: ["backend", "founding", "ml-engineer"],
  }),
  t({
    id: "dist-replication",
    title: "Replicación",
    domain: "distributed",
    level: "Advanced",
    summary: "Leader-follower, multi-leader, leaderless, lag.",
    description:
      "Cómo mantener múltiples copias en sync. Sync vs async replication. Lag de replicas y cuándo leer del leader. Split-brain y cómo prevenirlo con fencing.",
    prerequisites: ["dist-cap"],
    resources: [{ label: "Designing Data-Intensive Applications (DDIA)", url: "https://dataintensive.net/", kind: "book" }],
    careerPaths: ["backend", "founding"],
  }),
  t({
    id: "dist-consensus",
    title: "Consenso: Raft y Paxos",
    domain: "distributed",
    level: "Expert",
    summary: "Cómo un grupo de nodos acuerda un valor pese a fallos.",
    description:
      "Raft es Paxos comprensible. Entiende leader election, log replication, safety properties. La base de etcd, Consul, CockroachDB.",
    prerequisites: ["dist-replication"],
    papers: [{ title: "In Search of an Understandable Consensus Algorithm (Raft)", url: "https://raft.github.io/raft.pdf", year: 2014 }],
    resources: [{ label: "Raft visualization", url: "https://raft.github.io/", kind: "video" }],
    careerPaths: ["backend", "research", "founding"],
  }),
  t({
    id: "dist-event-driven",
    title: "Arquitectura event-driven",
    domain: "distributed",
    level: "Advanced",
    summary: "Kafka, event sourcing, CQRS, outbox pattern.",
    description:
      "Los eventos como fuente de verdad. Kafka como log distribuido, particiones para orden por clave, consumer groups. Outbox pattern para publicar de forma transaccional.",
    prerequisites: ["backend-queues"],
    careerPaths: ["backend", "founding", "ai-engineer"],
  }),

  // ─────────── CLOUD & DEVOPS ───────────
  t({
    id: "cloud-docker",
    title: "Docker y contenedores",
    domain: "cloud-devops",
    level: "Fundamentals",
    summary: "Imágenes, layers, multi-stage builds, networking.",
    description:
      "Cómo construir imágenes pequeñas y reproducibles con multi-stage builds. Entiende layers y caché, .dockerignore, healthchecks, seguridad (usuario no-root, imágenes distroless).",
    prerequisites: ["found-linux-cli"],
    careerPaths: ALL,
  }),
  t({
    id: "cloud-k8s",
    title: "Kubernetes",
    domain: "cloud-devops",
    level: "Advanced",
    summary: "Pods, Deployments, Services, Ingress, HPA.",
    description:
      "El API declarativo de infra. Aprende primitivas (Pod, Deployment, StatefulSet), networking (Service, Ingress), storage (PVC), autoscaling (HPA/VPA/KEDA). No memorices YAML: entiende el reconciliation loop.",
    prerequisites: ["cloud-docker"],
    careerPaths: ["backend", "ml-engineer", "founding"],
  }),
  t({
    id: "cloud-cicd",
    title: "CI/CD",
    domain: "cloud-devops",
    level: "Intermediate",
    summary: "Pipelines, artefactos, entornos, blue/green, canary.",
    description:
      "Pipeline que corre tests, construye artefacto, despliega a staging, promueve a prod. Estrategias de deploy (rolling, blue/green, canary con métricas) y feature flags para separar deploy de release.",
    prerequisites: ["cloud-docker", "found-testing"],
    careerPaths: ALL,
  }),
  t({
    id: "cloud-iac",
    title: "Infrastructure as Code",
    domain: "cloud-devops",
    level: "Advanced",
    summary: "Terraform, Pulumi, drift, modules, state.",
    description:
      "Infra versionada y revisable como código. State remoto con locking, módulos reutilizables, cómo detectar y resolver drift, secretos fuera del state.",
    prerequisites: ["cloud-cicd"],
    careerPaths: ["backend", "founding", "ml-engineer"],
  }),
  t({
    id: "cloud-obs",
    title: "Observabilidad: logs, métricas, traces",
    domain: "cloud-devops",
    level: "Advanced",
    summary: "OpenTelemetry, Prometheus, Grafana, structured logs.",
    description:
      "Los tres pilares. Logs estructurados (JSON) con correlation IDs. Métricas con cardinalidad controlada (RED/USE). Distributed tracing con spans jerárquicos. OpenTelemetry como estándar.",
    prerequisites: ["cloud-cicd"],
    careerPaths: ALL,
  }),

  // ─────────── ARCHITECTURE ───────────
  t({
    id: "arch-ddd",
    title: "Domain-Driven Design",
    domain: "architecture",
    level: "Advanced",
    summary: "Bounded contexts, entities, value objects, ubiquitous language.",
    description:
      "Modela el dominio con el lenguaje del negocio. Bounded contexts previenen que un 'user' signifique tres cosas distintas. Aggregates encapsulan invariantes transaccionales.",
    prerequisites: ["found-clean-code"],
    resources: [{ label: "DDD Reference (Evans, gratis)", url: "https://www.domainlanguage.com/ddd/reference/", kind: "book" }],
    careerPaths: ["backend", "founding", "fullstack"],
  }),
  t({
    id: "arch-hexagonal",
    title: "Hexagonal / ports & adapters",
    domain: "architecture",
    level: "Advanced",
    summary: "Aísla dominio de infra: DB, HTTP y colas son adaptadores.",
    description:
      "Tu dominio no debe importar de tu ORM. Ports definen contratos, adapters los implementan. Facilita testing y cambio de infra sin reescribir lógica de negocio.",
    prerequisites: ["arch-ddd"],
    careerPaths: ["backend", "founding"],
  }),
  t({
    id: "arch-system-design",
    title: "System design de casos clásicos",
    domain: "architecture",
    level: "Expert",
    summary: "Diseña Twitter, Uber, Netflix, WhatsApp, un rate limiter.",
    description:
      "El interview clásico: dado un problema abierto, propone una arquitectura, discute trade-offs, estima capacidad, identifica bottlenecks. No hay respuesta única — hay decisiones justificadas.",
    prerequisites: ["dist-cap", "backend-caching", "db-indexes"],
    resources: [
      { label: "System Design Primer", url: "https://github.com/donnemartin/system-design-primer", kind: "repo" },
      { label: "ByteByteGo", url: "https://bytebytego.com/", kind: "course" },
    ],
    interviewQuestions: ["Diseña un URL shortener.", "Diseña Instagram feed.", "Diseña un chat 1:1 con presencia."],
    careerPaths: ["backend", "founding", "ai-engineer"],
  }),
  t({
    id: "arch-multitenancy",
    title: "Multi-tenancy",
    domain: "architecture",
    level: "Advanced",
    summary: "Shared DB + RLS, schema per tenant, DB per tenant.",
    description:
      "Trade-offs entre aislamiento, coste y complejidad. RLS de Postgres para shared-DB seguro. Sharding por tenant para escala grande. Cómo migrar entre modelos sin downtime.",
    prerequisites: ["db-postgres", "arch-ddd"],
    careerPaths: ["backend", "founding"],
    wizybotMapping: "WizyBot usa shared-DB + RLS por tenant_id.",
  }),

  // ─────────── ML ───────────
  t({
    id: "ml-supervised",
    title: "Aprendizaje supervisado clásico",
    domain: "ml",
    level: "Fundamentals",
    summary: "Regresión lineal/logística, árboles, ensembles.",
    description:
      "Antes de tocar redes, domina lo clásico: regresión lineal como base intuitiva, logística para clasificación, decision trees, random forests, gradient boosting (XGBoost/LightGBM) que aún ganan en tabular.",
    prerequisites: ["math-probability", "math-linalg"],
    resources: [{ label: "Hands-On ML (Géron)", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125967/", kind: "book" }],
    careerPaths: ["ml-engineer", "ai-engineer", "research"],
  }),
  t({
    id: "ml-evaluation",
    title: "Evaluación de modelos",
    domain: "ml",
    level: "Intermediate",
    summary: "Train/val/test, CV, métricas por tarea, data leakage.",
    description:
      "Un modelo con 99% accuracy puede ser inútil (clases desbalanceadas). Aprende precision/recall/F1, ROC-AUC, calibration. Detecta data leakage — la razón #1 de modelos que funcionan en dev y fallan en prod.",
    prerequisites: ["ml-supervised"],
    interviewQuestions: ["Precision vs recall: cuándo importa cuál.", "¿Qué es data leakage? Ejemplo.", "AUC-ROC vs PR-AUC."],
    careerPaths: ["ml-engineer", "ai-engineer", "research"],
  }),
  t({
    id: "ml-feature-eng",
    title: "Feature engineering",
    domain: "ml",
    level: "Intermediate",
    summary: "Encoding, scaling, imputación, feature selection.",
    description:
      "Datos > modelo. Encoding categórico (one-hot, target, embeddings), scaling apropiado, tratamiento de missing, creación de features a partir de conocimiento de dominio.",
    prerequisites: ["ml-supervised"],
    careerPaths: ["ml-engineer", "research"],
  }),
  t({
    id: "ml-unsupervised",
    title: "Aprendizaje no supervisado",
    domain: "ml",
    level: "Intermediate",
    summary: "Clustering (k-means, DBSCAN), PCA, t-SNE, UMAP.",
    description:
      "Cuando no hay labels. Clustering para segmentación, reducción de dimensionalidad para visualización o compresión, detección de anomalías.",
    prerequisites: ["ml-supervised", "math-linalg"],
    careerPaths: ["ml-engineer", "research", "ai-engineer"],
  }),

  // ─────────── DEEP LEARNING ───────────
  t({
    id: "dl-mlp",
    title: "MLP y backpropagation desde cero",
    domain: "deep-learning",
    level: "Intermediate",
    summary: "Forward, backward, cadena, initialization.",
    description:
      "Implementa una red desde cero en NumPy: forward pass, cálculo de loss, backprop manual con la regla de la cadena, actualización con SGD. Sin este ejercicio, PyTorch es una caja negra.",
    prerequisites: ["math-calculus", "math-linalg", "math-optimization"],
    project: { title: "Micrograd + MLP en NumPy", brief: "Autograd escalar como Karpathy, luego MLP para MNIST." },
    resources: [{ label: "Karpathy — Neural Networks: Zero to Hero", url: "https://karpathy.ai/zero-to-hero.html", kind: "course" }],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "dl-pytorch",
    title: "PyTorch práctico",
    domain: "deep-learning",
    level: "Intermediate",
    summary: "Tensors, autograd, nn.Module, training loop, DataLoader.",
    description:
      "El framework dominante en research y cada vez más en prod. Aprende training loops explícitos, mixed precision, gradient accumulation, checkpointing.",
    prerequisites: ["dl-mlp", "lang-python"],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "dl-cnn",
    title: "Convolutional Neural Networks",
    domain: "deep-learning",
    level: "Intermediate",
    summary: "Convoluciones, pooling, ResNet, transfer learning.",
    description:
      "Visión por computador. Entiende por qué las convoluciones aprovechan localidad espacial, qué añade residual connections (ResNet), y cómo hacer transfer learning con un backbone pre-entrenado.",
    prerequisites: ["dl-pytorch"],
    careerPaths: ["ml-engineer", "research"],
  }),
  t({
    id: "dl-rnn",
    title: "RNN, LSTM y GRU",
    domain: "deep-learning",
    level: "Intermediate",
    summary: "Secuencias antes de transformers.",
    description:
      "Aún relevantes en algunos contextos y clave para entender qué problemas resolvieron los transformers. Vanishing gradient, gates de LSTM, limitaciones en dependencias largas.",
    prerequisites: ["dl-pytorch"],
    careerPaths: ["ml-engineer", "research"],
  }),
  t({
    id: "dl-transformers",
    title: "Transformers desde cero",
    domain: "deep-learning",
    level: "Advanced",
    summary: "Self-attention, multi-head, positional encoding.",
    description:
      "La arquitectura que domina hoy. Implementa attention manualmente, entiende Q/K/V como consultas a una memoria diferenciable, positional encodings (absolute, rotary), y por qué la arquitectura escala.",
    prerequisites: ["dl-rnn", "math-linalg"],
    papers: [{ title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", year: 2017 }],
    project: { title: "GPT-mini", brief: "Implementa un GPT decoder-only y entrénalo en Shakespeare (nanoGPT-style)." },
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "dl-training",
    title: "Training a escala",
    domain: "deep-learning",
    level: "Expert",
    summary: "Distributed training, DDP, FSDP, mixed precision.",
    description:
      "Cómo entrenar modelos que no caben en una GPU. Data parallelism (DDP), tensor/pipeline parallelism, ZeRO/FSDP. Mixed precision (fp16/bf16), gradient checkpointing.",
    prerequisites: ["dl-transformers", "cs-concurrency"],
    careerPaths: ["ml-engineer", "research"],
  }),

  // ─────────── LLM ENGINEERING ───────────
  t({
    id: "llm-tokenization",
    title: "Tokenización",
    domain: "llm-eng",
    level: "Intermediate",
    summary: "BPE, WordPiece, unicode edge cases, tiktoken.",
    description:
      "Un tokenizer decide cuánto cuesta cada palabra. Byte-pair encoding, cómo se entrena un tokenizer, por qué GPT ve 'strawberry' de forma extraña. Impacto en cost y latencia.",
    prerequisites: ["dl-transformers"],
    resources: [{ label: "Karpathy — Let's build the GPT Tokenizer", url: "https://www.youtube.com/watch?v=zduSFxRajkE", kind: "video" }],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "llm-inference",
    title: "Inferencia de LLMs",
    domain: "llm-eng",
    level: "Advanced",
    summary: "KV cache, batching, speculative decoding, vLLM.",
    description:
      "Servir LLMs eficientemente. KV cache y por qué domina la memoria, continuous batching, paged attention (vLLM), speculative decoding. La diferencia entre servir 10 o 1000 usuarios en el mismo hardware.",
    prerequisites: ["dl-transformers"],
    papers: [{ title: "Efficient Memory Management for Large Language Model Serving with PagedAttention", url: "https://arxiv.org/abs/2309.06180", year: 2023 }],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
    wizybotMapping: "El coste unitario de WizyBot depende de batching y caching en el servidor de inferencia.",
  }),
  t({
    id: "llm-quantization",
    title: "Quantization",
    domain: "llm-eng",
    level: "Advanced",
    summary: "INT8, INT4, GPTQ, AWQ, bitsandbytes.",
    description:
      "Reducir precisión sin destruir calidad. Post-training quantization vs quantization-aware training. GPTQ/AWQ como estándares. Cuándo la caída de calidad no compensa el ahorro.",
    prerequisites: ["llm-inference"],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "llm-finetuning",
    title: "Fine-tuning y LoRA",
    domain: "llm-eng",
    level: "Advanced",
    summary: "SFT, LoRA/QLoRA, DPO, catastrophic forgetting.",
    description:
      "Cuándo fine-tune bate a prompting (rara vez, pero existe). LoRA para entrenar millones de parámetros en vez de miles de millones. DPO como alternativa simple a RLHF.",
    prerequisites: ["dl-transformers", "llm-quantization"],
    papers: [{ title: "LoRA: Low-Rank Adaptation of Large Language Models", url: "https://arxiv.org/abs/2106.09685", year: 2021 }],
    careerPaths: ["ai-engineer", "ml-engineer", "research"],
  }),
  t({
    id: "llm-prompting",
    title: "Prompt engineering estructurado",
    domain: "llm-eng",
    level: "Intermediate",
    summary: "System/user/assistant, few-shot, structured output, tool use.",
    description:
      "Prompts como interfaces, no como poesía. Rol claro, ejemplos few-shot bien elegidos, salida estructurada (JSON schema, tool calls), separación de instrucciones y datos.",
    prerequisites: ["llm-tokenization"],
    careerPaths: ["ai-engineer", "founding", "fullstack"],
    wizybotMapping: "El prompt orquestador de WizyBot separa persona, contexto recuperado, herramientas y guardrails.",
  }),

  // ─────────── AI SYSTEMS ───────────
  t({
    id: "ai-rag-naive",
    title: "RAG básico",
    domain: "ai-systems",
    level: "Intermediate",
    summary: "Chunk → embed → retrieve → generate.",
    description:
      "El pipeline mínimo: divide documentos en chunks, embed con un modelo, guarda en vector DB, en query recupera top-k, mete en el prompt. Entiende sus límites — muchas apps 'RAG' fallan por saltarse esto.",
    prerequisites: ["llm-prompting", "db-vector"],
    project: { title: "RAG sobre tu propia documentación técnica", brief: "PDFs/markdown → pgvector → chat con citaciones." },
    careerPaths: ["ai-engineer", "founding", "fullstack"],
    wizybotMapping: "La base del retrieval de conocimiento del cliente en WizyBot.",
  }),
  t({
    id: "ai-rag-advanced",
    title: "RAG avanzado",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Query rewriting, hybrid search, rerankers, contextual chunks.",
    description:
      "Query rewriting para preguntas ambiguas, búsqueda híbrida (vector + BM25), rerankers cross-encoder (Cohere, bge-reranker), chunking contextual (Anthropic). Es donde se gana o pierde calidad real.",
    prerequisites: ["ai-rag-naive"],
    papers: [{ title: "Contextual Retrieval", url: "https://www.anthropic.com/news/contextual-retrieval", year: 2024 }],
    careerPaths: ["ai-engineer", "research", "founding"],
    wizybotMapping: "WizyBot combina búsqueda semántica y BM25 con un reranker antes de generar.",
  }),
  t({
    id: "ai-agents",
    title: "Agentes: tool use y control flow",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Function calling, ReAct, planning, loops seguros.",
    description:
      "Agente = LLM + herramientas + loop. Diseña herramientas con interfaces claras, controla el loop (max steps, timeouts, budget), decide entre agentes libres vs workflows deterministas. La mayoría de 'agentes' en producción son workflows.",
    prerequisites: ["llm-prompting"],
    resources: [{ label: "Anthropic — Building effective agents", url: "https://www.anthropic.com/research/building-effective-agents", kind: "article" }],
    careerPaths: ["ai-engineer", "founding", "research"],
  }),
  t({
    id: "ai-mcp",
    title: "Model Context Protocol (MCP)",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Estándar abierto para conectar LLMs con herramientas y datos.",
    description:
      "MCP define un protocolo (JSON-RPC) para que un modelo consuma tools, resources y prompts servidos por servidores externos. Piensa 'LSP para AI': un cliente, muchos servidores intercambiables.",
    prerequisites: ["ai-agents"],
    resources: [{ label: "MCP spec", url: "https://modelcontextprotocol.io/", kind: "docs" }],
    careerPaths: ["ai-engineer", "founding", "research"],
  }),
  t({
    id: "ai-evals",
    title: "Evaluación de sistemas LLM",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Golden sets, LLM-as-judge, A/B, regression evals.",
    description:
      "Sin evals, cada cambio de prompt es fe. Construye golden sets pequeños y curados, LLM-as-judge con criterios explícitos, evals de regresión en CI, A/B en producción. Mide tanto correctness como safety.",
    prerequisites: ["ai-rag-naive"],
    resources: [{ label: "Hamel Husain — Evals", url: "https://hamel.dev/blog/posts/evals/", kind: "article" }],
    careerPaths: ["ai-engineer", "ml-engineer", "founding", "research"],
    wizybotMapping: "Cada release de WizyBot pasa por un eval set de conversaciones reales anonimizadas.",
  }),
  t({
    id: "ai-observability",
    title: "Observabilidad de LLMs",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Traces, tokens, latencia, costo por request, LangSmith/Langfuse.",
    description:
      "En LLMs cada request cuesta dinero variable. Traza cada llamada (prompt, respuesta, tokens, latencia, coste), agrupa por feature y tenant, alerta en regresiones de calidad o coste.",
    prerequisites: ["cloud-obs", "ai-evals"],
    careerPaths: ["ai-engineer", "founding", "ml-engineer"],
  }),
  t({
    id: "ai-memory",
    title: "Memoria en agentes conversacionales",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Short-term, long-term, semantic, episodic.",
    description:
      "Ventana de contexto vs memoria persistente. Resumen incremental, extracción de hechos, indexado semántico de conversaciones pasadas. Cuándo actualizar y cuándo olvidar.",
    prerequisites: ["ai-rag-advanced"],
    careerPaths: ["ai-engineer", "founding", "research"],
    wizybotMapping: "WizyBot mantiene memoria por usuario final y hechos por cuenta.",
  }),
  t({
    id: "ai-guardrails",
    title: "Guardrails y seguridad de LLMs",
    domain: "ai-systems",
    level: "Advanced",
    summary: "Prompt injection, jailbreaks, PII, output validation.",
    description:
      "Prompt injection es SQL injection para LLMs. Nunca confíes en input externo dentro del prompt sin separación clara. Valida outputs contra schemas, filtra PII, detecta jailbreaks, considera classifiers de seguridad.",
    prerequisites: ["ai-agents"],
    careerPaths: ["ai-engineer", "founding", "research"],
    wizybotMapping: "WizyBot valida cada respuesta contra guardrails de tema, tono y PII antes de devolverla.",
  }),

  // ─────────── MLOPS ───────────
  t({
    id: "mlops-serving",
    title: "Model serving",
    domain: "mlops",
    level: "Advanced",
    summary: "Triton, TorchServe, vLLM, autoscaling con GPU.",
    description:
      "Latencia p99, throughput, coste por request. Diferencias entre servir modelos clásicos vs LLMs. Autoscaling con GPUs es distinto: cold starts largos, quantum de escala grueso.",
    prerequisites: ["cloud-k8s", "llm-inference"],
    careerPaths: ["ml-engineer", "ai-engineer", "founding"],
  }),
  t({
    id: "mlops-monitoring",
    title: "Monitoring y drift",
    domain: "mlops",
    level: "Advanced",
    summary: "Data drift, concept drift, alertas, shadow deployments.",
    description:
      "Los modelos se degradan aunque tu código no cambie. Monitorea distribución de inputs, de predicciones, y (cuando hay labels) de accuracy. Shadow deployments para validar nuevos modelos sin impactar usuarios.",
    prerequisites: ["mlops-serving", "cloud-obs"],
    careerPaths: ["ml-engineer", "ai-engineer"],
  }),
  t({
    id: "mlops-registry",
    title: "Model registry y experiment tracking",
    domain: "mlops",
    level: "Intermediate",
    summary: "MLflow, W&B, versionado de modelos, lineage.",
    description:
      "Cada modelo tiene datos, código y hyperparams asociados. Trackea experimentos, versiona artefactos, mantén lineage entrenamiento → deploy. Sin esto, 'qué modelo está en prod' se vuelve un misterio.",
    prerequisites: ["ml-evaluation"],
    careerPaths: ["ml-engineer", "research"],
  }),

  // ─────────── PORTFOLIO PROJECTS ───────────
  t({
    id: "proj-rag-app",
    title: "RAG SaaS mini",
    domain: "projects",
    level: "Intermediate",
    summary: "App multi-usuario que ingesta docs y responde con citaciones.",
    description:
      "Auth, upload de PDFs, ingestion pipeline (chunking + embeddings), vector DB, chat con streaming y citaciones. Deployable, con evals básicas y observabilidad.",
    prerequisites: ["ai-rag-naive", "backend-auth", "front-react"],
    careerPaths: ["ai-engineer", "founding", "fullstack"],
  }),
  t({
    id: "proj-agent",
    title: "Agente con tools reales",
    domain: "projects",
    level: "Advanced",
    summary: "Agente que resuelve una tarea vertical (investigación, coding, ops).",
    description:
      "Elige un vertical, define 5-10 herramientas de calidad, controla el loop, mide éxito con evals. Publica trazas para que otros vean cómo piensa.",
    prerequisites: ["ai-agents", "ai-evals"],
    careerPaths: ["ai-engineer", "founding"],
  }),
  t({
    id: "proj-nanogpt",
    title: "Reimplementación de nanoGPT",
    domain: "projects",
    level: "Advanced",
    summary: "GPT desde cero en PyTorch, entrenado en corpus pequeño.",
    description:
      "Escribe el transformer, tokenizer BPE, training loop con optimizaciones (flash attention si aplica), inference con sampling. Bloguéalo.",
    prerequisites: ["dl-transformers"],
    careerPaths: ["research", "ml-engineer", "ai-engineer"],
  }),
  t({
    id: "proj-system-design",
    title: "System design escrito de un producto real",
    domain: "projects",
    level: "Advanced",
    summary: "Doc de diseño con diagramas, trade-offs, capacity planning.",
    description:
      "Elige un producto (feed social, ride-share, chat) y escribe un design doc como los que se defienden en interviews senior. Diagramas C4, alternativas descartadas y por qué.",
    prerequisites: ["arch-system-design"],
    careerPaths: ["backend", "founding", "ai-engineer"],
  }),

  // ─────────── INTERVIEW PREP ───────────
  t({
    id: "int-coding",
    title: "Coding interviews (LeetCode style)",
    domain: "interview",
    level: "Intermediate",
    summary: "Patrones, comunicación, edge cases, tests.",
    description:
      "150-200 problemas bien resueltos y explicados baten a 500 mal masticados. Practica pensar en voz alta, aclarar antes de codear, discutir complejidad, escribir tests.",
    prerequisites: ["cs-algorithms"],
    resources: [{ label: "NeetCode 150", url: "https://neetcode.io/practice", kind: "course" }],
    careerPaths: ALL,
  }),
  t({
    id: "int-system-design",
    title: "System design interviews",
    domain: "interview",
    level: "Advanced",
    summary: "Framework: requisitos → API → data → escala → deep dive.",
    description:
      "Estructura tu respuesta: clarifica requisitos funcionales y no funcionales, estima escala, dibuja API y modelo de datos, escala pieza por pieza, cierra con trade-offs. Practica con feedback real.",
    prerequisites: ["arch-system-design"],
    careerPaths: ["backend", "ai-engineer", "founding"],
  }),
  t({
    id: "int-ml-design",
    title: "ML system design interviews",
    domain: "interview",
    level: "Advanced",
    summary: "Formulación del problema, datos, métricas, features, modelo, serving.",
    description:
      "Diseña recomendador, fraud detection, ranker de feed, chatbot RAG. Distinto a system design clásico: pesa datos, métricas offline vs online, feedback loops.",
    prerequisites: ["ml-evaluation", "ai-rag-advanced"],
    resources: [{ label: "ML System Design (Alex Xu)", url: "https://bytebytego.com/", kind: "book" }],
    careerPaths: ["ml-engineer", "ai-engineer", "research"],
  }),
  t({
    id: "int-behavioral",
    title: "Behavioral y storytelling técnico",
    domain: "interview",
    level: "Intermediate",
    summary: "STAR, historias reutilizables, senior signals.",
    description:
      "Prepara 6-8 historias que muestren impacto, ownership, colaboración, disagreement, growth. Usa STAR para estructura, cuantifica impacto, sé honesto sobre trade-offs.",
    prerequisites: [],
    careerPaths: ALL,
  }),

  // ─────────── CAREER ───────────
  t({
    id: "career-portfolio",
    title: "Portfolio y presencia online",
    domain: "career",
    level: "Intermediate",
    summary: "GitHub, blog técnico, LinkedIn, proyectos visibles.",
    description:
      "Tu portfolio es el shortcut a mejores oportunidades. README serios en tus repos, un blog con 5-10 posts técnicos profundos, LinkedIn con logros concretos. Escribir clarifica pensamiento y atrae oportunidades.",
    prerequisites: [],
    careerPaths: ALL,
  }),
  t({
    id: "career-apply",
    title: "Job search estratégico",
    domain: "career",
    level: "Intermediate",
    summary: "Targeting de empresas, referrals, cover letters útiles.",
    description:
      "Aplicar cold es la peor opción. Prioriza referrals, empresas que te interesan (no 500 aplicaciones ciegas), cartas cortas que muestren fit específico. Track con un CRM personal.",
    prerequisites: ["career-portfolio"],
    careerPaths: ALL,
  }),
  t({
    id: "career-negotiation",
    title: "Negociación de oferta",
    domain: "career",
    level: "Advanced",
    summary: "Componentes de compensación, competing offers, script.",
    description:
      "Base, bonus, equity (con vesting y strike price), signing, benefits. Never accept on the call. Usa competing offers con honestidad. La negociación bien hecha suma 10-30% sin cambiar de empresa.",
    prerequisites: [],
    resources: [{ label: "Kalzumeus — Salary Negotiation", url: "https://www.kalzumeus.com/2012/01/23/salary-negotiation/", kind: "article" }],
    careerPaths: ALL,
  }),
];

// ─────────── Índices y utilidades ───────────
export const TOPICS_BY_ID: Record<string, Topic> = Object.fromEntries(TOPICS.map((x) => [x.id, x]));
export const DOMAIN_BY_ID: Record<DomainId, Domain> = Object.fromEntries(DOMAINS.map((d) => [d.id, d])) as Record<DomainId, Domain>;

export const TOPICS_BY_DOMAIN: Record<DomainId, Topic[]> = DOMAINS.reduce((acc, d) => {
  acc[d.id] = TOPICS.filter((t) => t.domain === d.id);
  return acc;
}, {} as Record<DomainId, Topic[]>);

export const LEVEL_ORDER: Record<Level, number> = {
  Fundamentals: 0,
  Intermediate: 1,
  Advanced: 2,
  Expert: 3,
};
