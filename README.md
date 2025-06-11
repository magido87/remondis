# Remondis Chat

En modern chattapplikation byggd med Next.js, React och Tailwind CSS. Applikationen använder AI för att svara på frågor om återvinning och miljö.

## Funktioner

- 🤖 AI-driven chatt med fokus på återvinning och miljö
- 🌓 Stöd för ljust och mörkt läge
- 📱 Responsiv design för alla enheter
- 🎨 Anpassad styling med Remondis färger
- 📝 Markdown-stöd för formaterad text

## Installation

1. Klona repositoryt:
```bash
git clone [repository-url]
cd remondis-chat
```

2. Installera beroenden:
```bash
npm install
```

3. Starta utvecklingsservern:
```bash
npm run dev
```

4. Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

## Teknisk Stack

- Next.js 14
- React 18
- Tailwind CSS
- TypeScript
- next-themes för mörkt läge
- react-markdown för markdown-rendering

## Miljövariabler

Skapa en `.env.local` fil i projektets rot och lägg till följande:

```env
OPENAI_API_KEY=din_api_nyckel_här
```

## Utveckling

För att bygga projektet för produktion:

```bash
npm run build
```

För att starta produktionsversionen:

```bash
npm start
```

## Licens

MIT
