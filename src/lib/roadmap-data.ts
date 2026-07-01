export type Level = 1 | 2 | 3 | 4 | 5;
export type Priority = "Alta" | "Media" | "Baja";

export interface Topic {
  id: string;
  title: string;
  level: Level;
  priority: Priority;
  difficulty: number; // 1-10
  hours?: number;
  note?: string;
}

export interface Technology {
  id: string;
  name: string;
  priority: "Crítica" | "Alta" | "Media";
  totalWeeks: number;
  difficulty: number;
  summary: string;
  wizybotRefs: string[];
  topics: Topic[];
}

const t = (
  id: string,
  title: string,
  level: Level,
  priority: Priority,
  difficulty: number,
  hours?: number,
  note?: string,
): Topic => ({ id, title, level, priority, difficulty, hours, note });

export const technologies: Technology[] = [
  {
    id: "nestjs",
    name: "NestJS + TypeScript",
    priority: "Crítica",
    totalWeeks: 8,
    difficulty: 8,
    summary:
      "Framework de toda la API. 86 módulos, 96 servicios, 67 controllers. Sin esto no entiendes nada del backend.",
    wizybotRefs: [
      "src/app/app.module.ts",
      "src/app/modules/**/*.module.ts",
      "src/app/modules/**/dto/",
      "src/config/",
    ],
    topics: [
      t("nest-1", "TypeScript: generics, decorators, utility types", 1, "Alta", 5, 6),
      t("nest-2", "Reflect metadata y cómo NestJS lo usa", 1, "Alta", 6, 3),
      t("nest-3", "Módulos: imports, providers, exports", 1, "Alta", 4, 4),
      t("nest-4", "Controllers y routing", 1, "Alta", 3, 3),
      t("nest-5", "Providers y Dependency Injection", 1, "Alta", 5, 4),
      t("nest-6", "DTOs con class-validator + class-transformer", 2, "Alta", 5, 4),
      t("nest-7", "Guards, Pipes, Interceptors, Exception Filters", 2, "Alta", 7, 6),
      t("nest-8", "Custom providers (useFactory, useClass, useValue)", 2, "Alta", 6, 3),
      t("nest-9", "Circular dependencies y forwardRef()", 2, "Alta", 7, 3),
      t("nest-10", "Scopes: singleton, request, transient", 2, "Media", 6, 2),
      t("nest-11", "Custom decorators + metadata", 3, "Alta", 7, 4),
      t("nest-12", "Dynamic modules y configuración forRoot/forFeature", 3, "Alta", 8, 4),
      t("nest-13", "Testing con Jest: unit + e2e", 3, "Alta", 7, 6),
      t("nest-14", "Arquitectura hexagonal en NestJS", 3, "Media", 8, 5),
      t("nest-15", "Cuándo dividir un módulo en microservicio", 4, "Alta", 8, 4),
      t("nest-16", "Performance profiling con Pyroscope", 4, "Media", 8, 4),
      t("nest-17", "Diseñar el módulo #87 desde cero", 5, "Alta", 9, 6),
    ],
  },
  {
    id: "bullmq",
    name: "BullMQ + Queue Systems",
    priority: "Crítica",
    totalWeeks: 6,
    difficulty: 9,
    summary:
      "48 colas gestionan Shopify webhooks, sync, billing, AI. Sin colas WizyBot no procesa nada async.",
    wizybotRefs: [
      "@nestjs/bullmq (10.2.3)",
      "48 registered queues (shopSync, followUps, whatsAppHistorySync, etc.)",
      "Flow producers: merchantCheatSheetFlow, payingMerchantReportFlow",
    ],
    topics: [
      t("bull-1", "Conceptos: queues, jobs, workers, processors", 1, "Alta", 4, 4),
      t("bull-2", "Configurar una cola con @nestjs/bullmq", 1, "Alta", 5, 3),
      t("bull-3", "Procesar jobs con @Processor", 1, "Alta", 5, 3),
      t("bull-4", "Identificar las 5 colas más críticas del negocio", 1, "Alta", 4, 3),
      t("bull-5", "Retry con backoff exponencial", 2, "Alta", 6, 3),
      t("bull-6", "Delayed jobs (estudiar followUps queue)", 2, "Alta", 6, 3),
      t("bull-7", "removeOnComplete / removeOnFail y memoria Redis", 2, "Alta", 6, 2),
      t("bull-8", "Concurrency y rate limiting por cola", 2, "Alta", 7, 3),
      t("bull-9", "Graceful shutdown sin perder jobs", 2, "Alta", 7, 3),
      t("bull-10", "Flow producers (merchantCheatSheetFlow)", 3, "Alta", 8, 5),
      t("bull-11", "Dead letter queues y jobs failed", 3, "Alta", 7, 3),
      t("bull-12", "Bull Board para monitoreo en dev/prod", 3, "Media", 5, 2),
      t("bull-13", "Idempotencia de jobs (webhooks Shopify)", 3, "Alta", 8, 4),
      t("bull-14", "Prioridades y fairness entre tenants", 4, "Alta", 8, 3),
      t("bull-15", "Escalar workers horizontalmente", 4, "Alta", 9, 4),
      t("bull-16", "Diseñar el sistema de colas para 10x tráfico", 5, "Alta", 10, 6),
    ],
  },
  {
    id: "redis",
    name: "Redis (Cache + Session + Pub/Sub)",
    priority: "Crítica",
    totalWeeks: 4,
    difficulty: 6,
    summary:
      "Triple rol: caché de app, store de sesiones (connect-redis), broker de BullMQ y adapter de Socket.io.",
    wizybotRefs: [
      "src/config/session.config.ts",
      "connect-redis (7.1.1)",
      "Redis adapter para Socket.io",
    ],
    topics: [
      t("redis-1", "CLI: SET, GET, HSET, LPUSH, ZADD, TTL", 1, "Alta", 3, 3),
      t("redis-2", "Estructuras: strings, hashes, lists, sets, sorted sets", 1, "Alta", 4, 3),
      t("redis-3", "Cache-aside pattern con TTL", 1, "Alta", 5, 3),
      t("redis-4", "Sesiones con connect-redis", 2, "Alta", 5, 3),
      t("redis-5", "Pub/Sub: canales y suscripciones", 2, "Alta", 6, 3),
      t("redis-6", "Eviction policies (allkeys-lru, volatile-ttl, etc.)", 2, "Alta", 6, 2),
      t("redis-7", "Pipelining y transacciones MULTI/EXEC", 2, "Media", 6, 2),
      t("redis-8", "Redis Streams (alternativa a colas)", 3, "Media", 7, 3),
      t("redis-9", "Redis Cluster vs Sentinel", 3, "Alta", 8, 3),
      t("redis-10", "Debugging: SLOWLOG, MONITOR, INFO", 3, "Alta", 7, 2),
      t("redis-11", "Cuándo Redis deja de servir (>1M keys)", 4, "Media", 8, 3),
    ],
  },
  {
    id: "typeorm",
    name: "TypeORM + MySQL",
    priority: "Alta",
    totalWeeks: 6,
    difficulty: 7,
    summary:
      "Base de datos primaria. 86 entidades, migraciones, relaciones complejas entre merchant, chat, product.",
    wizybotRefs: [
      "src/config/data-source.config.ts",
      "src/config/database.config.ts",
      "src/app/modules/*/entities/",
    ],
    topics: [
      t("tor-1", "Entidades: @Entity, @Column, @PrimaryGeneratedColumn", 1, "Alta", 4, 4),
      t("tor-2", "Relaciones: @OneToMany, @ManyToOne, @ManyToMany", 1, "Alta", 6, 4),
      t("tor-3", "Repositorios: find, save, delete", 1, "Alta", 4, 3),
      t("tor-4", "Migraciones: crear, ejecutar, revertir", 1, "Alta", 6, 4),
      t("tor-5", "Query Builder", 2, "Alta", 7, 5),
      t("tor-6", "Eager vs Lazy loading", 2, "Alta", 6, 3),
      t("tor-7", "Índices y @Index", 2, "Alta", 6, 3),
      t("tor-8", "Transacciones y optimistic locking", 2, "Alta", 7, 4),
      t("tor-9", "Soft deletes con @DeleteDateColumn", 2, "Media", 5, 2),
      t("tor-10", "Event subscribers y listeners", 2, "Media", 6, 3),
      t("tor-11", "N+1 problem: detección y solución", 3, "Alta", 7, 4),
      t("tor-12", "EXPLAIN ANALYZE + optimización", 3, "Alta", 8, 4),
      t("tor-13", "Migraciones sin downtime", 3, "Alta", 9, 4),
      t("tor-14", "Particionamiento de tablas MySQL", 3, "Media", 9, 4),
      t("tor-15", "Connection pool tuning", 3, "Alta", 7, 3),
      t("tor-16", "Multi-tenancy: shared schema vs schema per tenant", 4, "Media", 9, 4),
      t("tor-17", "Read replicas y write/read splitting", 4, "Alta", 8, 3),
    ],
  },
  {
    id: "socketio",
    name: "Socket.io + Real-Time",
    priority: "Alta",
    totalWeeks: 5,
    difficulty: 7,
    summary:
      "Motor real-time del chat. Redis adapter para escala horizontal entre múltiples instancias del backend.",
    wizybotRefs: [
      "src/app/modules/chat/",
      "src/app/modules/broadcast-to-client/",
      "src/app/modules/broadcast-to-shop/",
      "src/app/modules/userconnectionstatus/",
    ],
    topics: [
      t("ws-1", "WebSockets vs HTTP long-polling", 1, "Alta", 4, 2),
      t("ws-2", "NestJS WebSockets Gateway", 1, "Alta", 5, 3),
      t("ws-3", "Rooms y namespaces", 1, "Alta", 5, 4),
      t("ws-4", "Emit y on: eventos bidireccionales", 1, "Alta", 4, 3),
      t("ws-5", "Redis adapter para escala horizontal", 2, "Alta", 7, 4),
      t("ws-6", "Autenticación en WebSockets", 2, "Alta", 6, 3),
      t("ws-7", "Reconnection strategy en cliente", 2, "Alta", 6, 3),
      t("ws-8", "Estado online/offline (userconnectionstatus)", 2, "Alta", 6, 3),
      t("ws-9", "Sticky sessions sin Redis adapter", 3, "Alta", 7, 3),
      t("ws-10", "Backpressure en WebSockets", 3, "Media", 8, 3),
      t("ws-11", "Message ordering en sistemas distribuidos", 3, "Alta", 9, 4),
      t("ws-12", "At-least-once vs exactly-once delivery", 3, "Alta", 9, 4),
      t("ws-13", "Scaling a 100k conexiones concurrentes", 4, "Media", 9, 4),
    ],
  },
  {
    id: "ai-llm",
    name: "AI / LLM Engineering",
    priority: "Crítica",
    totalWeeks: 8,
    difficulty: 9,
    summary:
      "Motor de valor: OpenAI, Bedrock, Cohere, GenAI. Tool calling, MCP, agentes, RAG con Pinecone.",
    wizybotRefs: [
      "src/app/modules/ai-response/",
      "src/app/modules/ai-completion/",
      "src/app/modules/aiagents/",
      "src/app/modules/aiagentlogic/",
      "src/app/modules/aiagentmcp/",
      "src/app/modules/chatfunctions/",
      "src/app/modules/specializedrecommendation/",
    ],
    topics: [
      t("ai-1", "OpenAI API: chat completions, temperatura, tokens", 1, "Alta", 4, 4),
      t("ai-2", "System prompts + role de messages", 1, "Alta", 5, 3),
      t("ai-3", "Streaming de respuestas en Node.js", 1, "Alta", 6, 4),
      t("ai-4", "Token counting y estimación de costos", 1, "Alta", 5, 3),
      t("ai-5", "Function calling / tool calling", 2, "Alta", 7, 5),
      t("ai-6", "Model Context Protocol (MCP SDK 1.18.1)", 2, "Alta", 8, 5),
      t("ai-7", "Embeddings: qué son y cómo se generan", 2, "Alta", 6, 3),
      t("ai-8", "Pinecone: upsert, query, metadata filtering", 2, "Alta", 7, 4),
      t("ai-9", "HNSW algorithm (KNN)", 3, "Media", 8, 4),
      t("ai-10", "Chunking strategies para RAG", 3, "Alta", 7, 4),
      t("ai-11", "Re-ranking de resultados", 3, "Media", 8, 3),
      t("ai-12", "Agent loops y tool orchestration", 3, "Alta", 8, 5),
      t("ai-13", "LLM caching semántico (cachedresponse)", 3, "Alta", 8, 4),
      t("ai-14", "Evaluación de respuestas AI (evals)", 3, "Alta", 8, 4),
      t("ai-15", "Fine-tuning básico", 3, "Baja", 9, 5),
      t("ai-16", "Multi-model strategy (OpenAI vs Bedrock vs Cohere)", 4, "Alta", 8, 4),
      t("ai-17", "Cost optimization a escala (prompt caching, batching)", 4, "Alta", 8, 4),
      t("ai-18", "Latencia <2s: cómo mantenerla", 4, "Alta", 9, 4),
      t("ai-19", "Guardrails y safety en producción", 4, "Alta", 8, 3),
      t("ai-20", "Fallback strategy cuando el modelo falla", 4, "Alta", 7, 3),
      t("ai-21", "Diseñar la AI architecture para 10x usuarios", 5, "Alta", 10, 6),
      t("ai-22", "LLM observability estratégica", 5, "Alta", 8, 4),
      t("ai-23", "AI governance y respuestas no dañinas", 5, "Alta", 8, 3),
    ],
  },
  {
    id: "mongodb",
    name: "MongoDB + Mongoose",
    priority: "Alta",
    totalWeeks: 4,
    difficulty: 7,
    summary:
      "Almacenamiento flexible: conversaciones, schemas dinámicos, assistant messages. Complementa MySQL.",
    wizybotRefs: [
      "src/noSQLdatabase/schemas/",
      "src/noSQLdatabase/noSQLdbservices/",
    ],
    topics: [
      t("mg-1", "Schemas y modelos con Mongoose", 1, "Alta", 4, 3),
      t("mg-2", "CRUD básico y proyecciones", 1, "Alta", 4, 3),
      t("mg-3", "Índices simples y compuestos", 2, "Alta", 6, 3),
      t("mg-4", "Aggregation pipeline (match, group, lookup)", 2, "Alta", 7, 5),
      t("mg-5", "Populate vs $lookup", 2, "Alta", 6, 3),
      t("mg-6", "Schema design: embedded vs referenced", 2, "Alta", 7, 3),
      t("mg-7", "Change streams", 3, "Media", 8, 3),
      t("mg-8", "Transacciones multi-documento", 3, "Alta", 8, 3),
      t("mg-9", "Sharding strategy", 4, "Media", 9, 4),
    ],
  },
  {
    id: "opensearch",
    name: "OpenSearch / Elasticsearch",
    priority: "Alta",
    totalWeeks: 6,
    difficulty: 8,
    summary:
      "Búsqueda de productos, posts, leads. Coexiste con Pinecone: keyword search + vector search.",
    wizybotRefs: [
      "src/elasticsearch/indices/",
      "src/elasticsearch/esservices/",
      "queues: elasticsearchPopulate, backfillPostEmbeddings",
    ],
    topics: [
      t("os-1", "Índices, documentos y mappings", 1, "Alta", 5, 3),
      t("os-2", "Queries: match, term, range, bool", 1, "Alta", 5, 4),
      t("os-3", "Analyzers y tokenización", 1, "Alta", 6, 3),
      t("os-4", "Full-text search vs keyword search", 1, "Alta", 4, 2),
      t("os-5", "Aggregations (terms, date histogram)", 2, "Alta", 7, 4),
      t("os-6", "Index aliases + zero-downtime reindexing", 2, "Alta", 8, 4),
      t("os-7", "KNN / Vector search en OpenSearch", 2, "Alta", 8, 4),
      t("os-8", "Pagination (search_after vs from/size)", 2, "Alta", 6, 2),
      t("os-9", "Shard strategy y routing", 3, "Alta", 8, 4),
      t("os-10", "Performance tuning (refresh interval, merge policy)", 3, "Alta", 9, 4),
      t("os-11", "Hybrid search: keyword + vector", 3, "Alta", 9, 4),
      t("os-12", "Coordinación OpenSearch + Pinecone", 3, "Alta", 8, 3),
    ],
  },
  {
    id: "aws",
    name: "AWS Cloud Services",
    priority: "Alta",
    totalWeeks: 7,
    difficulty: 7,
    summary:
      "S3 (media), SES (email), CloudWatch (métricas), Bedrock (LLMs). Infraestructura cloud del producto.",
    wizybotRefs: [
      "@aws-sdk/client-s3, s3-request-presigner, s3-presigned-post",
      "@aws-sdk/client-ses",
      "@aws-sdk/client-cloudwatch",
      "@aws-sdk/client-bedrock-runtime",
    ],
    topics: [
      t("aws-1", "IAM: roles, policies, access keys", 1, "Alta", 5, 4),
      t("aws-2", "S3: buckets, objetos, presigned URLs", 1, "Alta", 4, 4),
      t("aws-3", "SES: emails transaccionales", 1, "Alta", 3, 2),
      t("aws-4", "SDK v3 para Node.js", 1, "Alta", 4, 3),
      t("aws-5", "S3 multipart upload", 2, "Alta", 6, 3),
      t("aws-6", "S3 presigned POST desde frontend", 2, "Alta", 6, 3),
      t("aws-7", "CloudWatch: custom metrics + dashboards", 2, "Alta", 6, 4),
      t("aws-8", "CloudWatch Logs: structured logging", 2, "Alta", 5, 3),
      t("aws-9", "Bedrock: invocar Claude / Llama / Titan", 2, "Alta", 6, 4),
      t("aws-10", "SES: bounce handling, DKIM, SPF", 2, "Media", 6, 3),
      t("aws-11", "CloudWatch Alarms + Auto Scaling", 3, "Alta", 7, 4),
      t("aws-12", "S3 lifecycle policies + cost optimization", 3, "Media", 6, 3),
      t("aws-13", "Bedrock: model selection latency vs cost", 3, "Alta", 8, 4),
      t("aws-14", "VPC, security groups, subnets", 3, "Alta", 8, 4),
      t("aws-15", "ElastiCache para Redis en producción", 3, "Alta", 7, 3),
    ],
  },
  {
    id: "docker",
    name: "Docker + Containerización",
    priority: "Alta",
    totalWeeks: 4,
    difficulty: 5,
    summary:
      "6 servicios en docker-compose: backend, worker, MySQL, MongoDB, Redis, OpenSearch. Multi-stage builds prod.",
    wizybotRefs: [
      "Dockerfile.dev, Dockerfile.prod",
      "docker-compose.dev.yaml (6 services)",
      "docker-compose.prod.yaml, docker-compose.single.yaml",
    ],
    topics: [
      t("dk-1", "Dockerfile básico: FROM, COPY, RUN, CMD", 1, "Alta", 3, 3),
      t("dk-2", "Docker Compose: services, networks, volumes", 1, "Alta", 4, 4),
      t("dk-3", "Environment variables en Docker", 1, "Alta", 3, 2),
      t("dk-4", "Networking entre contenedores", 1, "Alta", 4, 3),
      t("dk-5", "Multi-stage builds", 2, "Alta", 5, 3),
      t("dk-6", "Layer caching y orden de comandos", 2, "Alta", 5, 2),
      t("dk-7", "Health checks", 2, "Alta", 4, 2),
      t("dk-8", "Volumes para persistencia", 2, "Alta", 4, 2),
      t("dk-9", "Resource limits (memory, CPU)", 3, "Alta", 6, 2),
      t("dk-10", "Container security (non-root, read-only FS)", 3, "Alta", 7, 3),
      t("dk-11", "Debugging de contenedores en producción", 3, "Alta", 6, 3),
      t("dk-12", "Docker vs Kubernetes: cuándo migrar", 3, "Media", 7, 3),
    ],
  },
];

// Roadmap semanal (6 meses)
export interface Week {
  n: number;
  month: number;
  monthTitle: string;
  title: string;
  techId: string;
  output: string;
  activities: string[];
}

export const weeks: Week[] = [
  // Mes 1
  { n: 1, month: 1, monthTitle: "TypeScript + NestJS Foundation", title: "TypeScript para NestJS", techId: "nestjs",
    output: "Reescribir un DTO existente con tipos más estrictos",
    activities: ["Generics, decorators, reflect-metadata", "Utility types con DTOs de WizyBot", "Branded types, type narrowing", "Leer y entender todos los DTOs de chat/dto/"] },
  { n: 2, month: 1, monthTitle: "TypeScript + NestJS Foundation", title: "NestJS DI Profundo", techId: "nestjs",
    output: "Diagrama de dependencias de los 10 módulos más importantes",
    activities: ["Módulos, providers, exports, imports", "Custom providers (useFactory, useClass, useValue)", "Circular deps y forwardRef()", "Leer app.module.ts completo"] },
  { n: 3, month: 1, monthTitle: "TypeScript + NestJS Foundation", title: "Guards, Pipes, Interceptors", techId: "nestjs",
    output: "PR con un interceptor de observabilidad real",
    activities: ["ValidationPipe con class-validator", "Guards de autenticación (authorization/)", "Interceptors + decorator de CloudWatch", "Exception filters custom"] },
  { n: 4, month: 1, monthTitle: "TypeScript + NestJS Foundation", title: "TypeORM Entities + Relaciones", techId: "typeorm",
    output: "Documentar relaciones de las 5 entidades más importantes",
    activities: ["Entidades básicas de 5 módulos distintos", "@OneToMany, @ManyToOne, @JoinColumn", "@ManyToMany con tabla intermedia", "Queries con relations: [...]"] },
  // Mes 2
  { n: 5, month: 2, monthTitle: "Databases + Queue Mastery", title: "TypeORM Avanzado", techId: "typeorm",
    output: "Reporte de N+1 queries encontrados con solución",
    activities: ["Query Builder — replicar la query más compleja", "Transacciones y rollback", "Crear una migración de ejemplo", "EXPLAIN de una query real"] },
  { n: 6, month: 2, monthTitle: "Databases + Queue Mastery", title: "Redis Multi-Rol", techId: "redis",
    output: "Cache utility reutilizable con TTL automático",
    activities: ["CLI: SET, GET, HSET, LPUSH, ZADD, TTL", "Cache-aside pattern con @InjectRedis", "Session store con connect-redis", "Pub/Sub para Socket.io broadcast"] },
  { n: 7, month: 2, monthTitle: "Databases + Queue Mastery", title: "Docker Profundo", techId: "docker",
    output: "Guía 'cómo levantar WizyBot en dev' para nuevo engineer",
    activities: ["Comparar los 4 Dockerfiles del proyecto", "Multi-stage de Dockerfile.prod", "docker-compose.dev completo", "Levantar WizyBot completo local"] },
  { n: 8, month: 2, monthTitle: "Databases + Queue Mastery", title: "BullMQ Core", techId: "bullmq",
    output: "Documentación de las 5 colas más críticas con retry strategy",
    activities: ["Queues, jobs, workers, processors", "Identificar las 5 colas más críticas", "Retry con backoff exponencial en shopSync", "removeOnComplete y memoria Redis"] },
  // Mes 3
  { n: 9, month: 3, monthTitle: "BullMQ Avanzado + Socket.io + AI", title: "BullMQ Avanzado", techId: "bullmq",
    output: "Dashboard de monitoring de colas en local",
    activities: ["Delayed jobs (followUps queue)", "Job priorities: ¿usa WizyBot?", "Concurrency por cola", "Graceful shutdown", "Bull Board para 48 colas"] },
  { n: 10, month: 3, monthTitle: "BullMQ Avanzado + Socket.io + AI", title: "BullMQ Flow Producers", techId: "bullmq",
    output: "Flow producer nuevo con 3 steps encadenados",
    activities: ["Estudiar merchantCheatSheetFlow", "Diseñar flow de onboarding merchant", "Dead letter queues", "Implementar el flow completo"] },
  { n: 11, month: 3, monthTitle: "BullMQ Avanzado + Socket.io + AI", title: "Socket.io Real-Time", techId: "socketio",
    output: "Indicador de 'typing...' en el chat",
    activities: ["Rooms y namespaces (broadcast-to-client)", "Authentication en WebSockets", "Redis adapter pub/sub distribuido", "userconnectionstatus online/offline"] },
  { n: 12, month: 3, monthTitle: "BullMQ Avanzado + Socket.io + AI", title: "OpenAI + LLM Basics", techId: "ai-llm",
    output: "Estimación real de costos de AI en WizyBot por mes",
    activities: ["Chat completions, temperatura, tokens", "Streaming con OpenAI (ai-response/)", "Leer prompts actuales del proyecto", "Token counting y estimación de costos"] },
  // Mes 4
  { n: 13, month: 4, monthTitle: "AI Avanzado + MongoDB + AWS", title: "Tool Calling + MCP", techId: "ai-llm",
    output: "Tool calling integrado con el catálogo de productos",
    activities: ["Function calling (chatfunctions/)", "Model Context Protocol (aiagentmcp/)", "Agentes autónomos (aiagents/ + aiagentlogic/)", "Función AI para buscar productos"] },
  { n: 14, month: 4, monthTitle: "AI Avanzado + MongoDB + AWS", title: "RAG Implementation", techId: "ai-llm",
    output: "Búsqueda semántica funcional sobre productos",
    activities: ["Embeddings: generación y almacenamiento", "Pinecone: upsert, query, metadata filtering", "Chunking strategies (chunk/)", "cachedresponse/ semántico"] },
  { n: 15, month: 4, monthTitle: "AI Avanzado + MongoDB + AWS", title: "MongoDB Avanzado", techId: "mongodb",
    output: "Query optimizada con aggregation pipeline documentada",
    activities: ["3 ejemplos reales de aggregation en el proyecto", "Indexing strategy en MongoDB", "Schema design para conversaciones", "Change streams"] },
  { n: 16, month: 4, monthTitle: "AI Avanzado + MongoDB + AWS", title: "AWS Services", techId: "aws",
    output: "Flow completo de upload de imagen de chat a S3",
    activities: ["S3 presigned URLs, multipart upload", "S3 presigned POST desde frontend", "SES emails, DKIM, bounce handling", "CloudWatch custom metrics", "Bedrock: invocar Claude"] },
  // Mes 5
  { n: 17, month: 5, monthTitle: "Escalabilidad + Performance", title: "MySQL Performance", techId: "typeorm",
    output: "Reporte de performance con queries optimizadas y evidencia",
    activities: ["EXPLAIN ANALYZE en las queries más pesadas", "Índices compuestos", "Encontrar la query más lenta", "Connection pool tuning"] },
  { n: 18, month: 5, monthTitle: "Escalabilidad + Performance", title: "Node.js + Event Loop", techId: "nestjs",
    output: "Hot path identificado con solución propuesta",
    activities: ["Event loop internals", "setImmediate vs nextTick vs setTimeout", "Blocking code en workers de BullMQ", "Pyroscope perfilando el backend"] },
  { n: 19, month: 5, monthTitle: "Escalabilidad + Performance", title: "OpenSearch Avanzado", techId: "opensearch",
    output: "Mapping optimizado con documentación de trade-offs",
    activities: ["Mappings y analyzers en el proyecto", "KNN search (productImageEmbedding)", "Aggregations: stats de búsqueda", "Reindexing sin downtime"] },
  { n: 20, month: 5, monthTitle: "Escalabilidad + Performance", title: "Observabilidad Completa", techId: "aws",
    output: "Definición de SLOs para el módulo de chat",
    activities: ["Logs estructurados JSON", "CloudWatch métricas actuales del proyecto", "Alertas: cuándo alertar en WizyBot", "Distributed tracing", "SLA/SLO/SLI"] },
  // Mes 6
  { n: 21, month: 6, monthTitle: "Arquitectura + Nivel Senior", title: "Patterns Distribuidos", techId: "nestjs",
    output: "Integración externa resiliente con circuit breaker",
    activities: ["Circuit breaker para Shopify API", "Retry with jitter", "Bulkhead pattern: aislar fallas por tenant", "Idempotencia de webhooks", "Circuit breaker en Meta"] },
  { n: 22, month: 6, monthTitle: "Arquitectura + Nivel Senior", title: "Security Audit", techId: "nestjs",
    output: "Security checklist con 5+ mejoras propuestas",
    activities: ["OWASP Top 10 aplicado a WizyBot", "Injection attacks en endpoints", "Auth audit: sesiones, cookies, CSRF", "Gestión de secretos", "Rate limiting"] },
  { n: 23, month: 6, monthTitle: "Arquitectura + Nivel Senior", title: "System Design Básico", techId: "nestjs",
    output: "Documento de arquitectura target para WizyBot",
    activities: ["Diseñar WizyBot desde cero en pizarra", "Cuándo dividir: chat-service vs ai-service", "Data flow entre servicios", "Trade-offs consistency vs availability"] },
  { n: 24, month: 6, monthTitle: "Arquitectura + Nivel Senior", title: "AI Architecture Senior", techId: "ai-llm",
    output: "Propuesta de multi-model routing por caso de uso",
    activities: ["Multi-model strategy", "Cost optimization a escala", "Latencia <2s: cómo lograrla", "Guardrails y fallback"] },
  { n: 25, month: 6, monthTitle: "Arquitectura + Nivel Senior", title: "Contribución Real", techId: "nestjs",
    output: "PR real merged en un módulo de WizyBot",
    activities: ["Elegir un módulo pequeño", "Identificar mejora concreta", "Diseñar solución", "Implementar + tests + PR"] },
  { n: 26, month: 6, monthTitle: "Arquitectura + Nivel Senior", title: "Consolidación + Portfolio", techId: "nestjs",
    output: "Portfolio técnico con 6 meses de outputs semanales",
    activities: ["Revisar los 25 outputs anteriores", "Escribir 3 posts técnicos", "Preparar system design de WizyBot para entrevistas", "Planear los próximos 6 meses"] },
];

// Quick wins de alto impacto
export interface QuickWin {
  id: string;
  title: string;
  days: number;
  impact: number; // 1-10
  techId: string;
  refs: string;
}

export const quickWins: QuickWin[] = [
  { id: "qw-1", title: "NestJS: entender inyección de dependencias", days: 2, impact: 10, techId: "nestjs", refs: "Cualquier .module.ts" },
  { id: "qw-2", title: "TypeORM: leer y entender 5 entidades", days: 2, impact: 9, techId: "typeorm", refs: "modules/*/entities/" },
  { id: "qw-3", title: "BullMQ: entender producer y consumer", days: 3, impact: 10, techId: "bullmq", refs: "Cualquier *.processor.ts" },
  { id: "qw-4", title: "Redis: usar Cache Manager para cachear una query", days: 2, impact: 8, techId: "redis", refs: "redis.module.ts" },
  { id: "qw-5", title: "Socket.io: entender un handler de eventos", days: 2, impact: 9, techId: "socketio", refs: "chat/chat.gateway.ts" },
  { id: "qw-6", title: "Docker: levantar el proyecto completo local", days: 1, impact: 10, techId: "docker", refs: "docker-compose.dev.yaml" },
  { id: "qw-7", title: "OpenAI: hacer una call básica de chat", days: 1, impact: 8, techId: "ai-llm", refs: "ai-response/" },
  { id: "qw-8", title: "Docker: multi-stage builds y layer caching", days: 4, impact: 7, techId: "docker", refs: "Dockerfile.prod" },
  { id: "qw-9", title: "MySQL: EXPLAIN ANALYZE e índices compuestos", days: 5, impact: 9, techId: "typeorm", refs: "Entities con relaciones" },
  { id: "qw-10", title: "BullMQ: Flow producers (merchantCheatSheetFlow)", days: 3, impact: 8, techId: "bullmq", refs: "merchantCheatSheetFlow" },
  { id: "qw-11", title: "RAG: chunking + embeddings + retrieval básico", days: 5, impact: 9, techId: "ai-llm", refs: "chunk/, cachedresponse/" },
  { id: "qw-12", title: "AWS S3: presigned URLs para uploads directos", days: 3, impact: 8, techId: "aws", refs: "multipartupload/" },
  { id: "qw-13", title: "Idempotencia de webhooks (Shopify pattern)", days: 4, impact: 9, techId: "nestjs", refs: "shopify/webhooks/" },
  { id: "qw-14", title: "NestJS: Custom decorators y metadata", days: 3, impact: 7, techId: "nestjs", refs: "Decorators de CloudWatch" },
  { id: "qw-15", title: "MongoDB: Aggregation pipeline", days: 4, impact: 7, techId: "mongodb", refs: "noSQLdatabase/noSQLdbservices/" },
  { id: "qw-16", title: "Node.js: Event loop y no bloquearlo", days: 3, impact: 9, techId: "nestjs", refs: "Workers de BullMQ" },
  { id: "qw-17", title: "LLM: Streaming de respuestas en tiempo real", days: 2, impact: 8, techId: "ai-llm", refs: "ai-response/ service" },
  { id: "qw-18", title: "Circuit breaker para APIs externas", days: 4, impact: 9, techId: "nestjs", refs: "Integraciones externas" },
  { id: "qw-19", title: "CloudWatch: métricas custom de negocio", days: 2, impact: 7, techId: "aws", refs: "cloudwatch.service.ts" },
  { id: "qw-20", title: "MCP SDK: Model Context Protocol", days: 4, impact: 9, techId: "ai-llm", refs: "aiagentmcp/ module" },
];

export const totalTopics = technologies.reduce((s, tech) => s + tech.topics.length, 0);
