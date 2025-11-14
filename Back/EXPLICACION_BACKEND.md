# 📚 Explicación del Backend - Donaciones Seguras

## 🎯 VISIÓN GENERAL

El backend es una **API REST** construida con **Node.js** y **Express** que se comunica con una base de datos **PostgreSQL**. Sigue una arquitectura en **3 capas** (Routes → Controllers → Services → Database).

### Estructura del Proyecto

```
Back/
├── index.js              # Punto de entrada, configura Express y registra rutas
├── db.js                 # Configuración de conexión a PostgreSQL
├── routes/               # Define las rutas HTTP (endpoints)
├── controllers/          # Maneja las peticiones HTTP (req/res)
├── services/             # Lógica de negocio y consultas a la BD
└── models/               # Modelos de datos (solo usuario.model.js actualmente)
```

---

## 📋 PARTE 1: ARQUITECTURA GENERAL

### Flujo de una Petición HTTP

```
Cliente (Frontend)
    ↓
HTTP Request (GET/POST/PUT/DELETE)
    ↓
index.js (Express App)
    ↓
routes/ (Define qué función llamar)
    ↓
controllers/ (Valida datos, maneja req/res)
    ↓
services/ (Lógica de negocio, consultas SQL)
    ↓
db.js (Pool de conexiones PostgreSQL)
    ↓
Base de Datos PostgreSQL
    ↓
Respuesta (JSON) → Cliente
```

### Tecnologías Principales

- **Express.js**: Framework web para Node.js
- **PostgreSQL (pg)**: Cliente para base de datos
- **bcryptjs**: Encriptación de contraseñas
- **CORS**: Permite peticiones desde el frontend
- **dotenv**: Variables de entorno

---

## 🔍 PARTE 2: ARCHIVOS PRINCIPALES EN DETALLE

### 1. `index.js` - El Corazón del Backend

**¿Qué hace?**
- Crea la aplicación Express
- Configura middleware (CORS, JSON parser)
- Registra todas las rutas
- Inicia el servidor

**Código clave:**

```javascript
const app = express();  // Crea la app Express
app.use(cors());        // Permite peticiones desde otros dominios
app.use(express.json()); // Parsea JSON en las peticiones

// Registra rutas
app.use("/api/usuarios", usuarioRouter);
app.use("/api", authRouter);
// ... más rutas

app.listen(port, ...);  // Inicia el servidor en el puerto 3000
```

**Rutas básicas:**
- `GET /` → Mensaje de bienvenida
- `GET /ping` → Prueba conexión a la BD

---

### 2. `db.js` - Conexión a la Base de Datos

**¿Qué hace?**
- Crea un "pool" de conexiones a PostgreSQL
- Configura la conexión usando variables de entorno
- Exporta el pool para usar en services

**Conceptos importantes:**

**Pool de conexiones**: En lugar de abrir/cerrar conexiones constantemente, mantiene un grupo de conexiones reutilizables. Esto es más eficiente.

```javascript
const pool = new Pool({
    user: process.env.POSTGRES_USER,      // Desde .env
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    max: 20,  // Máximo 20 conexiones simultáneas
    min: 0    // Mínimo 0 conexiones
});
```

**Uso en services:**
```javascript
const result = await pool.query("SELECT * FROM usuarios");
// pool.query() ejecuta SQL y devuelve una promesa
```

---

### 3. `routes/` - Definición de Endpoints

**¿Qué hace?**
- Define las rutas HTTP (URLs) de la API
- Asocia cada ruta con su controlador correspondiente

**Ejemplo: `routes/auth.router.js`**

```javascript
router.post("/login", login);  // POST /api/login → función login()
router.get("/user", getCurrentUser);  // GET /api/user → función getCurrentUser()
```

**Endpoints disponibles:**
- `/api/login` (POST) - Iniciar sesión
- `/api/campaigns` (GET) - Listar campañas
- `/api/productos` (POST) - Crear producto
- `/api/pedidos` (POST) - Crear pedido
- etc.

---

### 4. `controllers/` - Manejo de Peticiones HTTP

**¿Qué hace?**
- Recibe la petición HTTP (req)
- Valida los datos recibidos
- Llama al servicio correspondiente
- Devuelve la respuesta HTTP (res)

**Estructura típica:**

```javascript
export async function login(req, res) {
  try {
    // 1. Validar datos
    const { emailOrNombre, contraseña } = req.body;
    if (!emailOrNombre || !contraseña) {
      return res.status(400).json({ error: "Campos requeridos" });
    }

    // 2. Llamar al servicio
    const usuario = await loginUsuario(emailOrNombre, contraseña);

    // 3. Responder
    if (!usuario) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({ success: true, usuario });
  } catch (err) {
    res.status(500).json({ error: "Error interno" });
  }
}
```

**Códigos HTTP comunes:**
- `200` - OK (éxito)
- `201` - Created (recurso creado)
- `400` - Bad Request (datos inválidos)
- `401` - Unauthorized (no autenticado)
- `404` - Not Found (recurso no existe)
- `500` - Internal Server Error (error del servidor)

---

### 5. `services/` - Lógica de Negocio y Base de Datos

**¿Qué hace?**
- Contiene la lógica de negocio
- Ejecuta consultas SQL a la base de datos
- No conoce nada de HTTP (req/res)

**Ejemplo: `services/usuarioservice.js`**

```javascript
const loginUsuario = async (emailOrNombre, contraseña) => {
    // 1. Buscar usuario en BD
    const result = await pool.query(`
        SELECT * FROM usuarios 
        WHERE email = $1 OR nombre = $1`, 
        [emailOrNombre]);

    if (result.rows.length === 0) {
        return null; // No encontrado
    }

    // 2. Verificar contraseña
    const usuario = result.rows[0];
    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    
    if (!contraseñaValida) {
        return null; // Contraseña incorrecta
    }

    // 3. Devolver usuario (sin contraseña)
    delete usuario.contraseña;
    return usuario;
};
```

**Conceptos importantes:**

**Prepared Statements (`$1, $2`)**: Previene inyección SQL. Los valores se pasan como parámetros separados.

```javascript
// ✅ SEGURO
pool.query("SELECT * FROM usuarios WHERE id = $1", [userId]);

// ❌ PELIGROSO (inyección SQL)
pool.query(`SELECT * FROM usuarios WHERE id = ${userId}`);
```

**bcrypt**: Encripta contraseñas de forma irreversible.

```javascript
// Al crear usuario
const hashedPassword = await bcrypt.hash(contraseña, 10);

// Al verificar login
const isValid = await bcrypt.compare(contraseña, hashedPassword);
```

---

## 🗂️ MÓDULOS DEL SISTEMA

### 1. **Autenticación** (`auth`)
- Login de usuarios
- Validación de credenciales
- Cambio de contraseña

### 2. **Usuarios** (`usuario`)
- CRUD de usuarios
- Registro de nuevos usuarios

### 3. **Campañas** (`campaign`)
- Listar campañas
- Crear campañas
- Obtener campaña por ID

### 4. **Productos** (`producto`)
- Listar productos de una campaña
- Crear productos
- Editar productos
- Marcar como entregado
- Obtener tipos de producto

### 5. **Pedidos** (`pedido`)
- Crear pedido (con código de 6 dígitos)
- Buscar pedido por código
- Obtener productos de un pedido
- Marcar pedido como entregado
- Listar pedidos de un usuario

### 6. **Destinos** (`destino`)
- CRUD de puntos de recolección
- Listar todos los destinos

### 7. **Afectados** (`afectado`)
- Registro de usuarios afectados

---

## 🔐 SEGURIDAD

### 1. **Contraseñas**
- Se hashean con bcrypt antes de guardar
- Nunca se devuelven en respuestas JSON

### 2. **Prepared Statements**
- Todas las consultas SQL usan parámetros (`$1, $2`)
- Previene inyección SQL

### 3. **CORS**
- Configurado para permitir peticiones desde el frontend
- Evita ataques de origen cruzado

### 4. **Validación**
- Los controllers validan datos antes de procesarlos
- Respuestas de error claras

---

## 📊 FLUJO COMPLETO: Ejemplo de Login

```
1. Frontend envía: POST /api/login
   Body: { emailOrNombre: "user@example.com", contraseña: "123456" }

2. index.js recibe la petición
   → Express la dirige a authRouter

3. routes/auth.router.js
   → Detecta POST /login
   → Llama a login() del controller

4. controllers/auth.controller.js
   → Valida que emailOrNombre y contraseña existan
   → Llama a loginUsuario() del service

5. services/usuarioservice.js
   → Busca usuario en BD: SELECT * FROM usuarios WHERE email = $1
   → Compara contraseña con bcrypt.compare()
   → Devuelve usuario (sin contraseña)

6. controllers/auth.controller.js
   → Recibe el usuario
   → Responde con JSON: { success: true, usuario: {...} }

7. Frontend recibe la respuesta
   → Guarda usuario en localStorage
   → Redirige al usuario
```

---

## 🛠️ COMANDOS ÚTILES

```bash
# Iniciar el servidor
npm start
# o
node index.js

# El servidor corre en: http://localhost:3000
```

---

## 📝 NOTAS IMPORTANTES

1. **Variables de entorno**: Se usan en `db.js` para la conexión. Deben estar en un archivo `.env` (no incluido en git por seguridad).

2. **Manejo de errores**: Todos los controllers usan try/catch para capturar errores y responder apropiadamente.

3. **Transacciones**: Algunas operaciones (como crear pedido) usan transacciones SQL para asegurar consistencia.

4. **Pool de conexiones**: Se reutiliza en todos los services, no se crea una nueva conexión cada vez.

---

## 🎓 CONCEPTOS CLAVE PARA ENTENDER

- **Middleware**: Funciones que se ejecutan antes de llegar a las rutas (CORS, JSON parser)
- **Async/Await**: Permite trabajar con promesas de forma síncrona
- **REST API**: Arquitectura donde cada URL representa un recurso
- **CRUD**: Create, Read, Update, Delete (operaciones básicas)
- **ORM vs SQL directo**: Este proyecto usa SQL directo (más control, más código)

---

¿Quieres que profundice en algún módulo específico o concepto?

