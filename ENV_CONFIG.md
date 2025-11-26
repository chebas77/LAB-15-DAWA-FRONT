# 🌐 Configuración de Variables de Entorno

Este proyecto utiliza variables de entorno para configurar la URL del backend.

## 📝 Configuración

1. **Crea el archivo `.env.local`** (ya existe en este proyecto)
2. **Configura la variable de entorno:**

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🚀 Despliegue

### **Desarrollo Local**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### **Producción**
Reemplaza con la URL de tu backend desplegado:
```bash
NEXT_PUBLIC_API_URL=https://tu-backend-desplegado.com/api
```

## 📋 Ejemplos de URLs de Backend

### Render
```bash
NEXT_PUBLIC_API_URL=https://mi-backend.onrender.com/api
```

### Railway
```bash
NEXT_PUBLIC_API_URL=https://mi-backend.up.railway.app/api
```

### Heroku
```bash
NEXT_PUBLIC_API_URL=https://mi-backend.herokuapp.com/api
```

### Vercel (Serverless Functions)
```bash
NEXT_PUBLIC_API_URL=https://mi-proyecto.vercel.app/api
```

### Azure
```bash
NEXT_PUBLIC_API_URL=https://mi-backend.azurewebsites.net/api
```

### AWS
```bash
NEXT_PUBLIC_API_URL=https://mi-backend.us-east-1.elasticbeanstalk.com/api
```

## ⚙️ Configuración en Plataformas de Despliegue

### **Vercel**
1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega: `NEXT_PUBLIC_API_URL` con el valor de tu backend

### **Netlify**
1. Ve a Site settings → Build & deploy → Environment
2. Agrega: `NEXT_PUBLIC_API_URL` con el valor de tu backend

### **Railway**
1. Ve a tu proyecto
2. Variables tab
3. Agrega: `NEXT_PUBLIC_API_URL` con el valor de tu backend

## 🔒 Seguridad

- El prefijo `NEXT_PUBLIC_` hace que la variable esté disponible en el cliente
- **NO incluyas** información sensible en estas variables (tokens, secrets, etc.)
- El archivo `.env.local` está en `.gitignore` y **NO se sube a Git**
- Usa `.env.example` como plantilla para otros desarrolladores

## 🧪 Testing

Para probar con diferentes backends:

```bash
# Backend local
NEXT_PUBLIC_API_URL=http://localhost:3001/api npm run dev

# Backend de staging
NEXT_PUBLIC_API_URL=https://staging-api.com/api npm run dev

# Backend de producción
NEXT_PUBLIC_API_URL=https://production-api.com/api npm run build
```

## ✅ Verificación

El código usa esta variable así:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
```

Si la variable no está configurada, usa `http://localhost:3001/api` por defecto.
