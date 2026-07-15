# SANTO — Hamburguesas & Bistró

Sitio web oficial de **SANTO Hamburguesas & Bistró** (Chef Luciano Gómez) en Restrepo, Meta.

- 📍 Calle 7 # 5-24, Centro — Restrepo, Meta
- 🕐 Lunes a domingo, 5:00 pm – 10:00 pm
- 📞 Domicilios: 312 395 7174
- 📷 [@santococina](https://www.instagram.com/santococina/)

## Estructura

```
├── index.html      # Página principal (una sola página)
├── css/style.css   # Estilos e identidad visual
├── js/main.js      # Menú interactivo, animaciones y datos de la carta
├── statics/        # Logo, videos y piezas gráficas
├── server.js       # Servidor estático para producción (Node, sin dependencias)
└── package.json
```

## Editar la carta (platos y precios)

Los platos están al inicio de [`js/main.js`](js/main.js), en el objeto `MENU`.
Cada plato tiene `nombre`, `precio` (número, sin puntos), `desc` y opcionalmente `tag`.
Guarda el archivo y la página se actualiza sola.

## Correr en local

Con Node 18 o superior instalado:

```bash
npm start
```

y abre <http://localhost:3000>. (También puedes abrir `index.html` directamente,
pero con el servidor los videos cargan igual que en producción.)

## Desplegar en Railway

1. Sube este repositorio a GitHub (público o privado).
2. Entra a [railway.com](https://railway.com) → **New Project** → **Deploy from GitHub repo** y elige el repo.
3. Railway detecta Node automáticamente y ejecuta `npm start`. No hay que configurar nada más: el servidor lee el puerto de la variable `PORT` que Railway inyecta.
4. Cuando el deploy termine, ve a **Settings → Networking → Generate Domain** para obtener la URL pública (luego puedes conectar un dominio propio en la misma sección).

### Alternativa con la CLI

```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

Cada `git push` a la rama conectada redespliega automáticamente.
