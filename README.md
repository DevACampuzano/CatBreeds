# CatBreeds App 🐱

<p align="center">
    <img src="./android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png" alt="App Screenshot or Logo" width="100px" />
    <p align="center">Explora el fascinante mundo de las razas felinas</p>
</p>

[![React Native](https://img.shields.io/badge/React%20Native-v0.80.0-blue.svg?logo=react)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0.4-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tanstack Query](https://img.shields.io/badge/Tanstack_Query-v5.80.7-3e9b0d.svg?logo=reactquery&logoColor=3e9b0d)](https://tanstack.com/query/latest)
[![React Navigation](https://img.shields.io/badge/React_Navigation-v7-af92ff.svg?logo=react&logoColor=af92ff)](https://reactnavigation.org/)
[![React Navite Reanimated](https://img.shields.io/badge/React_Navite_Reanimated-v3.18.0-001a72.svg?logo=react&logoColor=001a72)](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
[![Axios](https://img.shields.io/badge/Axios-v1.10.0-5a2ae4.svg?logo=Axios&logoColor=5a2ae4)](https://axios-http.com/es/docs/intro)
[![Node](https://img.shields.io/badge/node-v22.15.0-fff?logo=nodedotjs)](https://bun.sh/)
[![Bun](https://img.shields.io/badge/Bun-v1.2.12+-000?logo=bun&logoColor=fff)](https://bun.sh/)
[![npm](https://img.shields.io/badge/npm-v11.4.2-CB3837?logo=npm&logoColor=CB3837)](https://www.npmjs.com/)
[![Yarn](https://img.shields.io/badge/Yarn-v1.22.22-2C8EBB?logo=yarn&logoColor=2C8EBB)](https://yarnpkg.com/)
[![React Native Vector Icons](https://img.shields.io/badge/React_Native_vector_Icons-v12.0.0-1.svg)](https://github.com/oblador/react-native-vector-icons/tree/master)
[![TheCatAPI](https://img.shields.io/badge/API-TheCatAPI-orange.svg)](https://developers.thecatapi.com/)
![Android](https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white)
![iOS](https://img.shields.io/badge/iOS-000000?logo=apple&logoColor=F0F0F0)

## Aplicación móvil desarrollada con React Native para explorar razas de gatos, ver características detalladas y buscar razas específicas usando [TheCatAPI](https://developers.thecatapi.com/).

---

## 📚 Documentación Generada

La documentación técnica completa del proyecto, generada automáticamente con [Deepwiki](https://deepwiki.com/).
Consulta esta sección para detalles sobre la arquitectura, componentes, hooks y flujos internos de la app.

- [Ver documentación Deepwiki](https://deepwiki.com/DevACampuzano/CatBreeds)

---

## 📸 Demo de la App

<div style="display:flex;gap:20px;justify-content: center; align-items:center">
  <div style="display:flex;gap:20px;justify-content: center; align-items:center; flex-direction:column">
    <span style="font-size: 20px; font-weight:bold;">iOS</span>
    <img src="./resources/Demo-ios.gif" alt="Demo de CatBreeds iOS" width="300px" height="600px" />
  </div>
  <div style="display:flex;gap:20px;justify-content: center; align-items:center; flex-direction:column">
    <span style="font-size: 20px; font-weight:bold">Android</span>
    <img src="./resources/Demo-android.gif" alt="Demo de CatBreeds Android" width="300px" height="600px" />
  </div>
</div>
<br/>
<br/>
Disfruta de una vista rápida de las principales funcionalidades: exploración de razas, búsqueda, detalles y animaciones.

---

## 🚀 Características

- Explora un listado completo de razas de gatos
- SBusca razas por nombre
- Visualiza información detallada (Inteligencia, esperanza de vida, adaptabilidad, etc.)
- Interfaz atractiva con animaciones fluidas
- Scroll infinito para el listado de razas
- Funcionalidad offline gracias al caché de React Query

---

## 📦 Instalación

### Requisitos previos

- Node.js (v18+)
- npm / Yarn
- bun (opcional)
- React Native CLI
- Android Studio / Xcode (para emuladores)

### Setup

1. Clona el repositorio:

   ```bash
   git clone https://github.com/devacampuzano/catbreeds.git
   cd catbreeds
   ```

2. instala las dependecias:

   ```bash
   npm install
   # o
   yarn
   # o
   bun install
   ```

3. Ejecuta la app:

   - android:

     ```bash
     npx react-native run-android
     # o
     bun android
     ```

   - iOS:

     ```bash
     npx react-native run-ios
     # o
     bun ios
     ```

---

## 📂 Estructura del proyecto

```
    catbreeds/
    ├── src/
    │   ├── components/       # Componentes reutilizables (Tarjetas, Búsqueda, Estrellas, etc.)
    │   ├── screens/          # Pantallas (home, details)
    │   ├── common/
    │   │   ├── api/          # Configuración de API (TheCatAPI)
    │   │   ├── hooks/        # Hooks personalizados (useBreeds, useDebounce)
    │   │   ├── store/        # Gestión de estado
    │   │   └── assets/       # Fuentes, imágenes
    │   ├── routes/           # Configuración de navegación
    │   ├── service/          # Acciones de API
    │   └── styles/           # Temas globales
```

---

## 🔨 Tecnologías Utilizadas

- React Native (v0.80)
- TypeScript
- React Navigation (V7)
- React Query (TanStack) - Consulta y caché de datos
- React Native Reanimated - Animaciones
- Axios - Preticiones HTTP
- React Native Vector Icons (ionicons) - paquete de iconos

---

## <span style="display: inline-flex; align-items: center; gap: 8px;"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffff"><path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z"/></svg>Fragmeentos de Código</span>

### 1. Obtención de rezas con scroll infinito

```ts
// src/common/hooks/useBreeds.ts
const {
  data: { pages: listPages },
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading: isLoadingBreeds,
} = useInfiniteQuery({
  queryKey: ["breeds-list"],
  queryFn: ({ pageParam = 0, signal }) =>
    BreedsActions.getBreeds(6, pageParam, signal),
  getNextPageParam: (_, allPages) => allPages.length,
  initialPageParam: 0,
  staleTime: 1000 * 60 * 60,
});
```

### 2. Búsqueda con debounce

```ts
// src/common/hooks/useBreeds.ts
const {
  data: listFiltered = [],
  isLoading: isLoadingFiltered,
  refetch,
} = useQuery({
  queryKey: ["breeds-list", searchQuery],
  queryFn: ({ signal }) =>
    BreedsActions.getSearchBreeds(searchQuery.trim(), signal),
  enabled: !!searchQuery,
  staleTime: 1000 * 60 * 60,
});

const debouncedRefetch = useDebounce(refetch, 500);

const handleChangeSearchText = useCallback(
  (search: string) => {
    setSearchQuery(search);
    debouncedRefetch();
  },
  [debouncedRefetch]
);
```

### 3. Animaciones de compontes

- Componente CatCard

  ```js
  // src/components/CatCard/index.tsx
  ```

  ```hbs
  <Animated.View
    entering={index 6 ? FadeInDown.delay( 200* index) : undefined}
  ></Animated.View>
  ```

- Componente Section
  ```js
  // src/components/Section/index.tsx
  ```
  ```hbs
  <Animated.View
    style={styles.section}
    entering={FadeInDown.delay( 300 * index)}
  ></Animated.View>
  ```

---

## 🎨 Componentes de UI

- CatCard: Tarjeta con imagen, nombre y intelgencia de la raza
- Stars: Puntuación con estrellas interactivas
- InputSearch: Barra de búsqueda
- Section: Secciones plegables en pantalla de detalles

---

## 📡 Integración con API

La app usa los endpoints de [TheCatAPI](https://developers.thecatapi.com/)

| Endpoint         | Método | Descripción                                   |
| ---------------- | ------ | --------------------------------------------- |
| `/breeds`        | GET    | Obtiene el listado por paginado de las razas  |
| `/breeds/search` | GET    | Busca razas por nombre                        |
| `/breeds/{id}`   | GET    | Obtiene detalles específicos de una raza      |
| `/images/{id}`   | GET    | Obtiene imágenes de referencia para las razas |

---

## 🛠️ Roadmap y Mejoras Futuras

- Implementar favoritos localmente
- Añadir comparador de razas
- Internacionalización / Multilenguaje (i18n)
- Modo oscuro

---

## 🙏 Agradecimientos

Agradezco a Pragma por la oportunidad de presentar esta prueba técnica y demostrar mis habilidades en desarrollo móvil. Ha sido un reto enriquecedor y valioso para mi crecimiento profesional.
