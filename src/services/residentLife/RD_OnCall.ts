import http from 'services/http';

type RDOnCall = {
  Record_ID: number;
  RD_ID: number;
  RD_Name: string;
  Start_Date: string;
  End_Date: string;
  Created_Date: string;
};

type RDOnCallCreate = {
  RD_ID: number;
  Start_Date: string;
  End_Date: string;
};

type RDStudentsViewModel = {
  RD_Email: string | null;
  RD_ID: string;
  RD_Name: string;
  RD_Photo: string | null;
};

const fetchActiveRDOnCalls = async (): Promise<RDOnCall[]> => {
  try {
    return await http.get('housing/rds/oncall/active');
  } catch (error) {
    console.error('Error fetching active RD on-call records:', error);
    throw error;
  }
};

const fetchRDNames = async (): Promise<{ RD_ID: number; RD_Name: string }[]> => {
  try {
    return await http.get('housing/rds/all');
  } catch (error) {
    console.error('Error fetching RD names:', error);
    throw error;
  }
};

const createRDOnCall = async (data: RDOnCallCreate): Promise<string> => {
  try {
    const { RD_ID, Start_Date, End_Date } = data;
    return await http.post(
      `housing/rds/${RD_ID}/on-call?startDate=${Start_Date}&endDate=${End_Date}`,
    );
  } catch (error) {
    console.error('Error creating RD on-call record:', error);
    throw error;
  }
};

const updateRDOnCall = async (
  Record_ID: number,
  Updated_Data: Partial<RDOnCall>,
): Promise<RDOnCall> => {
  try {
    return await http.patch(`housing/rds/oncall/${Record_ID}`, Updated_Data);
  } catch (error) {
    console.error('Error updating RD on-call record:', error);
    throw error;
  }
};

const deleteRDOnCall = async (Record_ID: number): Promise<void> => {
  try {
    await http.del(`housing/rds/oncall/${Record_ID}`);
  } catch (error) {
    console.error('Error deleting RD on-call record:', error);
    throw error;
  }
};

export async function getRDOnCall(): Promise<RDStudentsViewModel> {
  try {
    return await http.get('housing/rds/oncall');
  } catch (error) {
    console.error('Error fetching RD on-call details:', error);
    throw error;
  }
}

const getPhoneNumberByName = async (PhoneName: string): Promise<string> => {
  try {
    return await http.get(`housing/rds/contact/${PhoneName}`);
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
};

const setPhoneNumberByName = async (PhoneName: string, PhoneNumber: string): Promise<void> => {
  try {
    await http.patch(`housing/rds/contact/${PhoneName}/${PhoneNumber}`);
  } catch (error) {
    console.error('Error setting contact:', error);
    throw error;
  }
};

export {
  fetchActiveRDOnCalls,
  fetchRDNames,
  createRDOnCall,
  updateRDOnCall,
  deleteRDOnCall,
  getPhoneNumberByName,
  setPhoneNumberByName,
};
