# Simple Blog with SvelteKit

## Getting Started

```sh
# Create a new GitHub project and use `git clone` to copy this project.
git clone https://github.com/samhess/svelte-blog.git
# Create the database
npx prisma db push
# Install dependencies
npm i
# Run the development server
npm run dev
```

## Database

### Local Database
Specify the **DATABASE_URL** in the *.env* file. Also adjust the database type (provider) in the 
*schema.prisma* file.

### Cloud Database
Specify the **DATABASE_URL** in the environment variables of your cloud database provider.

## Deploy
Learn how to deploy a full stack SvelteKit app on [Vercel](https://vercel.com/) for free.

## Links
* [Deploy A Full Stack SvelteKit App](https://joyofcode.xyz/sveltekit-deployment)
