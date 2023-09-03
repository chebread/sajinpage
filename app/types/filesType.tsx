type filesType = {
  file: File;
  fileType: string;
  docId: string;
  fileId: string;
  accessTime: string;
  timeLimit: number;
  selected: boolean; // is selected
  uploaded: boolean; // is uploaded
  limit: boolean;
  filed: boolean; // is file
  uploadType: string;
  url: string;
};

export default filesType;
