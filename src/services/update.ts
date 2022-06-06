import http from './http';

type UpdatedFields = {
  field: string;
  value: string;
}

const requestInfoUpdate = async ( email_content: Array<UpdatedFields> ) => {
  console.log(email_content);
  //await http.post('profiles/updateRequest/', email_content);
};

export default requestInfoUpdate;
