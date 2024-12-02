import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { cleanOneTask, onClose, selectOneTask } from "../tasksSlice";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import { TTaskMutation } from "../../../types";
import { createTask, editTask, fetchTasks } from "../tasksThunk";

interface Props {
  isOpen: boolean;
}

const TaskModel: React.FC<Props> = ({ isOpen }) => {
  const dispatch = useAppDispatch();
  const { createLoading } = useAppSelector((state) => state.tasksStore);
  let stateTask = useAppSelector(selectOneTask);

  const initialState = stateTask
    ? stateTask
    : {
        title: "",
        status: "",
        description: "",
      };

  const [modelState, setModelState] = useState<TTaskMutation>(initialState);

  useEffect(() => {
    if (stateTask) {
      setModelState(stateTask);
    }
  }, [stateTask]);

  const onChange = (
    e: | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,) => {
    const { value, name } = e.target;

    setModelState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (stateTask) {
      const editedTask = {
        ...modelState,
        _id: stateTask._id,
      };

      await dispatch(editTask(editedTask));
    } else {
      await dispatch(createTask(modelState));
    }

    await dispatch(fetchTasks());
    dispatch(onClose());

    setModelState({
      title: "",
      status: "",
      description: "",
    });
    dispatch(cleanOneTask());
  };

  const closeButton = () => {
    dispatch(onClose());
    setModelState({
      title: "",
      status: "",
      description: "",
    });
    dispatch(cleanOneTask());
  };

  return (
    <Dialog
      sx={{ top: "-15%" }}
      open={isOpen || false}
      onClose={() => closeButton()}
    >
      <form onSubmit={onSubmit}>
        <DialogTitle>Task</DialogTitle>
        <DialogContent>
          <Box sx={{ paddingTop: "5px" }}>
            <FormControl>
              <TextField
                sx={{ width: "300px" }}
                value={modelState.title}
                name="title"
                onChange={onChange}
                required
                label="Title"
              />
            </FormControl>
          </Box>

          <Box sx={{ padding: "10px 0" }}>
            <FormControl fullWidth>
              <InputLabel id="selectLabel">Status</InputLabel>
              <Select
                labelId="selectLabel"
                value={modelState.status}
                onChange={onChange}
                name="status"
                required
                label="Status"
              >
                <MenuItem value="new">new</MenuItem>
                <MenuItem value="in_progress">in progress</MenuItem>
                <MenuItem value="complete">complete</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ padding: "10px 0" }}>
            <FormControl>
              <TextField
                rows={3}
                sx={{ width: "300px" }}
                value={modelState.description ? modelState.description : ""}
                onChange={onChange}
                name="description"
                label="Description"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ paddingBottom: "15px" }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={closeButton}
          >
            Close
          </Button>
          <LoadingButton
            type="submit"
            variant="outlined"
            loading={createLoading}
            loadingPosition="end"
            endIcon={<SendIcon />}
            size="small"
            color="success"
          >
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskModel;
