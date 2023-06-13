const baseApiUrl = process.env.BASE_API_URL || 'http://0.0.0.0:8000';

const requestUpsertFile = async (filePath, fileOpts = {}, headers = {}) => {
    try {
      const file = fs.createReadStream(filePath);    
      const form = new FormData();
      form.append('title', title);
      form.append('file', file);
      form.append('filePath', filePath);
      // iterate opts with extra metadata
      Object.keys(fileOpts).forEach(key => {
        form.append(key, fileOpts[key]);
      });
    
      const resp = await axios.post(`${baseApiUrl}/upsert-file`, form, {
        headers: {
          ...form.getHeaders(),
          ...headers || {}
        }
      });
    
      if (resp.status === 200) {
        return 'Upload complete';
      } 
    } catch(err) {
      return new Error(err.message);
    }
};

// ids or request.filter or request.delete_all
const requestDelete = async (filePath, fileOpts = {}, headers = {}) => {
    try {    
      const form = new FormData();
      //     
        // ids: Optional[List[str]] = None
        // filter: Optional[DocumentMetadataFilter] = None
        // delete_all: Optional[bool] = False

        // DocumentMetadataFilter
        // document_id: Optional[str] = None
        // source: Optional[Source] = None
        // source_id: Optional[str] = None
    
      form.append('ids', [filePath]);
      // iterate opts with extra metadata
      Object.keys(fileOpts).forEach(key => {
        form.append(key, fileOpts[key]);
      });
    
      const resp = await axios.post(`${baseApiUrl}/delete`, form, {
        headers: {
          ...form.getHeaders(),
          ...headers || {}
        }
      });
    
      if (resp.status === 200) {
        return 'Delete complete';
      } 
    } catch(err) {
      return new Error(err.message);
    }
};
  
const accessToken = process.env.DATABASE_INTERFACE_BEARER_TOKEN;

const headers = {
    "Authorization": "Bearer " + accessToken // token
};

async function upsertFile (filePath) {
    const response = await requestUpsertFile(filePath, {}, headers);
    console.log(response);
};

async function deleteFile (filePath) {
    const response = await requestDelete(filePath, {}, headers);        
    console.log(response);
};
