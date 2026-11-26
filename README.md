# Site oficial — Haras Manoel Leão

Landing page institucional e comercial em **React + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide** (Vite).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # gera /dist (site estático, pronto para Vercel, Netlify, Hostinger etc.)
npm run preview   # serve o build localmente
```

## Onde editar o conteúdo

Todo o conteúdo fica em **`src/data/site.ts`**: textos, serviços, horários, cardápio, imagens, links e contatos. Os componentes só leem esses dados, então dá para migrar para um CMS depois sem refazer o layout.

| O quê | Campo |
|---|---|
| Número do WhatsApp / telefone | `contact.whatsapp.number`, `contact.phone` |
| Instagram | `contact.instagram` |
| Endereço / coordenadas / link do Maps | `location` |
| Logotipo oficial | `brand.logo` (arquivo em `public/brand/`) |
| Vídeo / foto do hero | `hero.video`, `hero.image` |
| História do Haras | `about.history` |
| Experiências (e status) | `experiences[]` |
| Horário de funcionamento | `openingHours` |
| Valores e horários das refeições | `gastronomy.menu`, `gastronomy.hours`, `experiences[].prices` |
| Próximos eventos | `events.upcoming` |
| Galeria | `gallery[]` |
| Eventos (capacidade etc.) | `events.facts`, `events.types` |
| Posts do Instagram | `instagramPosts[]` (imagem + link da publicação) |
| Razão social / CNPJ | `footer.legalName`, `footer.cnpj` |

### Fontes do conteúdo

O conteúdo vem de fontes oficiais, consultadas em 25/11/2026:

- **Instagram @harasmanoelleao** (bio, legendas e cartazes): passeios a cavalo e de charrete, Eskiunda, kit para alimentar os animais, almoço self-service com espetinhos, café da manhã de domingo, valores divulgados em nov/2026, eventos (aniversários, casamentos, batizados, chás revelação), etapas do ranking de hipismo e o link do WhatsApp.
- **Ficha do Google Maps**: telefone (16) 98219-0004 (o mesmo número do link da bio), CEP, bairro Jurucê, horários, descrição do buffet e fotos.

Os valores aparecem sempre com a nota "divulgados no Instagram em novembro/2026 — confirme pelo WhatsApp". O destaque **Próximo evento** (`events.upcoming`) some sozinho depois da data.

### Conteúdo pendente

Ainda falta confirmar com o Haras:

- **`status: 'consultar'`**: equoterapia e eventos corporativos aparecem com o selo "Sob consulta".
- História do Haras (`about.history`), vídeo do hero, logotipo vetorial, informações de estacionamento, razão social e CNPJ.
- Fotos oficiais de cavalos, crianças e equoterapia (hoje são imagens ilustrativas).
- **`VITE_SHOW_PENDING=true`** (em `.env`) mostra as anotações de pendência. Mude para `false` quando o conteúdo estiver aprovado.

### Fotos

As fotos originais ficam em **`assets-src/`**. O comando abaixo gera WebP responsivo (640, 1280 e 2000 px) em `public/images/` e um manifesto que o componente `<Photo>` usa para montar o `srcset`:

```bash
npm run images
```

Depois, aponte o `src` em `site.ts` (ex.: `'/images/maps/salao-eventos.webp'`).

- `assets-src/maps/`: fotos da ficha do Google enviadas **pelo próprio Haras** ou por **agências de marketing** (Alvo Marketing Digital, Conecta Group Marketing, TradeMaps). Confirme com o Haras que essas agências trabalham para ele.
- `assets-src/instagram/`: capas das publicações oficiais (até 640 px, que é o máximo público).
- `assets-src/ilustrativas/`: 3 fotos **ilustrativas** do Unsplash (licença gratuita com uso comercial), usadas na equoterapia e nos quadros Cavalos e Família da galeria. Têm `illustrative: true` e aparecem com o selo "Imagem ilustrativa". Os créditos estão em `CREDITOS.txt`. Troque-as por fotos oficiais assim que possível.
- `assets-src/_visitantes-aguardando-autorizacao/`: fotos de **visitantes** no Google Maps. Elas não estão publicadas, porque os direitos são dos autores. Veja o LEIA-ME da pasta.
- O logo em `public/brand/logo-perfil.webp` é a foto de perfil do Instagram (150 px). Troque pelo arquivo vetorial quando ele chegar.

## Configuração (`.env`)

| Variável | Uso |
|---|---|
| `VITE_SITE_URL` | Domínio final, usado em canonical, Open Graph, JSON-LD, `sitemap.xml` e `robots.txt` (gerados no build) |
| `VITE_FORM_ENDPOINT` | Opcional. Endpoint POST JSON (Formspree, Getform, API própria). Se ficar vazio, o formulário envia pelo WhatsApp |
| `VITE_SHOW_PENDING` | `true`/`false`: mostra ou esconde as marcações de pendência |

## Efeitos e interatividade

- **Barra de progresso** de leitura no topo e **navegação lateral por pontos** em telas grandes (`ScrollUI.tsx`).
- **Hero:** palavras do título surgem uma a uma, a foto acompanha o mouse com parallax, os botões são "magnéticos" e há o selo **Aberto agora / Fechado**, calculado no horário de Brasília a partir de `openingHours`.
- **Manifesto** (`Manifesto.tsx`): o texto acende palavra por palavra conforme a rolagem. Os números com contagem usam só fatos reais (`manifesto.facts`).
- **Faixas animadas** (`Marquee.tsx`): seguem a velocidade da rolagem e invertem o sentido quando o visitante sobe a página.
- **Planeje seu dia** (`VisitPlanner.tsx`): o visitante escolhe dia, pessoas, refeições e atividades, vê uma estimativa com os valores de `planner.items` e envia o plano pronto pelo WhatsApp. O café da manhã só fica disponível aos domingos.
- Tudo respeita `prefers-reduced-motion`. Para testar as animações num computador com movimento reduzido, abra `http://localhost:5173/?motion`. Esse parâmetro só funciona em desenvolvimento.

## Formulário de contato

Valida nome, telefone com DDD, assunto, mensagem e consentimento (LGPD), além de ter um campo anti-spam (honeypot).

- **Com `VITE_FORM_ENDPOINT`:** envia JSON com `{ nome, telefone, assunto, mensagem, origem }`, mostra o estado de envio e trata erros e timeout.
- **Sem endpoint:** abre o WhatsApp do Haras com a mensagem já preenchida.

## SEO e acessibilidade

- Meta title e description, Open Graph (`public/og-image.png`), favicon, manifest e apple-touch-icon.
- Dados estruturados `LocalBusiness` + `TouristAttraction` em `index.html`, com telefone, CEP, horários e coordenadas.
- `sitemap.xml` e `robots.txt` gerados automaticamente; página `/privacidade/`.
- Navegação por teclado, link "pular para o conteúdo", foco preso em modais e no menu, `aria-*` nos controles, contraste AA.
- Todas as animações respeitam `prefers-reduced-motion`. Não há scroll hijacking.

## Estrutura

```
src/
  data/site.ts            ← conteúdo editável
  lib/links.ts            ← WhatsApp, mapas, rolagem, flags de ambiente
  lib/useDialog.ts        ← comportamento acessível de modais
  components/
    Header, Hero, About, ExperienceCards, Gallery, Gastronomy,
    FamilyExperience, Events, InstagramSection, Location, Contact,
    Footer, WhatsAppFloat, Logo
    ui/ Photo, Reveal, Pending, icons
privacidade/index.html    ← política de privacidade (modelo a revisar)
```
