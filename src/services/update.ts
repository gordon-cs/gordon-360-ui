import http from './http';

const requestInfoUpdate = async ( email_content: string ) => {
  console.log(email_content);
  http.post('profiles/updateRequest/', email_content);
};

export default requestInfoUpdate;
