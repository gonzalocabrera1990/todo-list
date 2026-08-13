# TODO App - Frontend

<p align="center">

Aplicación web desarrollada con **React + Vite** para la gestión colaborativa de tareas.

</p>

---

## 📖 Descripción

TODO App es una aplicación orientada a la administración de tareas personales y colaborativas.

Cada usuario puede autenticarse dentro de la plataforma, crear tareas individuales o administrar grupos de trabajo (listas de tareas) donde es posible incorporar nuevos integrantes y asignar responsabilidades específicas a cada miembro.

Este repositorio contiene únicamente el **Frontend** de la aplicación.

> El Backend se encuentra en un repositorio independiente y es un requisito indispensable para ejecutar correctamente el proyecto.

---

# 🚀 Funcionalidades

* 🔐 Autenticación de usuarios

  * Inicio de sesión
  * Registro
  * Manejo de sesión

* ✅ Gestión de tareas

  * Crear tareas
  * Editar tareas
  * Eliminar tareas
  * Marcar tareas como completadas

* 👥 Gestión de grupos

  * Crear grupos de trabajo
  * Buscar usuarios
  * Agregar integrantes
  * Asignar tareas a cada integrante

* 📋 Organización

  * Listas de tareas
  * Administración de responsables
  * Estado de las tareas

---

# 🛠 Tecnologías utilizadas

* React
* Vite
* JavaScript / TypeScript
* React Router
* CSS
* Redux

---

# 📁 Repositorios

Frontend (este proyecto)

```bash
git clone https://github.com/gonzalocabrera1990/todo-list.git
```

Backend

```bash
git clone https://github.com/gonzalocabrera1990/todo-list-backend.git
```

---

# ⚙ Requisitos

Antes de ejecutar el proyecto es necesario tener instalado:

* Node.js 18.20.8
* npm (incluido con Node.js)
* Git

Si utilizas nvm:

```bash
nvm use
```

El proyecto incluye un archivo `.nvmrc` con la versión recomendada de Node.js.

Además:

* Clonar y ejecutar el repositorio del Backend.
* Configurar las variables de entorno del Backend.
* Verificar que la API esté funcionando antes de iniciar el Frontend.

---

# 📥 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/gonzalocabrera1990/todo-list.git
```

## 2. Ingresar al proyecto

```bash
cd todo-list
```

## 3. Instalar dependencias

```bash
npm install
```

---

# ▶ Ejecutar el proyecto

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

Vite mostrará una salida similar a:

```text
Local: http://localhost:5173
```

Abrir esa URL en el navegador.

---

# 📦 Build para producción

```bash
npm run build
```

---

# 👀 Vista previa del build

```bash
npm run preview
```

---

# 🧹 Linter

```bash
npm run lint
```

---

# 📜 Scripts disponibles

| Script            | Descripción                        |
| ----------------- | ---------------------------------- |
| `npm install`     | Instala las dependencias           |
| `npm run dev`     | Inicia el servidor de desarrollo   |
| `npm run build`   | Genera la versión de producción    |
| `npm run preview` | Ejecuta una vista previa del build |
| `npm run lint`    | Ejecuta el linter                  |

---


# 🔄 Flujo de ejecución

```text
Usuario
      │
      ▼
Frontend (React + Vite)
      │
      ▼
API REST (Backend)
      │
      ▼
Base de Datos
```

---

# 🤝 Dependencia con el Backend

Este proyecto consume una API REST desarrollada en un repositorio independiente.

Para que el Frontend funcione correctamente es necesario:

1. Clonar el Backend.
2. Instalar sus dependencias.
3. Configurar sus variables de entorno.
4. Iniciar el servidor del Backend.
5. Ejecutar posteriormente este proyecto.

---

# 👨‍💻 Autor

Desarrollado como proyecto Full Stack con una arquitectura de repositorios separados (Frontend y Backend), aplicando buenas prácticas de desarrollo, componentes reutilizables y consumo de APIs REST.
