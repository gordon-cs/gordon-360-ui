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
  rd_Id: number;
  start_Date: string;
  end_Date: string;
};

type RDStudentsViewModel = {
  RD_Email: string | null;
  RD_Id: string;
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
    const { rd_Id, start_Date, end_Date } = data;
    return await http.post(
      `housing/rds/${rd_Id}/on-call?startDate=${start_Date}&endDate=${end_Date}`,
    );
  } catch (error) {
    console.error('Error creating RD on-call record:', error);
    throw error;
  }
};

const updateRDOnCall = async (
  recordId: number,
  updatedData: Partial<RDOnCall>,
): Promise<RDOnCall> => {
  try {
    return await http.patch(`housing/rds/oncall/${recordId}`, updatedData);
  } catch (error) {
    console.error('Error updating RD on-call record:', error);
    throw error;
  }
};

const deleteRDOnCall = async (recordId: number): Promise<void> => {
  try {
    await http.del(`housing/rds/oncall/${recordId}`);
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

export { fetchActiveRDOnCalls, fetchRDNames, createRDOnCall, updateRDOnCall, deleteRDOnCall };
