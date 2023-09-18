# Next.js Yjs Tiptap Liveblocks

This repository is a demo of the integration between the Tiptap editor and Liveblocks, providing a streamlined solution for collaborative text editing. Compared to the Hocuspocus implementation, this approach is simpler to implement and highly adaptable.

## Features

- **Tiptap Editor:** Utilizes the Tiptap editor for rich text editing, making it user-friendly and versatile.
- **Liveblocks Integration:** Seamlessly integrates with Liveblocks, a node package available as a post function in the `api` folder, making it suitable for use in Lambda functions. [View function file](https://github.com/akhilvc10/nextjs-yjs-tiptap-liveblocks/blob/main/src/app/api/liveblocks-auth/route.ts)

## Getting Started

To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Run `pnpm install` to install the necessary dependencies.
3. Create a `.env.local` file and add your Liveblocks secret key as an environment variable: `LIVEBLOCKS_SECRET_KEY=<your_secret_key>`
4. Run the development server: `npm run dev`

## Block Number Issue

The block number issue has been resolved, ensuring that the application functions as expected. Please verify if the issue is resolved in the implementation.

## Testing the Application

You can test the live application by visiting the following link: [Tiptap Liveblocks Demo](https://nextjs-yjs-tiptap-liveblocks.vercel.app)

## Active Users

Active users are displayed prominently at the top of the application for improved clarity, making it easier to identify who is currently collaborating on the document.
