import React, { useState, useEffect } from 'react';
import APP_NAME from 'constants';
interface FileSelectorProps {
  onSelectFile: (file: string) => void;
}

const FileSelector: React.FC<FileSelectorProps> = ({ onSelectFile }) => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    fetch(`/${APP_NAME}/names.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        if (Array.isArray(data.names)) {
          setFiles(data.names);
        } else {
          throw new Error('Parsed data is not an array');
        }
      })
      .catch(error => console.error('Error fetching names.json:', error));
  }, []);

  return (
    <div>
      <select onChange={(e) => onSelectFile(e.target.value)}>
        <option value="">Select a file</option>
        {files.map(file => (
          <option key={file} value={file}>{file}</option>
        ))}
      </select>
    </div>
  );
};

export default FileSelector;