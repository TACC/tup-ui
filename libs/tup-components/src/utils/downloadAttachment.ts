import axios from 'axios';

export const downloadAttachment = async (
  ticketId: string,
  attachmentId: string,
  baseUrl: string,
  jwt?: string
) => {
  const response = await axios({
    method: 'get',
    url: `${baseUrl}/tickets/${ticketId}/attachment/${attachmentId}`,
    headers: { 'x-tup-token': jwt ?? '' },
    responseType: 'blob',
  });

  const fileName = response.headers['content-type']?.split('"')[1];
  const url = window.URL.createObjectURL(response.data);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
