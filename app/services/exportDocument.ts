import type { WritingDocument } from '../types/domain';

export type ExportFormat = 'md' | 'txt' | 'pdf';

function safeFilename(title: string): string {
  return title.replace(/[<>:"/\\|?*]+/g, '-').trim() || 'ghostwriter-document';
}

function saveTextFile(document: WritingDocument, format: 'md' | 'txt') {
  const mimeType = format === 'md' ? 'text/markdown;charset=utf-8' : 'text/plain;charset=utf-8';
  const url = URL.createObjectURL(new Blob([document.content], { type: mimeType }));
  const link = window.document.createElement('a');
  link.href = url;
  link.download = `${safeFilename(document.title)}.${format}`;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

async function savePdf(document: WritingDocument) {
  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 54;
  const lineHeight = 17;
  let y = margin;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(20);
  for (const line of pdf.splitTextToSize(document.title || 'Untitled document', pageWidth - margin * 2)) {
    pdf.text(line, margin, y);
    y += 25;
  }

  y += 11;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(11);
  const lines = pdf.splitTextToSize(document.content, pageWidth - margin * 2);
  for (const line of lines) {
    if (y > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
    pdf.text(line, margin, y);
    y += lineHeight;
  }

  pdf.save(`${safeFilename(document.title)}.pdf`);
}

export async function exportDocument(document: WritingDocument, format: ExportFormat): Promise<void> {
  if (format === 'pdf') await savePdf(document);
  else saveTextFile(document, format);
}