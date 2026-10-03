import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, FileArchive, FileImage, File } from 'lucide-react';
import Button from './Button';

/**
 * Professional FileUpload Component for Student Assignment Submissions
 * Features: Drag & Drop, File Validation (Type & Size), Progress Indicator, Metadata Preview, Errors
 */
export function FileUpload({
  onUploadSubmit,
  allowedTypes = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.zip', '.png', '.jpg'],
  maxSizeMB = 15,
  existingSubmission = null,
  isResubmissionAllowed = true
}) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [remarks, setRemarks] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file) => {
    setFileError('');
    if (!file) return false;

    // Type check
    const extension = '.' + file.name.split('.').pop().toLowerCase();
    const isTypeValid = allowedTypes.some((type) => type.toLowerCase() === extension);

    if (!isTypeValid) {
      setFileError(`Invalid file format '${extension}'. Allowed types: ${allowedTypes.join(', ')}`);
      return false;
    }

    // Executable safety check
    const dangerousExts = ['.exe', '.bat', '.cmd', '.sh', '.vbs', '.msi', '.jar', '.com'];
    if (dangerousExts.includes(extension)) {
      setFileError('Security Warning: Executable and script files are strictly prohibited.');
      return false;
    }

    // Size check
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setFileError(`File size (${fileSizeMB.toFixed(1)} MB) exceeds maximum limit of ${maxSizeMB} MB.`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (file) => {
    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFileError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setFileError('Please select a file to submit.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress animation for user feedback
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 15;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
      onUploadSubmit({
        file: selectedFile,
        name: selectedFile.name,
        size: selectedFile.size,
        remarks: remarks
      });
      setSelectedFile(null);
      setRemarks('');
    }, 1200);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    if (['zip', 'rar', '7z'].includes(ext)) return <FileArchive size={24} style={{ color: 'var(--color-warning-600)' }} />;
    if (['png', 'jpg', 'jpeg', 'svg'].includes(ext)) return <FileImage size={24} style={{ color: 'var(--color-primary-600)' }} />;
    return <FileText size={24} style={{ color: 'var(--color-primary-800)' }} />;
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Existing Submission Details Card */}
      {existingSubmission && (
        <div style={{
          backgroundColor: 'var(--color-success-50)',
          border: '1px solid var(--color-success-100)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-5)',
          marginBottom: 'var(--space-6)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <CheckCircle2 size={20} style={{ color: 'var(--color-success-600)' }} />
              <strong style={{ color: 'var(--color-success-700)', fontSize: 'var(--text-base)' }}>
                Assignment Already Submitted
              </strong>
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>
              Submitted on: {existingSubmission.submittedAt}
            </span>
          </div>

          <div style={{
            backgroundColor: '#ffffff',
            padding: 'var(--space-3) var(--space-4)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-slate-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              {getFileIcon(existingSubmission.fileName)}
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>
                  {existingSubmission.fileName}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>
                  Size: {existingSubmission.fileSize}
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert(`Downloading ${existingSubmission.fileName}`)}>
              View / Download File
            </Button>
          </div>

          {!isResubmissionAllowed && (
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-600)', marginTop: 'var(--space-3)', margin: 0 }}>
              🔒 Resubmission is locked for this assignment by course faculty.
            </p>
          )}
        </div>
      )}

      {/* Upload Drop Zone Form */}
      {(!existingSubmission || isResubmissionAllowed) && (
        <form onSubmit={handleFormSubmit}>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleInputChange}
            accept={allowedTypes.join(',')}
            style={{ display: 'none' }}
          />

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            style={{
              border: `2px dashed ${dragActive ? 'var(--color-primary-600)' : 'var(--color-border-strong)'}`,
              borderRadius: 'var(--radius-lg)',
              backgroundColor: dragActive ? 'var(--color-primary-50)' : 'var(--color-bg-surface)',
              padding: 'var(--space-8) var(--space-4)',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'var(--transition-fast)',
              marginBottom: 'var(--space-4)'
            }}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-700)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--space-3) auto'
            }}>
              <UploadCloud size={28} />
            </div>

            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)', color: 'var(--color-slate-800)' }}>
              {existingSubmission ? 'Replace / Resubmit Assignment File' : 'Drag & Drop File Here'}
            </h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-slate-500)', marginBottom: 'var(--space-3)' }}>
              or <span style={{ color: 'var(--color-primary-600)', fontWeight: 'var(--font-weight-semibold)', textDecoration: 'underline' }}>Browse files from computer</span>
            </p>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-400)' }}>
              Supported formats: {allowedTypes.join(', ').toUpperCase()} &bull; Max file size: {maxSizeMB} MB
            </div>
          </div>

          {/* Validation Error Banner */}
          {fileError && (
            <div style={{
              backgroundColor: 'var(--color-danger-50)',
              color: 'var(--color-danger-700)',
              border: '1px solid var(--color-danger-100)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)'
            }}>
              <AlertCircle size={16} />
              <span>{fileError}</span>
            </div>
          )}

          {/* Selected File Details Box */}
          {selectedFile && (
            <div style={{
              backgroundColor: 'var(--color-slate-50)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-4)',
              marginBottom: 'var(--space-4)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  {getFileIcon(selectedFile.name)}
                  <div>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-900)' }}>
                      {selectedFile.name}
                    </div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-slate-500)' }}>
                      {formatFileSize(selectedFile.size)} &bull; {selectedFile.type || 'Academic File'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeSelectedFile}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-danger-600)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-xs)'
                  }}
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>

              {/* Upload Progress Bar */}
              {isUploading && (
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '4px' }}>
                    <span>Uploading file metadata...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: 'var(--color-slate-200)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: 'var(--color-primary-600)', transition: 'width 0.15s ease' }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Remarks input */}
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-slate-700)', display: 'block', marginBottom: '4px' }}>
              Submission Notes / Remarks (Optional):
            </label>
            <input
              type="text"
              placeholder="e.g. Added documentation in Appendix A"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                fontSize: 'var(--text-sm)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border-strong)',
                outline: 'none'
              }}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            icon={UploadCloud}
            isLoading={isUploading}
            disabled={!selectedFile}
            style={{ width: '100%' }}
          >
            {existingSubmission ? 'Resubmit Assignment' : 'Submit Assignment'}
          </Button>
        </form>
      )}
    </div>
  );
}

export default FileUpload;
