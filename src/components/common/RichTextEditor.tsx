import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { FaMagic, FaBold, FaItalic, FaListUl } from 'react-icons/fa';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const handleOptimizeText = () => {
    // Call your AI API here
    console.log('Optimize text using AI');
  };

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();

  return (
    <div className="rich-text-editor relative border p-2 rounded">
      <div className="toolbar mb-2 flex space-x-2">
        <button onClick={toggleBold} className="p-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          <FaBold />
        </button>
        <button onClick={toggleItalic} className="p-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          <FaItalic />
        </button>
        <button onClick={toggleBulletList} className="p-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
          <FaListUl />
        </button>
      </div>
      <EditorContent editor={editor} className="border-t p-2 min-h-[200px]" />

      <button
        onClick={() => console.log('Additional AI functionality')}
        className="absolute bottom-2 right-2 p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center w-10 h-10"
      >
        <FaMagic />
      </button>
    </div>
  );
};

export default RichTextEditor; 