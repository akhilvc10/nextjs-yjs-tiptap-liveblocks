"use client";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Gapcursor from "@tiptap/extension-gapcursor";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom, useSelf } from "@/liveblocks.config";
import Text from "@tiptap/extension-text";

import { useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "@/components/Avatars";
import SectionNode from "./SectionNode/SectionNodeExtension";
import BlockNode from "./BlockNode/BlockNodeExtension";

const CustomDocument = Document.extend({
  content: "sectionNode+",
});

// Collaborative text editor with simple rich text, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <TiptapEditor doc={doc} provider={provider} />;
}

type EditorProps = {
  doc: Y.Doc;
  provider: any;
};

function TiptapEditor({ doc, provider }: EditorProps) {
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  // Set up editor with plugins, and place user info into Yjs awareness and cursors
  const editor = useEditor({
    editorProps: {
      attributes: {
        // Add styles to editor element
        class: styles.editor,
      },
    },
    extensions: [
      // StarterKit.configure({
      //   // The Collaboration extension comes with its own history handling
      //   history: false,
      // }),
      Paragraph,
      Heading,
      Text,
      // @ts-ignore
      History,
      SectionNode,
      BlockNode,
      CustomDocument,
      // Gapcursor,
      // Dropcursor.configure({
      //   color: "#f0e0cc",
      //   width: 1,
      //   class: "drop-cursor",
      // }),
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
      // Register the document with Tiptap
      Collaboration.configure({
        document: doc,
      }),
      // Attach provider and user info
      CollaborationCursor.configure({
        provider: provider,
        user: userInfo,
      }),
    ],
  });

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        {/* <Toolbar editor={editor} /> */}
        <Avatars />
      </div>
      <EditorContent editor={editor} className={styles.editorContainer} />
    </div>
  );
}
