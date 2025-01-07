# 🧶 Tools

A collection of various tools for myself.

## Tech Stack

| Name                   | Purpose                   |
| ---------------------- | ------------------------- |
| Vite                   | Build tool                |
| React                  | UI library                |
| Tailwind CSS           | CSS framework             |
| @tanstack/react-router | Routing library           |
| valibot                | Schema validation library |
| react-helmet-async     | Dynamic meta tags         |
| @tabler/icons-react    | Icon component library    |

### For development

| Name     | Purpose              |
| -------- | -------------------- |
| pnpm     | Package manager      |
| biome    | Formatter and linter |
| lefthook | Git hooks            |

## Development

### Install dependencies

```sh
pnpm i
```

### Run development server

```sh
pnpm dev
```

### Build

```sh
pnpm build
```

### Lint and format

```sh
pnpm check
```

with applying fixes:

```sh
pnpm fix
```

## Deployment

1. Create cloudflare pages project

```bash
pnpm wrangler pages project create
```

> [!NOTE]
> When deploying with GitHub Actions, the repository name and project name must be the same. \
> If you want to change it, edit the workflow yml.

2. Set secrets about cloudflare

Set some secrets in the repository secrets ([https://github.com/\[username\]/\[your-repo\]/settings/secrets/actions](https://github.com/username/your-repo/settings/secrets/actions)). \
Or you can use the gh cli.

```bash
gh secret set CLOUDFLARE_ACCOUNT_ID --body "<your-account-id>"
gh secret set CLOUDFLARE_API_TOKEN --body "<your-api-token>"
```

3. Deploy

Run the workflow manually or push to the main branch.
