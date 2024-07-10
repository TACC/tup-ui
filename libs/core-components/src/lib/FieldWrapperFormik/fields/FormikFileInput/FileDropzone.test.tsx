import React, { useState } from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FileDropzone from './FileDropzone';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const FileDropzoneWrapper: React.FC<{ maxSize: number }> = ({ maxSize }) => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = (files: File[]) => {
    setFiles(files);
  };
  const onRemoveFile = (index: number) => {
    setFiles([]);
  };
  return (
    <FileDropzone
      files={files}
      maxSize={maxSize}
      maxSizeMessage="ERR!"
      onDrop={onDrop}
      onRemoveFile={onRemoveFile}
    />
  );
};

describe('dropzone', () => {
  it('Reacts to file upload.', async () => {
    const smallFile = new File(['file'], 'myfile.json', {
      type: 'application/json',
    });
    render(<FileDropzoneWrapper maxSize={100000} />);
    const input = screen.getByTestId('dropzone-input');
    await userEvent.upload(input, smallFile);
    expect(screen.getByText('myfile.json')).toBeDefined();
    expect(screen.getByText(/Remove/)).toBeDefined();
  });

  it('Shows error when file is too big.', async () => {
    const bigFile = new File(['hi'], 'myfile', { type: 'image/jpeg' });
    render(<FileDropzoneWrapper maxSize={0} />);
    const input = screen.getByTestId('dropzone-input');
    await userEvent.upload(input, bigFile);
    expect(screen.getByText(/Exceeds File Size Limit/)).toBeDefined();
  });
});
