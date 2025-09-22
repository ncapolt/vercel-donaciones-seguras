# API de Login - Donaciones Seguras

## Descripción
Esta documentación explica cómo usar la funcionalidad de login implementada en el sistema de donaciones seguras.

## Endpoints

### POST /api/login
Autentica un usuario en el sistema.

**URL:** `http://localhost:3000/api/login`

**Método:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "mailOrNombre": "usuario@ejemplo.com",
  "contraseña": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "mail": "usuario@ejemplo.com",
    "localidad": "Buenos Aires",
    "provincia": "CABA",
    "tipo_usuario_id": 1
  }
}
```

**Respuesta de error (400/401/500):**
```json
{
  "error": "Mensaje de error descriptivo"
}
```

## Códigos de estado HTTP

- **200**: Login exitoso
- **400**: Datos faltantes (mailOrNombre o contraseña)
- **401**: Credenciales inválidas
- **500**: Error interno del servidor

## Funcionalidades implementadas

### Backend
1. **Servicio de usuarios** (`Back/services/usuarioservice.js`):
   - `loginUsuario(mailOrNombre, contraseña)`: Busca usuario por email o nombre y contraseña
   - `createUsuario(...)`: Crea un nuevo usuario (corregido para usar tabla 'usuarios')

2. **Controlador de autenticación** (`Back/controllers/auth.controller.js`):
   - `login(req, res)`: Maneja la lógica de autenticación
   - Validación de datos de entrada
   - Manejo de errores

3. **Rutas de autenticación** (`Back/routes/auth.router.js`):
   - `POST /api/login`: Endpoint para autenticación

### Frontend
1. **Componente Login** (`Front/src/Pages/Login.jsx`):
   - Formulario de login con validación
   - Integración con la API
   - Manejo de estados de carga y errores
   - Redirección según tipo de usuario

2. **Estilos** (`Front/src/Pages/Login.css`):
   - Diseño responsive
   - Tema consistente con la aplicación
   - Efectos visuales modernos

## Uso desde el frontend

### Navegación
Para acceder al login, navega a: `http://localhost:3000/login`

### Integración con otros componentes
El componente Login guarda la información del usuario en `localStorage`:
- `usuario`: Objeto con datos del usuario
- `isLoggedIn`: Flag booleano para verificar autenticación

### Redirección automática
- Usuarios con `tipo_usuario_id = 1`: Redirigidos a `/homeaf`
- Otros usuarios: Redirigidos a `/`

## Base de datos

### Tabla usuarios
La funcionalidad asume la siguiente estructura de tabla:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  apellido VARCHAR(255),
  mail VARCHAR(255) UNIQUE NOT NULL,
  localidad VARCHAR(255),
  provincia VARCHAR(255),
  contraseña VARCHAR(255) NOT NULL,
  tipo_usuario_id INTEGER,
  fecha_registro TIMESTAMP DEFAULT NOW()
);
```

## Próximos pasos recomendados

1. **Implementar JWT tokens** para autenticación más segura
2. **Encriptar contraseñas** con bcrypt antes de guardarlas
3. **Agregar validación de email** en el frontend
4. **Implementar recuperación de contraseña**
5. **Agregar middleware de autenticación** para proteger rutas
6. **Implementar logout** y limpiar localStorage

## Testing

Para probar la funcionalidad:

1. Asegúrate de que el servidor backend esté corriendo en `http://localhost:3000`
2. Asegúrate de que el frontend esté corriendo en `http://localhost:5173`
3. Navega a `http://localhost:5173/login`
4. Ingresa credenciales válidas de un usuario en la base de datos
5. Verifica la redirección según el tipo de usuario

