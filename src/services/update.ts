import http from './http';

const requestInfoUpdate = async ( email_content: string ) => {
  http.post('profiles/updateRequest/', email_content);
};

const updateAlumniInfo = {
  requestInfoUpdate,
};

export default updateAlumniInfo;
