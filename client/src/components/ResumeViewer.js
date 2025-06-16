import React from 'react';
import './ResumeViewer.css'; // We will create this next
import { FaDownload } from 'react-icons/fa';

const ResumeViewer = () => {
  // The path to the PDF file in the public folder
  const resumeUrl = '/resume.pdf';

  return (
    <div className="resume-container">
      <a href={resumeUrl} download="YourName_Resume.pdf" className="download-button">
        <FaDownload />
        Download Resume
      </a>
      <div className="pdf-viewer-wrapper">
        <object 
          data={resumeUrl} 
          type="application/pdf" 
          className="pdf-viewer"
          aria-label="My Resume PDF"
        >
          <p>Your browser does not support embedded PDFs. Please use the download link above.</p>
        </object>
      </div>
    </div>
  );
};

export default ResumeViewer;