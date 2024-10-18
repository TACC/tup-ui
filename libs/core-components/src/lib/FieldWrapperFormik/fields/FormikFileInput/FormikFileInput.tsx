/* FP-993: Allow use by DataFilesUploadModal */
import React from 'react';
import { useField, FieldProps } from 'formik';
import FileInputDropZone from './FileDropzone';
import FieldWrapper from '../../FieldWrapperFormik';

interface FormikFileInputProps extends FieldProps {
  id: string;
  name: string;
  label: string;
  required: boolean;
  description: string;
  maxSizeMessage: string;
  maxSize: number;
}

const FileInputDropZoneFormField: React.FC<FormikFileInputProps> = ({
  id,
  name,
  label,
  description,
  maxSizeMessage,
  maxSize,
  required,
  field,
  form,
  meta,
}) => {
  const [, , helpers] = useField<File[]>(name);

  const onSetFiles = (acceptedFiles: File[]) => {
    const newAcceptedFiles = acceptedFiles.filter(
      (newFile) =>
        !field.value.some((prevFile) => prevFile.name === newFile.name)
    );
    helpers.setValue([...field.value, ...newAcceptedFiles]);
  };
  const onRemoveFile = (fileIndex: number) => {
    helpers.setValue(field.value.filter((_, i) => i !== fileIndex));
  };
  return (
    <FieldWrapper
      id={id || field.name}
      label={label}
      required={required}
      description={description}
      formik={{ field, form, meta }}
    >
      <FileInputDropZone
        id={id || field.name}
        files={field.value}
        onDrop={onSetFiles}
        onRemoveFile={onRemoveFile}
        maxSizeMessage={maxSizeMessage}
        maxSize={maxSize}
      />
    </FieldWrapper>
  );
};

export default FileInputDropZoneFormField;
