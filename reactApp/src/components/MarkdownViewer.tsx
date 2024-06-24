import React, { useState, useEffect } from 'react';
import Markdown from 'markdown-to-jsx'
import {APP_NAME} from './Constants';

interface MarkdownViewerProps {
  file: string;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ file }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (file) {
      fetch(`/${APP_NAME}/docs/${file}`)
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
        <p>Please select a document.</p>
      )}
    </div>
  );
};

export default MarkdownViewer;