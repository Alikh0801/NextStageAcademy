# NextStage Academy

Təhsil proqramı platforması: təlim kataloqu, təlimlərə müraciət, bloq,
CV və karyera dəstəyi və admin panel. Ziyarətçilər üçün giriş/qeydiyyat
yoxdur — müraciətlər qonaq kimi göndərilir. Giriş yalnız admin üçündür (`/admin`).

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

### Admin girişi

Admin hesabı bazada deyil, env dəyişənlərində saxlanılır:

```bash
npm run admin:hash -- 'guclu-parol'   # → ADMIN_PASSWORD_HASH
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"   # → ADMIN_SESSION_SECRET
```

`ADMIN_EMAIL` ilə birlikdə `.env`-ə və Vercel-ə əlavə et. Giriş səhifəsi:
`/admin/login`.

## Əmrlər

```bash
npm run dev     # lokal server
npm run build   # istehsal build-i
npm run lint    # ESLint
npx tsc --noEmit  # tip yoxlaması
npm run admin:hash -- 'parol'  # admin parolunun hash-i
```

## Struktur

```
src/
  app/[locale]/       səhifələr — üç dil üçün SSG
  app/admin/          admin panel — ayrıca root layout, yalnız az dilində
  i18n/               routing (dilə görə tərcümə olunan yollar), navigation, request
  lib/db.ts           Mongoose bağlantısı, serverless üçün keşlənmiş
  lib/admin/          admin sessiyası, parol yoxlaması, cəhd limiti
  models/             Category · Course · Enrollment · Post · Message · Faq · LoginAttempt
  proxy.ts            next-intl + /admin qoruması (Next 16-da `middleware` yox, `proxy`)
messages/             az.json · ru.json · en.json
```

## Bilməli olduqlar

**Çoxdilli mətnlər sənədin içindədir.** Ayrıca tərcümə cədvəli yoxdur —
hər sahə `{ az, ru, en }` şəklindədir (`src/models/shared.ts`). Dil boşdursa
`t()` funksiyası Azərbaycan dilinə qayıdır.

**Slug bütün dillərdə eynidir.** Yalnız yol seqmentləri tərcümə olunur:
`/telimler/excel-telimi` · `/ru/kursy/excel-telimi` · `/en/courses/excel-telimi`.
Yolların siyahısı `src/i18n/routing.ts` faylındadır.

**Admin sessiyası bazada saxlanmır.** Cookie-də bitmə vaxtı və onun HMAC
imzası durur (7 gün). `ADMIN_SESSION_SECRET` və ya parol dəyişəndə bütün
açıq sessiyalar etibarsız olur. Proxy yalnız ilkin süzgəcdir — qorunan hər
səhifə və Server Action `verifyAdmin()`-i özü çağırmalıdır. Bir IP-dən 15
dəqiqədə 5 uğursuz cəhddən sonra giriş bloklanır (`LoginAttempt`).

**Windows-da DNS.** Node-un resolver-i registry-dəki `NameServer` sahəsini
oxuyur. DNS DHCP ilə verilirsə bu sahə boş qalır və resolver `127.0.0.1`-ə
düşür — nəticədə `mongodb+srv://` üçün lazım olan SRV sorğusu ECONNREFUSED
verir. `src/lib/db.ts` bu halı aşkarlayıb yalnız lokal rejimdə ictimai DNS-ə
keçir. Vercel-də bu kod işləmir.
