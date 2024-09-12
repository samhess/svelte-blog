# Simple Blog with SvelteKit

This is a simple blog system implemented with SvelteKit. It uses 
[Prisma ORM](https://www.prisma.io) for database access.
For layout and design [Tailwind CSS](https://tailwindcss.com)
is used along with [Skeleton UI toolkit](https://www.skeleton.dev). 
Authentication is implemented using [Lucia Auth](https://lucia-auth.com).

## Getting Started

```sh
# Create a new GitHub project and use `git clone` to copy this project.
git clone https://github.com/samhess/svelte-blog.git

# Install dependencies
npm install

# Specify DATABASE_URL as environment variable
# Create the database model
npx prisma db push

# Run the development server
npm run dev
```

## Database

### Local Database
Specify the **DATABASE_URL** in [.env](.env). Also adjust the database type (provider) in 
[schema.prisma](prisma/schema.prisma).

### Cloud Database
Specify the **DATABASE_URL** in the environment variables of your cloud database provider.

## Deploy
Learn how to deploy a full stack SvelteKit app on [Vercel](https://vercel.com) for free.

## Links
* [Deploy A Full Stack SvelteKit App](https://joyofcode.xyz/sveltekit-deployment)
