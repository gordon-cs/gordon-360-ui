import { useEffect, useState } from 'react';
import marketplaceService from 'services/marketplace';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
  CircularProgress,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AdminMarketplaceThreads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0); // MUI is 0-indexed
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [editHistory, setEditHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleThreadClick = async (thread) => {
    setLoading(true); // Optionally show loading in modal
    try {
      const history = await marketplaceService.getThreadEditHistory(thread.ThreadId);
      setEditHistory(history);
      setIsModalOpen(true);
    } catch (err) {
      console.error('Failed to fetch thread edit history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchThreads = async () => {
      setLoading(true);
      try {
        const options = { page: page + 1, pageSize: rowsPerPage };
        const data = await marketplaceService.getAdminThreads(options);
        setThreads(data);
        const count = await marketplaceService.getAdminThreadsCount({});
        console.log('Admin threads count:', count);
        setTotalCount(count);
      } catch (err) {
        console.error('Failed to fetch admin threads', err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, [page, rowsPerPage]);

  if (loading) return <CircularProgress />;

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Posted At</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {threads.map((thread) => (
            <TableRow
              key={thread.Id}
              hover
              onClick={() => handleThreadClick(thread)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>{thread.ThreadId}</TableCell>
              <TableCell>{thread.Name}</TableCell>
              <TableCell>{thread.Price.toFixed(2)}</TableCell>
              <TableCell>{new Date(thread.PostedAt).toLocaleString()}</TableCell>
              <TableCell>{thread.CategoryName}</TableCell>
              <TableCell>{thread.StatusName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0); // Reset to first page
        }}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
      {/* Dialog for when a listing is clicked */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit History
          <IconButton
            aria-label="close"
            onClick={() => setIsModalOpen(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <List>
            {editHistory.map((version) => (
              <ListItem key={version.Id} alignItems="flex-start" divider>
                <ListItemText
                  primary={`${version.Name} — $${version.Price.toFixed(2)} — ${new Date(version.PostedAt).toLocaleString()}`}
                  secondary={
                    <>
                      <div>
                        <b>ID: </b> {version.Id}
                      </div>
                      <div>
                        <b>Category:</b> {version.CategoryName}
                      </div>
                      <div>
                        <b>Status:</b> {version.StatusName}
                      </div>
                      <div>
                        <b>Description:</b> {version.Detail}
                      </div>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default AdminMarketplaceThreads;
