# NextStage Academy

Təhsil proqramı platforması: təlim kataloqu, təlimlərə müraciət, bloq,
CV və karyera dəstəyi və admin panel. Saytda giriş/qeydiyyat yoxdur —
müraciətlər qonaq kimi göndərilir.

## Stack

| Qat | Seçim |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Stil | Tailwind CSS 4 |
| Baza | MongoDB Atlas + Mongoose |
| Çoxdillilik | next-intl — `az` (defolt), `ru`, `en` |
| Deploy | Vercel |

Layihə yalnız üç platformadan asılıdır: **GitHub**, **Vercel**, **MongoDB Atlas**.

## Başlanğıc

```bash
npm install
cp .env.example .env   # dəyərləri doldur
npm run dev
```

### Env dəyişənləri

`.env.example` faylına bax. `DATABASE_URL`-i Atlas panelindən götür
(**Connect → Drivers**) və **sonuna baza adını əlavə etməyi unutma**:

```
mongodb+srv://istifadeci:parol@cluster.xxxxx.mongodb.net/nextstage?retryWrites=true&w=majority
```

Baza adı yazılmasa driver hər şeyi defolt `test` bazasına yazar.

## Əmrlər

```bash
npm run dev     # lokal server
npm run build   # istehsal build-i
npm run lint    # ESLint
npx tsc --noEmit  # tip yoxlaması
```

## Struktur

```
src/
  app/[locale]/       səhifələr — üç dil üçün SSG
  i18n/               routing (dilə görə tərcümə olunan yollar), navigation, request
  lib/db.ts           Mongoose bağlantısı, serverless üçün keşlənmiş
  models/             Category · Course · Enrollment · Post · Message · Faq
  proxy.ts            next-intl middleware (Next 16-da `middleware` yox, `proxy`)
messages/             az.json · ru.json · en.json
```

## Bilməli olduqlar

**Çoxdilli mətnlər sənədin içindədir.** Ayrıca tərcümə cədvəli yoxdur —
hər sahə `{ az, ru, en }` şəklindədir (`src/models/shared.ts`). Dil boşdursa
`t()` funksiyası Azərbaycan dilinə qayıdır.

**Slug bütün dillərdə eynidir.** Yalnız yol seqmentləri tərcümə olunur:
`/telimler/excel-telimi` · `/ru/kursy/excel-telimi` · `/en/courses/excel-telimi`.
Yolların siyahısı `src/i18n/routing.ts` faylındadır.

**Windows-da DNS.** Node-un resolver-i registry-dəki `NameServer` sahəsini
oxuyur. DNS DHCP ilə verilirsə bu sahə boş qalır və resolver `127.0.0.1`-ə
düşür — nəticədə `mongodb+srv://` üçün lazım olan SRV sorğusu ECONNREFUSED
verir. `src/lib/db.ts` bu halı aşkarlayıb yalnız lokal rejimdə ictimai DNS-ə
keçir. Vercel-də bu kod işləmir.
