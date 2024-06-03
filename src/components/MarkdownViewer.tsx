import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx'

interface MarkdownViewerProps {
  file: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ file }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (file) {
      fetch(`/reactPagesApp/${file}.json`)
        .then(response => response.text())
        .then(text => setContent(text))
        .catch(error => console.error('Error fetching markdown file:', error));
    }
  }, [file]);

  return (
    <div>
      {file ? (
        <Markdown>{content}</Markdown>
      ) : (
        <p>Please select a file to view its content.</p>
      )}
    </div>
  );
};

export default MarkdownViewer;