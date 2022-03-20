import React, { useState } from 'react'
import { Box, IconButton, Typography, styled } from '@mui/material'
import {
  FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage,
  Download
} from '@mui/icons-material'
import theme from '../theme'
import { Document, Page, pdfjs } from "react-pdf"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PdfViewer ({ file }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess ({ numPages }) {
    setNumPages(numPages);
  }
  const handleIconButtonClick = e => {
    switch (e.currentTarget.id) {
      case 'previous-page':
        if (pageNumber === 1) break
        setPageNumber(pageNumber - 1)
        break
      case 'next-page':
        if (pageNumber === numPages) break
        setPageNumber(pageNumber + 1)
        break
      case 'first-page':
        if (pageNumber === 1) break
        setPageNumber(1)
        break
      case 'last-page':
        if (pageNumber === numPages) break
        setPageNumber(numPages)
        break
      default:
        return
    }
  }

  const StyledDiv = styled('div')({ flexShrink: 0, marginLeft: theme.spacing(2.5) })

  const pagination = () => (
    <StyledDiv>
      <IconButton
        id='first-page'
        onClick={handleIconButtonClick}
        disabled={pageNumber === 1}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        id='previous-page'
        onClick={handleIconButtonClick}
        disabled={pageNumber === 1}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        id='next-page'
        onClick={handleIconButtonClick}
        disabled={pageNumber >= numPages}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        id='last-page'
        onClick={handleIconButtonClick}
        disabled={pageNumber >= numPages}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
      <IconButton><Typography>Page {pageNumber} of {numPages}</Typography></IconButton>
      <IconButton color='secondary' href={file} download >
        <Download />
      </IconButton>
    </StyledDiv>
  )

  return (
    <Box>
      <Box sx={{
        width: '100%',
        '& .react-pdf__Page__annotations': { height: 0 }
      }}>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={pageNumber} scale='1.25' />
        </Document>
      </Box>
      <Box sx={{ width: '100%' }}>
        {pagination()}
      </Box>
    </Box>
  );
}
