# Marvel Challenge — React + Vite (TypeScript)

Aplicación para explorar personajes y cómics con React 19 + Vite 7 + TypeScript 5, React Router 7, TanStack React Query 5, Styled-Components 6 y Context API.
Incluye tests con Jest + Testing Library.

<p align="left"> <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=222" /> <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=fff" /> <img alt="TS" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=fff" /> <img alt="React Router" src="https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=fff" /> <img alt="React Query" src="https://img.shields.io/badge/TanStack%20Query-5-FF4154?logo=reactquery&logoColor=fff" /> <img alt="Styled Components" src="https://img.shields.io/badge/styled--components-6-DB7093?logo=styledcomponents&logoColor=fff" /> <img alt="Jest" src="https://img.shields.io/badge/Jest-30-C21325?logo=jest&logoColor=fff" /> <img alt="Testing Library" src="https://img.shields.io/badge/Testing%20Library-16-E33332?logo=testinglibrary&logoColor=fff" /></p>

Demo

![Demo – Marvel Challenge](https://i.postimg.cc/YCTmYJGs/Captura-de-pantalla-2025-08-28-a-la-s-04-36-32.png)

![Demo – Marvel Challenge](https://i.postimg.cc/xdSjRg65/Captura-de-pantalla-2025-08-28-a-la-s-04-26-09.png)


## Características

* Listado de personajes con búsqueda por nombre.
* Favoritos con Context API y persistencia en localStorage.
* Vista de detalle con descripción e historietas (limitadas a 20).
* Responsive y con consideraciones de accesibilidad (roles, aria-*, foco).
* Arquitectura modular.
* Linting y formateo con ESLint + Prettier.
* Testing de componentes y flujos con Jest + Testing Library.

## Arquitectura

```
src/
└─ app/
   ├─ assets/
   │  ├─ icons/
   │  └─ img/
   ├─ components/          # UI reutilizable (Button, CharacterCard, Header, Hero, Loader, etc.)
   ├─ context/
   │  └─ favorites/        # Estado global de favoritos (Context + hooks)
   ├─ pages/               # Vistas (Characters, CharacterDetail, Favorites, NotFound404)
   ├─ routes/              # Enrutado
   └─ services/            # Llamadas y queries (axios + React Query)


```

## Decisiones clave

* React Query para caché y estados de carga/error.
* Context API solo para negocio compartido (favoritos).
* Styled-Components para estilos encapsulados y tipados.

## 🛠️ Stack y versiones


| Paquete                         | Versión            |
| ------------------------------- | ------------------ |
| react / react-dom               | ^19.1.1            |
| react-router-dom                | ^7.8.1             |
| @tanstack/react-query           | ^5.85.5            |
| styled-components               | ^6.1.19            |
| axios / lodash                  | ^1.11.0 / ^4.17.21 |
| vite                            | ^7.1.2             |
| typescript                      | \~5.8.3            |
| eslint + eslint-config-prettier | ^9.33.0 / ^10.1.8  |
| prettier                        | ^3.6.2             |

## Testing

| Paquete                       | Versión           |
| ----------------------------- | ----------------- |
| jest / jest-environment-jsdom | ^30.1.1 / ^30.1.1 |
| @testing-library/react        | ^16.3.0           |
| @testing-library/user-event   | ^14.6.1           |
| @testing-library/jest-dom     | ^6.8.0            |
| ts-jest                       | ^29.4.1           |

2) Instalación

# Frontend
npm install
cd ..
npm run dev

Frontend: http://localhost:5173

## Tests
npm test

## Accesibilidad

* Roles y aria-label apropiados.
* Controles con aria-pressed cuando corresponde.
* Imágenes con texto alternativo significativo.
* Navegación por teclado y foco visible.