import React, { useState } from 'react';
import FileSelector from './components/FileSelector';
import MarkdownViewer from './components/MarkdownViewer';
import './App.css';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('');

  return (
    <div className="App">
      <h1>Markdown Viewer</h1>
      <FileSelector onSelectFile={setSelectedFile} />
      <MarkdownViewer file={selectedFile} />
    </div>
  );
};

export default App;